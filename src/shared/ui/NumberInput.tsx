import { cn } from '@/lib/cn';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Numeric-only text input. Strips non-digits on every keystroke,
 * uses inputMode="numeric" so mobile shows a number keypad.
 */
export function NumberInput({ value, onChange, placeholder, className }: Props) {
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
      className={cn(
        'h-10 w-[94px] rounded-lg border border-surface-border bg-white pb-[11px] pl-[10px] pr-2 pt-[13px] text-[14px] leading-[16px] text-ink-800 placeholder:text-ink-500 focus:border-brand-orange',
        className,
      )}
    />
  );
}
