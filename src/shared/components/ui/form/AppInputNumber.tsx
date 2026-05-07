import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { AppInput } from "./AppInput";

const AppInputNumber = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "ref"> & NumericFormatProps
>((props, ref) => {
  return <NumericFormat customInput={AppInput} getInputRef={ref} {...props} />;
});

AppInputNumber.displayName = "AppInputNumber";

export { AppInputNumber };
