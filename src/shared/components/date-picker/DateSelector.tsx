/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Calendar } from "@/shared/components/ui/calendar";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { YearSelector } from "./YearSelector";
import { cn } from "@/shared/utils";
import { format, startOfWeek, addDays, startOfDay } from "date-fns";

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

export interface DateSelectorProps {
  title?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  highlightWeek?: boolean;
  highlightRange?: { from?: Date; to?: Date };
  disabled?: (date: Date) => boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
}

export function DateSelector({
  title,
  value,
  onChange,
  minDate,
  maxDate,
  highlightWeek,
  highlightRange,
  disabled,
  disableFuture,
  disablePast,
}: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(value || new Date());
  const [viewMode, setViewMode] = useState<"date" | "month" | "year">("date");

  const today = startOfDay(new Date());
  let effectiveMinDate = minDate;
  if (disablePast) {
    effectiveMinDate =
      !effectiveMinDate || today > effectiveMinDate ? today : effectiveMinDate;
  }
  let effectiveMaxDate = maxDate;
  if (disableFuture) {
    effectiveMaxDate =
      !effectiveMaxDate || today < effectiveMaxDate ? today : effectiveMaxDate;
  }

  let modifiers: Record<string, Date | ((date: Date) => boolean)> = {};
  let isRangeHandled = false;
  if (highlightWeek && value) {
    const start = startOfDay(startOfWeek(value, { weekStartsOn: 0 }));
    const end = addDays(start, 6);
    modifiers = {
      range_start: start,
      range_end: end,
      range_middle: (d: Date) => d > start && d < end,
    };
    isRangeHandled = true;
  } else if (highlightRange) {
    const from = highlightRange.from
      ? startOfDay(highlightRange.from)
      : undefined;
    const to = highlightRange.to ? startOfDay(highlightRange.to) : undefined;
    if (from && to) {
      const start = from < to ? from : to;
      const end = from > to ? from : to;
      modifiers = {
        range_start: start,
        range_end: end,
        range_middle: (d: Date) => d > start && d < end,
      };
    } else if (from) {
      modifiers = {
        range_start: from,
      };
    } else if (to) {
      modifiers = {
        range_end: to,
      };
    }
    isRangeHandled = true;
  }

  // update currentMonth if value changes to a different month
  React.useEffect(() => {
    if (
      value &&
      (value.getMonth() !== currentMonth.getMonth() ||
        value.getFullYear() !== currentMonth.getFullYear())
    ) {
      setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
    }
  }, [value]);

  const handlePrev = () => {
    if (viewMode === "month") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1),
      );
    } else {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
      );
    }
  };

  const handleNext = () => {
    if (viewMode === "month") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1),
      );
    } else {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
      );
    }
  };

  const canGoPrev = () => {
    if (!effectiveMinDate) return true;
    if (viewMode === "month")
      return currentMonth.getFullYear() > effectiveMinDate.getFullYear();
    return (
      currentMonth.getFullYear() > effectiveMinDate.getFullYear() ||
      (currentMonth.getFullYear() === effectiveMinDate.getFullYear() &&
        currentMonth.getMonth() > effectiveMinDate.getMonth())
    );
  };

  const canGoNext = () => {
    if (!effectiveMaxDate) return true;
    if (viewMode === "month")
      return currentMonth.getFullYear() < effectiveMaxDate.getFullYear();
    return (
      currentMonth.getFullYear() < effectiveMaxDate.getFullYear() ||
      (currentMonth.getFullYear() === effectiveMaxDate.getFullYear() &&
        currentMonth.getMonth() < effectiveMaxDate.getMonth())
    );
  };

  return (
    <div className="flex w-[260px] flex-col gap-[10px]">
      {title && (
        <div className="text-[14px] font-semibold leading-[20px] text-foreground">
          {title}
        </div>
      )}
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 shadow-sm">
        {/* Custom Header */}
        <div className="flex h-[32px] w-full items-center justify-between pb-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                setViewMode((v) => (v === "month" ? "date" : "month"))
              }
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-foreground hover:bg-muted outline-none"
            >
              {format(currentMonth, "MMM")}
              <ChevronDown
                className={cn(
                  "h-[14px] w-[14px] opacity-60 transition-transform",
                  viewMode === "month" && "rotate-180",
                )}
              />
            </button>

            <button
              onClick={() =>
                setViewMode((v) => (v === "year" ? "date" : "year"))
              }
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-foreground hover:bg-muted outline-none"
            >
              {format(currentMonth, "yyyy")}
              <ChevronDown
                className={cn(
                  "h-[14px] w-[14px] opacity-60 transition-transform",
                  viewMode === "year" && "rotate-180",
                )}
              />
            </button>
          </div>

          <div
            className={cn(
              "flex items-center gap-2",
              viewMode === "year" && "invisible",
            )}
          >
            <button
              onClick={handlePrev}
              disabled={!canGoPrev()}
              className="flex items-center justify-center p-1 text-foreground opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed outline-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className="flex items-center justify-center p-1 text-foreground opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed outline-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        {viewMode === "month" && (
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((monthStr, idx) => {
              const m = idx + 1;
              const year = currentMonth.getFullYear();
              const isSelected = m === currentMonth.getMonth() + 1;
              let isDisabled = false;
              if (
                effectiveMinDate &&
                (year < effectiveMinDate.getFullYear() ||
                  (year === effectiveMinDate.getFullYear() &&
                    m < effectiveMinDate.getMonth() + 1))
              ) {
                isDisabled = true;
              }
              if (
                effectiveMaxDate &&
                (year > effectiveMaxDate.getFullYear() ||
                  (year === effectiveMaxDate.getFullYear() &&
                    m > effectiveMaxDate.getMonth() + 1))
              ) {
                isDisabled = true;
              }

              return (
                <button
                  key={monthStr}
                  disabled={isDisabled}
                  onClick={() => {
                    setCurrentMonth(new Date(year, idx, 1));
                    setViewMode("date");
                  }}
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

        {viewMode === "year" && (
          <YearSelector
            value={currentMonth.getFullYear()}
            onChange={(y) => {
              setCurrentMonth(new Date(y, currentMonth.getMonth(), 1));
              setViewMode("date");
            }}
            minYear={effectiveMinDate?.getFullYear()}
            maxYear={effectiveMaxDate?.getFullYear()}
            hideContainer={true}
          />
        )}

        {viewMode === "date" && (
          <div className="w-full">
            <Calendar
              mode="single"
              selected={isRangeHandled ? undefined : value}
              onSelect={(d) => {
                if (d) onChange?.(d);
              }}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              modifiers={modifiers}
              disabled={[
                ...(disabled ? [disabled] : []),
                ...(effectiveMinDate ? [{ before: effectiveMinDate }] : []),
                ...(effectiveMaxDate ? [{ after: effectiveMaxDate }] : []),
              ]}
              className="w-full p-0"
              classNames={{
                nav: "hidden",
                month_caption: "hidden",
                months: "w-full",
                month: "w-full",
                week: cn(
                  "flex w-full mt-1 transition-colors overflow-hidden group/week",
                  highlightWeek && "hover:bg-muted rounded-lg",
                ),
                day: !highlightWeek
                  ? "hover:bg-muted hover:text-foreground rounded-md transition-colors"
                  : undefined,
              }}
              showOutsideDays={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
