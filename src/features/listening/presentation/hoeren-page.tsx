import { useState } from 'react';
import { useSignedInUser } from '@/features/auth';
import { Alert, Card, EmptyState, PageHeader } from '@/shared/ui';
import { hoerenForLevel } from '../domain/content/catalog';
import { sectionTopicCount, type HoerenSection, type HoerenTopic } from '../domain/hoeren';

/**
 * Hören study aid for the signed-in student, scoped to their CEFR level (content in code, like Lesen and the
 * games, ADR-0021). It lists the teacher's notes of frequent exam topics by Teil. The full audio simulator is
 * deferred until audio hosting is decided; the prototype has no embedded audio.
 */
export function HoerenPage() {
  const user = useSignedInUser();
  const trainer = hoerenForLevel(user.level);
  const [activeTeil, setActiveTeil] = useState(1);
  const section = trainer?.sections.find((s) => s.teil === activeTeil) ?? trainer?.sections[0];

  return (
    <div>
      <PageHeader
        eyebrow={user.level ? `Goethe-Zertifikat ${user.level} · Modul Hören` : 'Modul Hören'}
        title="Audição (Hören)"
        description="Os temas e palavras-chave que mais aparecem na prova de audição, organizados por parte, para você treinar o ouvido e reconhecer o assunto rápido."
      />
      {!trainer ? (
        <EmptyState icon="headphones" title="Nenhum treino disponível">
          O treino de Hören ainda não foi liberado para o seu nível.
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-5">
          <Alert tone="info">
            Por enquanto este é um guia de temas e palavras-chave. Os áudios completos com exercícios chegam
            em breve.
          </Alert>
          <div role="tablist" aria-label="Partes da prova" className="flex flex-wrap gap-2">
            {trainer.sections.map((s) => (
              <button
                key={s.teil}
                type="button"
                role="tab"
                aria-selected={s.teil === activeTeil}
                onClick={() => setActiveTeil(s.teil)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  s.teil === activeTeil
                    ? 'bg-primary-container text-white'
                    : 'bg-surface-low text-ink-soft hover:text-primary'
                }`}
              >
                Teil {s.teil}
              </button>
            ))}
          </div>
          {section ? <SectionView section={section} /> : null}
        </div>
      )}
    </div>
  );
}

function SectionView({ section }: { section: HoerenSection }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl text-primary">{section.title}</h2>
        {section.description ? <p className="text-sm text-ink-soft">{section.description}</p> : null}
        <p className="text-xs text-ink-soft">{sectionTopicCount(section)} temas</p>
      </div>
      {section.groups.map((group, index) => (
        <div key={group.label ?? index} className="flex flex-col gap-2">
          {group.label ? <h3 className="rubric text-ink-soft">{group.label}</h3> : null}
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {group.topics.map((topic, topicIndex) => (
              <li key={`${topic.title}-${topicIndex}`}>
                <TopicCard topic={topic} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function TopicCard({ topic }: { topic: HoerenTopic }) {
  return (
    <Card className="flex h-full flex-col gap-2">
      <p lang="de" className="font-serif text-lg text-primary">
        {topic.title}
      </p>
      {topic.detail ? (
        <p lang="de" className="text-sm text-ink-soft">
          {topic.detail}
        </p>
      ) : null}
      {topic.note ? <p className="text-sm text-ink-soft">{topic.note}</p> : null}
      {topic.keywords && topic.keywords.length > 0 ? (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {topic.keywords.map((keyword, index) => (
            <li
              key={`${keyword}-${index}`}
              lang="de"
              className="rounded-full bg-surface-low px-2.5 py-1 text-xs text-ink"
            >
              {keyword}
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}
