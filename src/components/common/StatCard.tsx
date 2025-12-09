import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  iconSrc?: string;
}

const StatCard = ({ label, value, suffix, iconSrc }: StatCardProps) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-card-wrapper-subtle
        px-6
        py-6
        flex
        items-center
        justify-between
      "
    >
      <div>
        <div className="text-base leading-5 font-medium text-text-main">
          {label}
        </div>

        <div className="flex items-center gap-4 lg:pt-8 pt-5 lg:pb-4 pb-0">
          {iconSrc && (
            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-soft-yellow
                border-[1.5px]
                border-wrapper-subtle
                flex
                items-center
                justify-center
                shadow-[0_1px_0_rgba(16,24,40,0.03)]
                shrink-0
              "
              aria-hidden
            >
              <img src={iconSrc} alt="" className="w-6 h-6" />
            </div>
          )}

          <div className="flex items-baseline gap-1">
            <span
              className="
                text-[36px]
                leading-none
                font-extrabold
                text-primary
              "
            >
              {value}
            </span>

            {suffix && (
              <span className="text-[11px] font-medium text-suffix">
                {suffix}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
