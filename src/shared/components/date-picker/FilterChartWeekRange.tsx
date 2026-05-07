import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils";
import {
  startOfWeek,
  endOfWeek,
  format,
  addWeeks,
  differenceInWeeks,
} from "date-fns";
import { DateSelector } from "./DateSelector";

interface FilterChartWeekRangeProps {
  fromDate?: Date;
  toDate?: Date;
  onChange?: (range: { fromDate?: Date; toDate?: Date }) => void;
  disabledDates?: (date: Date) => boolean;
  className?: string;
  disableFuture?: boolean;
}

export function FilterChartWeekRange({
  fromDate,
  toDate,
  onChange,
  disabledDates,
  className,
  disableFuture,
}: FilterChartWeekRangeProps) {
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
    const newFrom = startOfWeek(d, { weekStartsOn: 0 }); // Sunday
    let newTo = toDate;
    if (!newTo || newTo < newFrom) {
      newTo = endOfWeek(d, { weekStartsOn: 0 }); // Saturday
    } else {
      const diff = differenceInWeeks(
        startOfWeek(newTo, { weekStartsOn: 0 }),
        newFrom,
      );
      if (diff > 11) {
        newTo = endOfWeek(addWeeks(newFrom, 11), { weekStartsOn: 0 });
      }
    }
    onChange?.({ fromDate: newFrom, toDate: newTo });
  };

  const handleToChange = (d: Date) => {
    let newFrom = fromDate;
    const newTo = endOfWeek(d, { weekStartsOn: 0 }); // Saturday
    if (!newFrom || newFrom > newTo) {
      newFrom = startOfWeek(d, { weekStartsOn: 0 }); // Sunday
    } else {
      const diff = differenceInWeeks(
        startOfWeek(newTo, { weekStartsOn: 0 }),
        startOfWeek(newFrom, { weekStartsOn: 0 }),
      );
      if (diff > 11) {
        newFrom = startOfWeek(addWeeks(newTo, -11), { weekStartsOn: 0 });
      }
    }
    onChange?.({ fromDate: newFrom, toDate: newTo });
  };

  const triggerText =
    fromDate && toDate
      ? `${format(fromDate, "MMM dd, yyyy")} - ${format(toDate, "MMM dd, yyyy")}`
      : "Select week";

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
            highlightWeek
            disabled={finalDisabledDates}
            maxDate={disableFuture ? new Date() : undefined}
          />
          <DateSelector
            title="To"
            value={toDate}
            onChange={handleToChange}
            highlightWeek
            disabled={finalDisabledDates}
            maxDate={disableFuture ? new Date() : undefined}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
