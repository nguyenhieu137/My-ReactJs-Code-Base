import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils";
import { MonthSelector } from "./MonthSelector";

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

export interface DateValue {
  year: number;
  month: number;
}

interface FilterChartMonthRangeProps {
  fromMonth?: DateValue;
  toMonth?: DateValue;
  onChange?: (range: { fromMonth?: DateValue; toMonth?: DateValue }) => void;
  className?: string;
  disableFuture?: boolean;
}

export function FilterChartMonthRange({
  fromMonth,
  toMonth,
  onChange,
  className,
  disableFuture,
}: FilterChartMonthRangeProps) {
  const [open, setOpen] = useState(false);

  const addMonths = (d: DateValue, count: number): DateValue => {
    let newMonth = d.month + count;
    let newYear = d.year;
    while (newMonth > 12) {
      newMonth -= 12;
      newYear++;
    }
    while (newMonth < 1) {
      newMonth += 12;
      newYear--;
    }
    return { year: newYear, month: newMonth };
  };

  const handleFromChange = (d: DateValue) => {
    let newTo = toMonth;
    if (
      !newTo ||
      newTo.year < d.year ||
      (newTo.year === d.year && newTo.month < d.month)
    ) {
      newTo = d;
    } else {
      const diff = (newTo.year - d.year) * 12 + (newTo.month - d.month);
      if (diff > 11) {
        newTo = addMonths(d, 11);
      }
    }
    onChange?.({ fromMonth: d, toMonth: newTo });
  };

  const handleToChange = (d: DateValue) => {
    let newFrom = fromMonth;
    if (newFrom) {
      if (
        d.year < newFrom.year ||
        (d.year === newFrom.year && d.month < newFrom.month)
      ) {
        newFrom = d;
      } else {
        const diff = (d.year - newFrom.year) * 12 + (d.month - newFrom.month);
        if (diff > 11) {
          newFrom = addMonths(d, -11);
        }
      }
    }
    onChange?.({ fromMonth: newFrom, toMonth: d });
  };

  const formatMonthYear = (d?: DateValue) => {
    if (!d) return "";
    return `${MONTHS[d.month - 1]} ${d.year}`;
  };

  const triggerText =
    fromMonth &&
    toMonth &&
    (fromMonth.year !== toMonth.year || fromMonth.month !== toMonth.month)
      ? `${formatMonthYear(fromMonth)} - ${formatMonthYear(toMonth)}`
      : formatMonthYear(fromMonth) ||
        formatMonthYear(toMonth) ||
        formatMonthYear({
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex h-[26px] items-center justify-between gap-1 rounded-lg border border-border bg-background px-3 py-1 pl-3 pr-2 outline-none",
            "text-[12px] font-medium leading-[16px] text-foreground",
            "data-[state=open]:ring-2 data-[state=open]:ring-ring",
            className,
          )}
        >
          {triggerText}
          <ChevronDown className="ml-[2px] h-4 w-4 text-foreground opacity-60" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="flex w-auto flex-col gap-4 rounded-xl border border-border bg-background p-4 shadow-md outline-none"
      >
        <div className="flex w-auto flex-row gap-6">
          <MonthSelector
            title="From"
            value={fromMonth}
            onChange={handleFromChange}
            maxDate={
              disableFuture
                ? {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                  }
                : undefined
            }
          />
          <MonthSelector
            title="To"
            value={toMonth}
            onChange={handleToChange}
            maxDate={
              disableFuture
                ? {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1,
                  }
                : undefined
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
