import { cn } from '@/lib/cn';
import { t } from '@/lib/i18n';

interface Props {
  manName: string;
  modelLabel: string;
  year: number;
  yearClassName: string;
}

export function CardTitle({ manName, modelLabel, year, yearClassName }: Props) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <h3 className="min-w-0 truncate font-['Helvetica_Neue_LT'] text-[14px] font-medium leading-[17px] text-ink-800">
        <span className="uppercase">{manName}</span>
        {modelLabel && <span> {modelLabel}</span>}
      </h3>
      <span
        className={cn(
          "shrink-0 font-['Helvetica_Neue_LT'] text-[14px] font-medium leading-[17px]",
          yearClassName,
        )}
      >
        {year} {t.card.yearSuffix}
      </span>
    </div>
  );
}
