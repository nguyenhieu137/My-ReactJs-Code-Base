import * as React from "react";
import { ClockIcon } from "lucide-react";
import dayjs from "dayjs";
import { AppInput } from "./AppInput";
import { cn } from "@/shared/utils";

export type TimePickerProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "type"
> & {
  onChange?: (time: Date | undefined) => void;
  value?: Date | null;
  format?: string;
  disabled?: boolean;
};

const AppTimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      onChange,
      value,
      format = "HH:mm",
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const timeValue = React.useMemo(() => {
      if (!value) return "";
      return dayjs(value).format("HH:mm");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const timeString = e.target.value;
      if (!timeString) {
        onChange?.(undefined);
        return;
      }

      const [hours, minutes] = timeString.split(":");
      const date = dayjs()
        .hour(parseInt(hours, 10))
        .minute(parseInt(minutes, 10))
        .second(0)
        .toDate();
      onChange?.(date);
    };

    return (
      <div className="relative flex flex-col gap-3 w-full">
        <div className="relative">
          <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none z-10" />
          <AppInput
            type="time"
            value={timeValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "pl-9 pr-3 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);

AppTimePicker.displayName = "AppTimePicker";

export { AppTimePicker };
