import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils";
import { YearSelector } from "./YearSelector";

interface FilterChartYearRangeProps {
  fromYear?: number;
  toYear?: number;
  onChange?: (range: { fromYear?: number; toYear?: number }) => void;
  disabledYears?: number[];
  className?: string;
  disableFuture?: boolean;
}

export function FilterChartYearRange({
  fromYear,
  toYear,
  onChange,
  disabledYears = [],
  className,
  disableFuture,
}: FilterChartYearRangeProps) {
  const [open, setOpen] = useState(false);

  const handleFromChange = (y: number) => {
    let newTo = toYear;
    if (!newTo || newTo < y) {
      newTo = y;
    } else {
      const diff = newTo - y;
      if (diff > 11) {
        newTo = y + 11;
      }
    }
    onChange?.({ fromYear: y, toYear: newTo });
  };

  const handleToChange = (y: number) => {
    let newFrom = fromYear;
    if (newFrom) {
      if (y < newFrom) {
        newFrom = y;
      } else {
        const diff = y - newFrom;
        if (diff > 11) {
          newFrom = y - 11;
        }
      }
    }
    onChange?.({ fromYear: newFrom, toYear: y });
  };

  const triggerText =
    fromYear && toYear && fromYear !== toYear
      ? `${fromYear} - ${toYear}`
      : fromYear || toYear || new Date().getFullYear();

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
          <YearSelector
            title="From"
            value={fromYear}
            onChange={handleFromChange}
            disabledYears={disabledYears}
            maxYear={
              disableFuture
                ? new Date().getFullYear()
                : new Date().getFullYear() + 10
            }
          />
          <YearSelector
            title="To"
            value={toYear}
            onChange={handleToChange}
            disabledYears={disabledYears}
            maxYear={
              disableFuture
                ? new Date().getFullYear()
                : new Date().getFullYear() + 10
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
