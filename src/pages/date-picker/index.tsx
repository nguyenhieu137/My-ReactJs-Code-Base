import { useState } from "react";
import { YearSelector } from "@/shared/components/date-picker/YearSelector";
import {
  QuarterSelector,
  QuarterValue,
} from "@/shared/components/date-picker/QuarterSelector";
import { MonthSelector } from "@/shared/components/date-picker/MonthSelector";
import { DateSelector } from "@/shared/components/date-picker/DateSelector";
import { FilterChartYearRange } from "@/shared/components/date-picker/FilterChartYearRange";
import { FilterChartQuarterRange } from "@/shared/components/date-picker/FilterChartQuarterRange";
import { FilterChartMonthRange } from "@/shared/components/date-picker/FilterChartMonthRange";
import { FilterChartWeekRange } from "@/shared/components/date-picker/FilterChartWeekRange";
import { FilterChartDateRange } from "@/shared/components/date-picker/FilterChartDateRange";

export default function DatePickerPage() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedQuarter, setSelectedQuarter] = useState<QuarterValue>({
    year: new Date().getFullYear(),
    quarter: 1,
  });
  const [selectedMonth, setSelectedMonth] = useState<{
    year: number;
    month: number;
  }>({ year: new Date().getFullYear(), month: 1 });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [yearRange, setYearRange] = useState<{
    fromYear?: number;
    toYear?: number;
  }>({});
  const [quarterRange, setQuarterRange] = useState<{
    fromQuarter?: QuarterValue;
    toQuarter?: QuarterValue;
  }>({});
  const [monthRange, setMonthRange] = useState<{
    fromMonth?: { year: number; month: number };
    toMonth?: { year: number; month: number };
  }>({});
  const [weekRange, setWeekRange] = useState<{
    fromDate?: Date;
    toDate?: Date;
  }>({});
  const [dateRange, setDateRange] = useState<{
    fromDate?: Date;
    toDate?: Date;
  }>({});

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Date Selectors & Ranges
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Comprehensive suite of calendar and time picking components.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">
          Single Term Selectors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-slate-800">Year Selector</h3>
            <div className="flex justify-center">
              <YearSelector
                title="Select Year"
                value={selectedYear}
                onChange={setSelectedYear}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-slate-800">
              Quarter Selector
            </h3>
            <div className="flex justify-center">
              <QuarterSelector
                title="Select Quarter"
                value={selectedQuarter}
                onChange={setSelectedQuarter}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-slate-800">
              Month Selector
            </h3>
            <div className="flex justify-center">
              <MonthSelector
                title="Select Month"
                value={selectedMonth}
                onChange={setSelectedMonth}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold mb-4 text-slate-800">Date Selector</h3>
            <div className="flex justify-center">
              <DateSelector
                title="Select Date"
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">
          Range Popover Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-800">Year Range</h3>
            <FilterChartYearRange
              {...yearRange}
              onChange={setYearRange}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              From: {yearRange.fromYear} | To: {yearRange.toYear}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-800">Quarter Range</h3>
            <FilterChartQuarterRange
              {...quarterRange}
              onChange={setQuarterRange}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              From: {quarterRange.fromQuarter?.quarter} -{" "}
              {quarterRange.fromQuarter?.year} | To:{" "}
              {quarterRange.toQuarter?.quarter} - {quarterRange.toQuarter?.year}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-800">Month Range</h3>
            <FilterChartMonthRange
              {...monthRange}
              onChange={setMonthRange}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              From: {monthRange.fromMonth?.month}/{monthRange.fromMonth?.year} |
              To: {monthRange.toMonth?.month}/{monthRange.toMonth?.year}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-800">Week Range</h3>
            <FilterChartWeekRange
              {...weekRange}
              onChange={setWeekRange}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              From: {weekRange.fromDate?.toLocaleDateString()} | To:{" "}
              {weekRange.toDate?.toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-800">Date Range</h3>
            <FilterChartDateRange
              {...dateRange}
              onChange={setDateRange}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              From: {dateRange.fromDate?.toLocaleDateString()} | To:{" "}
              {dateRange.toDate?.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
