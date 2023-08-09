import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/ko";
import { useCalendar } from "../context/Calendar";

export function Calendar() {
  const { rangeDate, setRangeDate } = useCalendar();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <StaticDateRangePicker
        value={rangeDate}
        onChange={(value) => {
          console.log("calendar", value);
          setRangeDate(value);
        }}
        calendars={2}
        timezone="system"
        slots={{
          actionBar: undefined,
          toolbar: undefined,
          layout: (props) => {
            return <>{props.children}</>;
          },
        }}
        currentMonthCalendarPosition={1}
        shouldDisableDate={(day: any) => {
          return day.$D === 30 || day.$D === 20;
        }}
      />
    </LocalizationProvider>
  );
}
