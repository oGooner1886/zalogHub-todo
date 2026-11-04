export function formatToDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayKey(): string {
  return formatToDateKey(new Date());
}

export function getReadableHeaderDate(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' });
  const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const dayAndMonth = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

  return `${formattedWeekday}, ${dayAndMonth}`;
}

export function formatShortDate(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

export interface DayItem {
  dateKey: string;
  dayNumber: number;
  dayNameShort: string;
  isToday: boolean;
}

export function getWeekDays(referenceDate: Date = new Date(), daysOffset = 3): DayItem[] {
  const days: DayItem[] = [];
  const todayKey = getTodayKey();

  for (let i = -daysOffset; i <= 6 - daysOffset; i++) {
    const d = new Date(referenceDate);
    d.setDate(d.getDate() + i);

    const dateKey = formatToDateKey(d);
    const dayNumber = d.getDate();
    const dayNameShort = d
      .toLocaleDateString('ru-RU', { weekday: 'short' })
      .replace('.', '')
      .toUpperCase();

    days.push({
      dateKey,
      dayNumber,
      dayNameShort,
      isToday: dateKey === todayKey,
    });
  }

  return days;
}
