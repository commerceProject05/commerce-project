import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { DateRange } from "@mui/x-date-pickers-pro";

type CalendarContextType = {
  rangeDate: [any, any];
  setRangeDate: Dispatch<SetStateAction<DateRange<any>>>;
};
export const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ children }: PropsWithChildren) {
  const [rangeDate, setRangeDate] = useState<DateRange<any>>([null, null]);

  return (
    <CalendarContext.Provider value={{ rangeDate, setRangeDate }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const calendarContext = useContext(CalendarContext);

  if (!calendarContext) {
    throw Error("CalendarContext cannot be null!");
  }

  return calendarContext;
}
