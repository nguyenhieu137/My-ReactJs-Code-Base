import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils";
import { format } from "date-fns";
import { DateSelector } from "./DateSelector";

interface FilterChartDateRangeProps {
  fromDate?: Date;
  toDate?: Date;
  onChange?: (range: { fromDate?: Date; toDate?: Date }) => void;
  disabledDates?: (date: Date) => boolean;
  className?: string;
  disableFuture?: boolean;
}

export function FilterChartDateRange({
  fromDate,
  toDate,
  onChange,
  disabledDates,
  className,
  disableFuture,
}: FilterChartDateRangeProps) {
  const [open, setOpen] = useState(false);

  const finalDisabledDates = (d: Date) => {
    if (disableFuture) {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (d > today) return true;
    }
    return disabledDates?.(d) || false;
  };

  const handleFromChange = (d: Date) => {
    let newTo = toDate;
    if (!newTo || newTo < d) {
      newTo = d;
    }
    onChange?.({ fromDate: d, toDate: newTo });
  };

  const handleToChange = (d: Date) => {
    let newFrom = fromDate;
    if (!newFrom || newFrom > d) {
      newFrom = d;
    }
    onChange?.({ fromDate: newFrom, toDate: d });
  };

  const triggerText =
    fromDate && toDate
      ? `${format(fromDate, "MMM dd, yyyy")} - ${format(toDate, "MMM dd, yyyy")}`
      : "Select date range";

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
          <DateSelector
            title="From"
            value={fromDate}
            onChange={handleFromChange}
            highlightRange={{ from: fromDate, to: toDate }}
            disabled={finalDisabledDates}
            maxDate={disableFuture ? new Date() : undefined}
          />
          <DateSelector
            title="To"
            value={toDate}
            onChange={handleToChange}
            highlightRange={{ from: fromDate, to: toDate }}
            disabled={finalDisabledDates}
            maxDate={disableFuture ? new Date() : undefined}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
