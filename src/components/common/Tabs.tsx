import React from 'react';

export interface TabConfig {
  label: string;
  value: string;
}

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  tabs: TabConfig[];
}

const Tabs = ({ value, onChange, tabs }: TabsProps) => {
  return (
    <div className="w-full bg-surface rounded-2xl overflow-x-auto p-2 flex items-center justify-between">
      {tabs.map(tab => {
        const active = tab.value === value;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              flex-1 text-center md:py-3 py-2 min-w-[160px] md:text-lg text-base font-medium transition
              ${active ? 'text-primary font-semibold' : 'text-inactive'}
            `}
          >
            <span className="relative inline-block pb-[3px]">
              {tab.label}
              {active && (
                <span
                  className="
                  absolute left-0 right-0 -bottom-px
                  h-[2px] rounded-full bg-primary
                "
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
