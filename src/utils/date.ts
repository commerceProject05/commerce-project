import dayjs from "dayjs";

export function getDiffDay(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const timeDifferenceMs = endDate.getTime() - startDate.getTime();

  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const differenceInDays = Math.floor(timeDifferenceMs / millisecondsPerDay);

  return differenceInDays;
}

export function parseDateToKo(date: string) {
  if (!date) return "";
  return dayjs(date).format("YYYY년 MM월 DD일");
}
