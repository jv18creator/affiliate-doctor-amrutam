import { useState, useEffect, useRef } from 'react';

export interface Option {
  label: string;
  value: string;
}

interface FloatingLabelSelectProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
  id?: string;
}

const FloatingLabelSelect = ({
  label,
  required = false,
  value,
  onChange,
  placeholder,
  options,
  id,
}: FloatingLabelSelectProps) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || Boolean(value);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      const node = e.target as Node;
      if (rootRef.current.contains(node)) return;
      setFocused(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={rootRef} className="relative w-full">
      <label
        htmlFor={id}
        className={`
          absolute left-4 transition-all px-1 z-10 pointer-events-none
          ${isFloating ? '-top-2 text-[11px] text-text-soft' : 'top-4 text-sm text-text-soft'}
          bg-surface
        `}
      >
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <div className="relative border border-border-subtle rounded-xl px-4 py-3 bg-surface">
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent outline-none text-text-main text-sm-v2"
          aria-label={label}
        >
          <option value=""></option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* helper */}
      {placeholder && (
        <div className="mt-2 text-xs-v2 text-text-soft">{placeholder}</div>
      )}
    </div>
  );
};

export default FloatingLabelSelect;
