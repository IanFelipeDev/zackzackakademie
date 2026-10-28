import { Icon } from '@/shared/ui';
import type { WritingTaskType } from '../../domain/task-type';
import { TASK_TYPE_LABELS } from '../task-type-labels';

interface TaskTypeTabsProps {
  readonly options: readonly WritingTaskType[];
  readonly value: WritingTaskType;
  readonly onChange: (taskType: WritingTaskType) => void;
}

export function TaskTypeTabs({ options, value, onChange }: TaskTypeTabsProps) {
  if (options.length < 2) return null;
  return (
    <div
      role="radiogroup"
      aria-label="Parte do exame"
      className="inline-flex rounded-full bg-surface-highest p-1.5 shadow-inner"
    >
      {options.map((taskType) => {
        const label = TASK_TYPE_LABELS[taskType];
        const isActive = taskType === value;
        return (
          <button
            key={taskType}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(taskType)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-6 ${
              isActive ? 'bg-primary-container text-white shadow-md' : 'text-ink-soft hover:text-primary'
            }`}
          >
            <Icon name={label.icon} className="text-[18px]" />
            <span className="tracking-wide uppercase">{label.part}</span>
            <span className="hidden text-xs font-normal opacity-80 sm:inline">{label.name}</span>
          </button>
        );
      })}
    </div>
  );
}
