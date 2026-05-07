import { useMemo, useEffect, useRef } from "react";
import { cn } from "@/shared/utils";

export interface YearSelectorProps {
  title?: string;
  value?: number;
  onChange?: (year: number) => void;
  disabledYears?: number[];
  minYear?: number;
  maxYear?: number;
  hideContainer?: boolean;
}

export function YearSelector({
  title,
  value,
  onChange,
  disabledYears = [],
  minYear = 1970,
  maxYear = new Date().getFullYear(),
  hideContainer,
}: YearSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = minYear; y <= maxYear; y++) {
      list.push(y);
    }
    return list;
  }, [minYear, maxYear]);

  // Scroll to selected year on mount
  useEffect(() => {
    if (value && containerRef.current) {
      const selectedEl = containerRef.current.querySelector(
        '[data-selected="true"]',
      ) as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }
  }, [value]);

  const gridContent = (
    <div
      ref={containerRef}
      className={cn(
        "grid grid-cols-3 gap-2 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300",
        hideContainer ? "h-[168px]" : "max-h-[220px]", // Match exactly the 4 rows x 36px + 3 gaps x 8px = 168px
      )}
    >
      {years.map((y) => {
        const isSelected = y === value;
        const isDisabled = disabledYears.includes(y);

        return (
          <button
            key={y}
            disabled={isDisabled}
            data-selected={isSelected}
            onClick={() => !isDisabled && onChange?.(y)}
            className={cn(
              "flex items-center justify-center rounded-lg px-[8px] py-[10px] text-[12px] font-medium leading-[16px] transition-colors",
              isSelected
                ? "bg-primary text-primary-foreground"
                : isDisabled
                  ? "cursor-not-allowed text-muted-foreground opacity-50"
                  : "text-foreground hover:bg-muted",
            )}
          >
            {y}
          </button>
        );
      })}
    </div>
  );

  if (hideContainer) {
    return gridContent;
  }

  return (
    <div className="flex w-[260px] flex-col gap-[10px]">
      {title && (
        <div className="text-[14px] font-semibold leading-[20px] text-foreground">
          {title}
        </div>
      )}
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 shadow-sm">
        {gridContent}
      </div>
    </div>
  );
}
