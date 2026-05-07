import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils";
import { YearSelector } from "./YearSelector";

export interface MonthSelectorProps {
  title?: string;
  value?: { year: number; month: number }; // month: 1-12
  onChange?: (val: { year: number; month: number }) => void;
  minDate?: { year: number; month: number };
  maxDate?: { year: number; month: number };
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function MonthSelector({
  title,
  value,
  onChange,
  minDate,
  maxDate,
}: MonthSelectorProps) {
  const currentYear = value?.year || new Date().getFullYear();
  const currentMonth = value?.month || new Date().getMonth() + 1;
  const [isSelectingYear, setIsSelectingYear] = useState(false);

  const handleMonthClick = (mIndex: number) => {
    const newMonth = mIndex + 1;
    // Check constraints if provided
    if (
      minDate &&
      (currentYear < minDate.year ||
        (currentYear === minDate.year && newMonth < minDate.month))
    )
      return;
    if (
      maxDate &&
      (currentYear > maxDate.year ||
        (currentYear === maxDate.year && newMonth > maxDate.month))
    )
      return;
    onChange?.({ year: currentYear, month: newMonth });
  };

  const handleYearChange = (y: number) => {
    setIsSelectingYear(false);
    let newMonth = currentMonth;
    // Adjust month if it falls outside min/max for the new year
    if (minDate && y === minDate.year && newMonth < minDate.month)
      newMonth = minDate.month;
    if (maxDate && y === maxDate.year && newMonth > maxDate.month)
      newMonth = maxDate.month;
    onChange?.({ year: y, month: newMonth });
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

        {/* Content Area - toggles between Year Grid and Month Grid */}
        {isSelectingYear ? (
          <YearSelector
            value={currentYear}
            onChange={handleYearChange}
            minYear={minDate?.year || 1970}
            maxYear={maxDate?.year || new Date().getFullYear() + 10}
            hideContainer={true}
          />
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((monthStr, idx) => {
              const m = idx + 1;
              const isSelected = m === currentMonth;
              let isDisabled = false;
              if (
                minDate &&
                (currentYear < minDate.year ||
                  (currentYear === minDate.year && m < minDate.month))
              ) {
                isDisabled = true;
              }
              if (
                maxDate &&
                (currentYear > maxDate.year ||
                  (currentYear === maxDate.year && m > maxDate.month))
              ) {
                isDisabled = true;
              }

              return (
                <button
                  key={monthStr}
                  disabled={isDisabled}
                  onClick={() => handleMonthClick(idx)}
                  className={cn(
                    "flex items-center justify-center rounded-lg px-[8px] py-[10px] text-[12px] font-medium leading-[16px] transition-colors outline-none",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isDisabled
                        ? "cursor-not-allowed text-muted-foreground opacity-50"
                        : "text-foreground hover:bg-muted",
                  )}
                >
                  {monthStr}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
