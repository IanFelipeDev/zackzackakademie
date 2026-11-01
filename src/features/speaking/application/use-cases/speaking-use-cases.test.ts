import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  AssessmentNotFoundError,
  InvalidPracticeDurationError,
  InvalidSpeakingRubricError,
  InvalidSpeakingScoreError,
  PracticeAlreadyAssessedError,
  SpeakingPracticeNotFoundError,
  SpeakingTopicNotFoundError,
} from '../../domain/errors';
import type { TelcRubric } from '../../domain/speaking-assessment';
import { buildSpeakingTopic, InMemorySpeakingStore } from '../testing/in-memory-speaking-store';
import {
  AssessSpeakingPractice,
  GetPracticeForAssessment,
  UpdateSpeakingAssessment,
} from './assess-speaking-practice';
import { computeSpeakingStats } from './compute-speaking-stats';
import { GetMySpeakingStats } from './get-my-speaking-stats';
import { GetRecordingUrl } from './get-recording-url';
import { GetSpeakingTopic } from './get-speaking-topic';
import { ListMySpeakingPractices } from './list-my-speaking-practices';
import { ListAssessedPractices, ListPracticesAwaitingAssessment } from './list-practices-for-assessment';
import { ListSpeakingTopics } from './list-speaking-topics';
import { RecordSpeakingPractice } from './record-speaking-practice';

const STUDENT = 'student-1';
const TEACHER = 'teacher-1';

let store: InMemorySpeakingStore;

beforeEach(() => {
  vi.useFakeTimers({ now: new Date('2026-09-01T10:00:00Z') });
  store = new InMemorySpeakingStore();
  store.names.set(STUDENT, 'Ana').set(TEACHER, 'Melissa');
  store.topics.push(
    buildSpeakingTopic({ id: 'topic-2', position: 2, title: 'Urlaub' }),
    buildSpeakingTopic(),
    buildSpeakingTopic({ id: 'topic-3', taskType: 'discussion', title: 'Hausaufgaben' }),
    buildSpeakingTopic({ id: 'telc-1', exam: 'telc', taskType: 'discussion', title: 'Die Vier-Tage-Woche' }),
  );
});

afterEach(() => {
  vi.useRealTimers();
});

/** Records a practice and moves the clock on, so practices get distinct times. */
async function practise(topicId: string, studentId = STUDENT, durationSeconds = 240) {
  const { practice } = await new RecordSpeakingPractice(
    store.practiceRepository,
    store.recordingStorage,
  ).execute({ topicId, studentId, durationSeconds });
  vi.advanceTimersByTime(60_000);
  return practice;
}

function assess(practiceId: string, score: number, comment = '') {
  return new AssessSpeakingPractice(store.assessmentRepository).execute({
    practiceId,
    teacherId: TEACHER,
    score,
    comment,
  });
}

describe('student side', () => {
  it('lists the topics of an exam part with the student progress', async () => {
    const first = await practise('topic-1');
    await practise('topic-1');
    await practise('topic-1', 'student-2');
    await assess(first.id, 70);

    const topics = await new ListSpeakingTopics(store.topicRepository, store.practiceRepository).execute(
      'goethe',
      'presentation',
      STUDENT,
    );

    expect(topics.map((t) => [t.topic.id, t.status, t.practiceCount, t.lastScore])).toEqual([
      ['topic-1', 'practiced', 2, 70],
      ['topic-2', 'pending', 0, null],
    ]);
    expect(topics[0]?.lastPracticedAt).toEqual(new Date('2026-09-01T10:01:00Z'));
  });

  it('keeps the Goethe and telc discussions apart', async () => {
    const list = new ListSpeakingTopics(store.topicRepository, store.practiceRepository);
    const goethe = await list.execute('goethe', 'discussion', STUDENT);
    const telc = await list.execute('telc', 'discussion', STUDENT);

    expect(goethe.map((t) => t.topic.id)).toEqual(['topic-3']);
    expect(telc.map((t) => t.topic.id)).toEqual(['telc-1']);
  });

  it('loads a topic or fails when it is not visible', async () => {
    const getTopic = new GetSpeakingTopic(store.topicRepository);
    await expect(getTopic.execute('topic-3')).resolves.toMatchObject({ title: 'Hausaufgaben' });
    await expect(getTopic.execute('missing')).rejects.toBeInstanceOf(SpeakingTopicNotFoundError);
  });

  it('keeps the score history of a topic, newest first', async () => {
    const first = await practise('topic-1');
    const second = await practise('topic-1');
    await practise('topic-2');
    await assess(first.id, 60, 'Mehr Beispiele.');

    const history = await new ListMySpeakingPractices(store.practiceRepository).execute(STUDENT, 'topic-1');

    expect(history.map((p) => p.id)).toEqual([second.id, first.id]);
    expect(history[1]?.assessment).toMatchObject({
      score: 60,
      comment: 'Mehr Beispiele.',
      teacherName: 'Melissa',
    });
    await expect(
      new ListMySpeakingPractices(store.practiceRepository).execute(STUDENT),
    ).resolves.toHaveLength(3);
  });

  it('rejects an impossible duration', async () => {
    await expect(practise('topic-1', STUDENT, -5)).rejects.toBeInstanceOf(InvalidPracticeDurationError);
    expect(store.practices).toHaveLength(0);
  });

  it('summarises practices for the dashboard', async () => {
    const first = await practise('topic-1');
    const second = await practise('topic-1');
    await practise('topic-3');
    await assess(first.id, 70);
    await assess(second.id, 81);

    const practices = await store.practiceRepository.listByStudent(STUDENT);
    expect(computeSpeakingStats(practices, 20)).toEqual({
      totalTopics: 20,
      practicedTopics: 2,
      totalPractices: 3,
      assessedPractices: 2,
      averageScore: 76,
      lastPracticedAt: new Date('2026-09-01T10:02:00Z'),
    });
    expect(computeSpeakingStats([], 20)).toMatchObject({ averageScore: null, lastPracticedAt: null });
  });

  it('counts the topics of both exam parts for the dashboard', async () => {
    await practise('topic-3');
    const stats = await new GetMySpeakingStats(store.topicRepository, store.practiceRepository).execute(
      STUDENT,
    );
    expect(stats).toMatchObject({
      totalTopics: 4,
      practicedTopics: 1,
      totalPractices: 1,
      assessedPractices: 0,
    });
  });
});

describe('recordings', () => {
  function recordWith(recording: { data: Blob; mimeType: string } | null) {
    return new RecordSpeakingPractice(store.practiceRepository, store.recordingStorage).execute({
      topicId: 'topic-1',
      studentId: STUDENT,
      durationSeconds: 200,
      recording,
    });
  }

  it('uploads the recording and attaches it to the practice', async () => {
    const result = await recordWith({ data: new Blob(['voice']), mimeType: 'audio/webm;codecs=opus' });
    const path = `${STUDENT}/${result.practice.id}.webm`;

    expect(result.recording).toBe('saved');
    expect(store.recordings.get(path)?.contentType).toBe('audio/webm');
    const [listed] = await new ListMySpeakingPractices(store.practiceRepository).execute(STUDENT);
    expect(listed?.recordingPath).toBe(path);
    expect(await new GetRecordingUrl(store.recordingStorage).execute(path)).toBe(
      `memory://recordings/${path}`,
    );
  });

  it('still saves the practice when the upload fails or the format is not accepted', async () => {
    store.failUploads = true;
    const failed = await recordWith({ data: new Blob(['voice']), mimeType: 'audio/webm' });
    store.failUploads = false;
    const unsupported = await recordWith({ data: new Blob(['voice']), mimeType: 'video/mp4' });
    const none = await recordWith(null);

    expect([failed.recording, unsupported.recording, none.recording]).toEqual(['failed', 'failed', 'none']);
    expect(store.practices.map((p) => p.recordingPath)).toEqual([null, null, null]);
    expect(store.recordings.size).toBe(0);
  });
});

describe('teacher side', () => {
  it('queues practices without a score, oldest first, and lists assessed ones by last change', async () => {
    const first = await practise('topic-1');
    const second = await practise('topic-2');
    const third = await practise('topic-3');
    await assess(first.id, 50);
    vi.advanceTimersByTime(60_000);
    await assess(third.id, 90);
    vi.advanceTimersByTime(60_000);
    await new UpdateSpeakingAssessment(store.assessmentRepository).execute({
      practiceId: first.id,
      score: 55,
      comment: 'Nachbewertet',
    });

    const pending = await new ListPracticesAwaitingAssessment(store.assessmentRepository).execute();
    const assessed = await new ListAssessedPractices(store.assessmentRepository).execute();

    expect(pending.map((p) => p.id)).toEqual([second.id]);
    expect(pending[0]).toMatchObject({ studentName: 'Ana', topicTitle: 'Urlaub' });
    expect(assessed.map((p) => p.id)).toEqual([first.id, third.id]);
    expect(assessed[0]?.assessment).toMatchObject({ score: 55, comment: 'Nachbewertet' });
    expect(assessed[0]?.assessment?.updatedAt).toBeInstanceOf(Date);
  });

  it('loads a practice for assessment or fails when it is missing', async () => {
    const practice = await practise('topic-1');
    const get = new GetPracticeForAssessment(store.assessmentRepository);
    await expect(get.execute(practice.id)).resolves.toMatchObject({ prompt: buildSpeakingTopic().prompt });
    await expect(get.execute('missing')).rejects.toBeInstanceOf(SpeakingPracticeNotFoundError);
  });

  it('assesses a practice only once and only when it exists', async () => {
    const practice = await practise('topic-1');
    await assess(practice.id, 80);
    await expect(assess(practice.id, 90)).rejects.toBeInstanceOf(PracticeAlreadyAssessedError);
    await expect(assess('missing', 90)).rejects.toBeInstanceOf(SpeakingPracticeNotFoundError);
    await expect(assess(practice.id, 120)).rejects.toBeInstanceOf(InvalidSpeakingScoreError);
    expect(store.assessments.get(practice.id)?.score).toBe(80);
  });

  function assessRubric(practiceId: string, rubric: TelcRubric, comment = '') {
    return new AssessSpeakingPractice(store.assessmentRepository).execute({
      practiceId,
      teacherId: TEACHER,
      score: 0,
      comment,
      rubric,
    });
  }

  it('scores a telc practice with the official four-criteria rubric, deriving the 0-100 score', async () => {
    const practice = await practise('telc-1');
    await assessRubric(practice.id, { ausdruck: 7, aufgabe: 5, grammatik: 5, aussprache: 4 }, 'Gut.');

    const stored = store.assessments.get(practice.id);
    expect(stored?.rubric).toEqual({ ausdruck: 7, aufgabe: 5, grammatik: 5, aussprache: 4 });
    // Subtotal 21/25 maps to 84/100 so the dashboard can compare exams.
    expect(stored?.score).toBe(84);
    expect(stored?.comment).toBe('Gut.');
  });

  it('rejects a rubric with a band that is not official', async () => {
    const practice = await practise('telc-1');
    await expect(
      assessRubric(practice.id, { ausdruck: 6, aufgabe: 5, grammatik: 5, aussprache: 4 }),
    ).rejects.toBeInstanceOf(InvalidSpeakingRubricError);
    expect(store.assessments.has(practice.id)).toBe(false);
  });

  it('revises a telc assessment, recomputing the score from the new rubric', async () => {
    const practice = await practise('telc-1');
    await assessRubric(practice.id, { ausdruck: 3, aufgabe: 3, grammatik: 3, aussprache: 1 });
    await new UpdateSpeakingAssessment(store.assessmentRepository).execute({
      practiceId: practice.id,
      score: 0,
      comment: 'Besser!',
      rubric: { ausdruck: 7, aufgabe: 7, grammatik: 7, aussprache: 4 },
    });

    const stored = store.assessments.get(practice.id);
    expect(stored?.score).toBe(100); // 25/25
    expect(stored?.rubric).toEqual({ ausdruck: 7, aufgabe: 7, grammatik: 7, aussprache: 4 });
    expect(stored?.comment).toBe('Besser!');
  });

  it('refuses to revise an assessment that does not exist', async () => {
    const practice = await practise('topic-1');
    const update = new UpdateSpeakingAssessment(store.assessmentRepository);
    await expect(update.execute({ practiceId: practice.id, score: 70, comment: '' })).rejects.toBeInstanceOf(
      AssessmentNotFoundError,
    );
    await assess(practice.id, 60);
    await expect(update.execute({ practiceId: practice.id, score: -1, comment: '' })).rejects.toBeInstanceOf(
      InvalidSpeakingScoreError,
    );
  });
});
