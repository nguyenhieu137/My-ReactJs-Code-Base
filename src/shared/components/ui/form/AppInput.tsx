import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/utils";

export interface AppInputProps extends React.ComponentProps<"input"> {
  asChild?: boolean;
}

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, type, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    return (
      <Comp
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
AppInput.displayName = "AppInput";

export { AppInput };
