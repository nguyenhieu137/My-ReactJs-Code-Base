import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/shared/utils";

export interface IOption {
  label: React.ReactNode;
  value: string;
}

export interface AppRadioInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "onChange"
  > {
  value?: string;
  onChange?: (value: string, data: IOption) => void;
  options: IOption[];
  direction?: "row" | "col";
}

const AppRadioInput = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  AppRadioInputProps
>(
  (
    { value, onChange, options, direction = "row", className, ...props },
    ref
  ) => {
    return (
      <RadioGroupPrimitive.Root
        value={value}
        onValueChange={(val) => {
          if (onChange) {
            const selectedOption = options.find((opt) => opt.value === val);
            if (selectedOption) onChange(val, selectedOption);
          }
        }}
        className={cn(
          "flex gap-4",
          direction === "row" ? "flex-row flex-wrap" : "flex-col",
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupPrimitive.Item
              value={option.value}
              id={option.value}
              className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-current" />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <LabelPrimitive.Root
              htmlFor={option.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {option.label}
            </LabelPrimitive.Root>
          </div>
        ))}
      </RadioGroupPrimitive.Root>
    );
  }
);

AppRadioInput.displayName = "AppRadioInput";

export { AppRadioInput };
