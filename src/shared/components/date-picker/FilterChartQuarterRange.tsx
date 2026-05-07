import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils";
import { QuarterSelector, QuarterValue } from "./QuarterSelector";

export type { QuarterValue };

interface FilterChartQuarterRangeProps {
  fromQuarter?: QuarterValue;
  toQuarter?: QuarterValue;
  onChange?: (range: {
    fromQuarter?: QuarterValue;
    toQuarter?: QuarterValue;
    startDate?: Date;
    endDate?: Date;
  }) => void;
  className?: string;
  disableFuture?: boolean;
}

export function FilterChartQuarterRange({
  fromQuarter,
  toQuarter,
  onChange,
  className,
  disableFuture,
}: FilterChartQuarterRangeProps) {
  const [open, setOpen] = useState(false);

  const getQuarterBounds = (fromQ?: QuarterValue, toQ?: QuarterValue) => {
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (fromQ) {
      startDate = new Date(fromQ.year, (fromQ.quarter - 1) * 3, 1); // first day of first month
    }
    if (toQ) {
      endDate = new Date(toQ.year, toQ.quarter * 3, 0); // last day of last month
    }
    return { startDate, endDate };
  };

  const addQuarters = (q: QuarterValue, count: number): QuarterValue => {
    let newQuarter = q.quarter + count;
    let newYear = q.year;
    while (newQuarter > 4) {
      newQuarter -= 4;
      newYear++;
    }
    while (newQuarter < 1) {
      newQuarter += 4;
      newYear--;
    }
    return { year: newYear, quarter: newQuarter };
  };

  const handleFromChange = (q: QuarterValue) => {
    let newTo = toQuarter;
    if (
      !newTo ||
      newTo.year < q.year ||
      (newTo.year === q.year && newTo.quarter < q.quarter)
    ) {
      newTo = q;
    } else {
      const diff = (newTo.year - q.year) * 4 + (newTo.quarter - q.quarter);
      if (diff > 11) {
        newTo = addQuarters(q, 11);
      }
    }
    const bounds = getQuarterBounds(q, newTo);
    onChange?.({ fromQuarter: q, toQuarter: newTo, ...bounds });
  };

  const handleToChange = (q: QuarterValue) => {
    let newFrom = fromQuarter;
    if (newFrom) {
      if (
        q.year < newFrom.year ||
        (q.year === newFrom.year && q.quarter < newFrom.quarter)
      ) {
        newFrom = q;
      } else {
        const diff =
          (q.year - newFrom.year) * 4 + (q.quarter - newFrom.quarter);
        if (diff > 11) {
          newFrom = addQuarters(q, -11);
        }
      }
    }
    const bounds = getQuarterBounds(newFrom, q);
    onChange?.({ fromQuarter: newFrom, toQuarter: q, ...bounds });
  };

  const formatQuarterYear = (q?: QuarterValue) => {
    if (!q) return "";
    return `Q${q.quarter}, ${q.year}`;
  };

  const triggerText =
    fromQuarter &&
    toQuarter &&
    (fromQuarter.year !== toQuarter.year ||
      fromQuarter.quarter !== toQuarter.quarter)
      ? `${formatQuarterYear(fromQuarter)} - ${formatQuarterYear(toQuarter)}`
      : formatQuarterYear(fromQuarter) ||
        formatQuarterYear(toQuarter) ||
        formatQuarterYear({
          year: new Date().getFullYear(),
          quarter: Math.floor(new Date().getMonth() / 3) + 1,
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
          <QuarterSelector
            title="From"
            value={fromQuarter}
            onChange={handleFromChange}
            maxDate={
              disableFuture
                ? {
                    year: new Date().getFullYear(),
                    quarter: Math.floor(new Date().getMonth() / 3) + 1,
                  }
                : undefined
            }
          />
          <QuarterSelector
            title="To"
            value={toQuarter}
            onChange={handleToChange}
            maxDate={
              disableFuture
                ? {
                    year: new Date().getFullYear(),
                    quarter: Math.floor(new Date().getMonth() / 3) + 1,
                  }
                : undefined
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
