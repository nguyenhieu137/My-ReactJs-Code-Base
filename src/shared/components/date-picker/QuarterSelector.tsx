import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils";
import { YearSelector } from "./YearSelector";

export interface QuarterValue {
  year: number;
  quarter: number; // 1 to 4
}

export interface QuarterSelectorProps {
  title?: string;
  value?: QuarterValue;
  onChange?: (val: QuarterValue) => void;
  minDate?: QuarterValue;
  maxDate?: QuarterValue;
}

const QUARTERS = [
  { label: "Q1", value: 1 },
  { label: "Q2", value: 2 },
  { label: "Q3", value: 3 },
  { label: "Q4", value: 4 },
];

export function QuarterSelector({
  title,
  value,
  onChange,
  minDate,
  maxDate,
}: QuarterSelectorProps) {
  const currentYear = value?.year || new Date().getFullYear();
  const currentQuarter =
    value?.quarter || Math.floor(new Date().getMonth() / 3) + 1;
  const [isSelectingYear, setIsSelectingYear] = useState(false);

  const handleQuarterClick = (q: number) => {
    if (
      minDate &&
      (currentYear < minDate.year ||
        (currentYear === minDate.year && q < minDate.quarter))
    )
      return;
    if (
      maxDate &&
      (currentYear > maxDate.year ||
        (currentYear === maxDate.year && q > maxDate.quarter))
    )
      return;
    onChange?.({ year: currentYear, quarter: q });
  };

  const handleYearChange = (y: number) => {
    setIsSelectingYear(false);
    let newQuarter = currentQuarter;
    if (minDate && y === minDate.year && newQuarter < minDate.quarter)
      newQuarter = minDate.quarter;
    if (maxDate && y === maxDate.year && newQuarter > maxDate.quarter)
      newQuarter = maxDate.quarter;
    onChange?.({ year: y, quarter: newQuarter });
  };

  const handlePrevYear = () => {
    const y = currentYear - 1;
    if (minDate && y < minDate.year) return;
    handleYearChange(y);
  };

  const handleNextYear = () => {
    const y = currentYear + 1;
    if (maxDate && y > maxDate.year) return;
    handleYearChange(y);
  };

  return (
    <div className="flex w-[260px] flex-col gap-[10px]">
      {title && (
        <div className="text-[14px] font-semibold leading-[20px] text-foreground">
          {title}
        </div>
      )}
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 shadow-sm">
        {/* Header containing Year Dropdown and Left/Right Chevrons */}
        <div className="flex h-[32px] w-full items-center justify-between pb-2">
          <button
            onClick={() => setIsSelectingYear(!isSelectingYear)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-foreground hover:bg-muted outline-none"
          >
            {currentYear}
            <ChevronDown
              className={cn(
                "h-[14px] w-[14px] opacity-60 transition-transform",
                isSelectingYear && "rotate-180",
              )}
            />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevYear}
              disabled={minDate ? currentYear <= minDate.year : false}
              className="flex items-center justify-center p-1 text-foreground opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed outline-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextYear}
              disabled={maxDate ? currentYear >= maxDate.year : false}
              className="flex items-center justify-center p-1 text-foreground opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed outline-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Area - toggles between Year Grid and Quarter Grid */}
        {isSelectingYear ? (
          <YearSelector
            value={currentYear}
            onChange={handleYearChange}
            minYear={minDate?.year || 1970}
            maxYear={maxDate?.year || new Date().getFullYear() + 10}
            hideContainer={true}
          />
        ) : (
          <div className="flex flex-col gap-2 h-[168px]">
            <div className="flex justify-center pb-2">
              <span className="text-[14px] font-semibold text-foreground">
                Q{currentQuarter}, {currentYear}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {QUARTERS.map((q) => {
                const isSelected = q.value === currentQuarter;
                let isDisabled = false;
                if (
                  minDate &&
                  (currentYear < minDate.year ||
                    (currentYear === minDate.year && q.value < minDate.quarter))
                ) {
                  isDisabled = true;
                }
                if (
                  maxDate &&
                  (currentYear > maxDate.year ||
                    (currentYear === maxDate.year && q.value > maxDate.quarter))
                ) {
                  isDisabled = true;
                }

                return (
                  <button
                    key={q.value}
                    disabled={isDisabled}
                    onClick={() => handleQuarterClick(q.value)}
                    className={cn(
                      "flex items-center justify-center rounded-lg border py-[14px] text-[12px] font-medium leading-[16px] transition-colors outline-none",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : isDisabled
                          ? "cursor-not-allowed text-muted-foreground bg-muted/50 border-border"
                          : "text-foreground border-border hover:bg-muted",
                    )}
                  >
                    {q.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
