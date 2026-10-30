import { Icon } from '@/shared/ui';
import { MAX_LIVES, MAX_STARS } from '../../domain/scoring';

/** A row of up to `max` stars, `value` of them filled. */
export function Stars({
  value,
  max = MAX_STARS,
  className = '',
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-tertiary ${className}`} aria-hidden="true">
      {Array.from({ length: max }, (_, i) => (
        <Icon key={i} name="star" filled={i < value} className="text-[18px]" />
      ))}
    </span>
  );
}

/** Remaining lives as hearts; lost ones fade out. */
export function Hearts({ value, max = MAX_LIVES }: { value: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} de ${max} vidas`}>
      {Array.from({ length: max }, (_, i) => (
        <Icon
          key={i}
          name="favorite"
          filled={i < value}
          className={`text-[18px] ${i < value ? 'text-error' : 'text-ink-soft/30'}`}
        />
      ))}
    </span>
  );
}

/** A thin horizontal progress bar; `percent` is 0–100. */
export function ProgressBar({ percent, label }: { percent: number; label?: string }) {
  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-surface-high"
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="h-full rounded-full bg-primary-container transition-[width] duration-500 ease-[var(--ease-strong-out)]"
        style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
      />
    </div>
  );
}
