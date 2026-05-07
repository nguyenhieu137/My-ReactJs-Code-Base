import * as React from "react";
import { cn } from "@/shared/utils";

export interface AppTextAreaProps extends React.ComponentProps<"textarea"> {
  maxLine?: number;
}

const AppTextArea = React.forwardRef<HTMLTextAreaElement, AppTextAreaProps>(
  ({ className, maxLine, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          !maxLine && "min-h-[80px] resize-y",
          maxLine && "resize-none overflow-y-auto",
          className
        )}
        rows={maxLine}
        ref={ref}
        {...props}
      />
    );
  }
);
AppTextArea.displayName = "AppTextArea";

export { AppTextArea };
