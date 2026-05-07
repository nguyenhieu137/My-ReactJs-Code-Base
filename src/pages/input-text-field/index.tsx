import { useState } from "react";
import { AppInput } from "@/shared/components/ui/form/AppInput";
import { AppInputNumber } from "@/shared/components/ui/form/AppInputNumber";
import { AppTextArea } from "@/shared/components/ui/form/AppTextArea";
import { AppRadioInput, IOption } from "@/shared/components/ui/form/AppRadioInput";
import { AppTimePicker } from "@/shared/components/ui/form/AppTimePicker";

export default function InputTextField() {
  const [radioValue, setRadioValue] = useState<string>("option1");
  const [timeValue, setTimeValue] = useState<Date | undefined>(new Date());

  const radioOptions: IOption[] = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Form Input Components
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Comprehensive examples of customized Shadcn UI input components.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm max-w-3xl">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6 border-b pb-2">Single Line Inputs</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Standard Input
            </label>
            <AppInput type="text" placeholder="Enter standard text here..." />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Email Input
            </label>
            <AppInput type="email" placeholder="Email address" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Number Format Input
            </label>
            <AppInputNumber hundredSeparator="," placeholder="1,000,000" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Disabled Input
            </label>
            <AppInput type="text" disabled placeholder="Disabled field" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              With Value File
            </label>
            <AppInput type="file" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm max-w-3xl">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6 border-b pb-2">Text Area</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Default Text Area (Auto-resize / Manual resize)
            </label>
            <AppTextArea placeholder="Type your message here..." />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Fixed Max Lines (maxLine={3})
            </label>
            <AppTextArea 
              maxLine={3} 
              placeholder="This text area is fixed to exactly 3 lines of height. If you type more content, a vertical scrollbar will appear instead of resizing the actual box." 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm max-w-3xl">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6 border-b pb-2">Selection & Pickers</h3>
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-700">
              Radio Group (Row Direction)
            </label>
            <AppRadioInput 
              options={radioOptions} 
              value={radioValue} 
              onChange={setRadioValue} 
              direction="row"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-700">
              Time Picker
            </label>
            <div className="w-64">
              <AppTimePicker 
                value={timeValue} 
                onChange={setTimeValue} 
              />
            </div>
            <p className="text-xs text-neutral-500">
              Selected Time: {timeValue ? timeValue.toLocaleTimeString() : 'None'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
