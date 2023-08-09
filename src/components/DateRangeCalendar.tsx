import { DateRangePicker } from "@mui/x-date-pickers-pro";
import React from "react";
import { useCalendar } from "../context/Calendar";

export function DateRangeCalendar() {
  const { rangeDate, setRangeDate } = useCalendar();

  return (
    <DateRangePicker
      localeText={{ start: "체크인", end: "체크아웃" }}
      onChange={(value) => setRangeDate(value)}
      value={rangeDate}
    />
  );
}
