import { useState } from 'react';
import { Card, Icon, PageHeader } from '@/shared/ui';
import { GRAMMAR_SHEETS } from '../domain/content/catalog';
import { sheetEntryCount, type GrammarGroup, type GrammarSheet } from '../domain/grammar-sheet';

/**
 * Grammar reference sheets (content in code, ADR-0024): general study material — the gender rules and the verbs
 * with fixed prepositions — not tied to a level. A browse view with a tab per sheet.
 */
export function RegrasPage() {
  const [activeId, setActiveId] = useState(GRAMMAR_SHEETS[0]?.id ?? '');
  const sheet = GRAMMAR_SHEETS.find((s) => s.id === activeId) ?? GRAMMAR_SHEETS[0];

  return (
    <div>
      <PageHeader
        eyebrow="Gramática · Referência"
        title="Regras de gramática"
        description="Folhas de consulta rápida para tirar dúvidas: o gênero dos substantivos e os verbos que pedem uma preposição fixa."
      />
      <div role="tablist" aria-label="Folhas de gramática" className="mb-5 flex flex-wrap gap-2">
        {GRAMMAR_SHEETS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === sheet?.id}
            onClick={() => setActiveId(s.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              s.id === sheet?.id
                ? 'bg-primary-container text-white'
                : 'bg-surface-low text-ink-soft hover:text-primary'
            }`}
          >
            <Icon name={s.icon} className="text-[18px]" />
            {s.title}
          </button>
        ))}
      </div>
      {sheet ? <SheetView sheet={sheet} /> : null}
    </div>
  );
}

function SheetView({ sheet }: { sheet: GrammarSheet }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">
        {sheet.description} · <span className="font-semibold">{sheetEntryCount(sheet)}</span> itens
      </p>
      {sheet.groups.map((group) => (
        <GroupView key={group.label} group={group} />
      ))}
    </div>
  );
}

function GroupView({ group }: { group: GrammarGroup }) {
  return (
    <Card className="flex flex-col gap-3">
      <h2 className="flex items-baseline gap-2">
        <span lang="de" className="text-2xl text-primary">
          {group.label}
        </span>
        {group.sublabel ? <span className="rubric text-ink-soft">{group.sublabel}</span> : null}
        <span className="ml-auto font-mono text-sm text-ink-soft">{group.entries.length}</span>
      </h2>
      <ul className="flex flex-col divide-y divide-hairline">
        {group.entries.map((entry, index) => (
          <li key={`${entry.term}-${index}`} className="flex flex-col gap-0.5 py-2 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span lang="de" className="font-serif text-lg text-primary">
                {entry.term}
              </span>
              {entry.tag ? (
                <span className="rounded-full bg-surface-high px-2 py-0.5 font-mono text-xs text-secondary">
                  {entry.tag}
                </span>
              ) : null}
              {entry.translation ? <span className="text-sm text-ink-soft">{entry.translation}</span> : null}
            </div>
            {entry.note ? <span className="text-sm text-ink-soft">{entry.note}</span> : null}
            {entry.example ? (
              <span lang="de" className="text-sm text-ink italic">
                {entry.example}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </Card>
  );
}
