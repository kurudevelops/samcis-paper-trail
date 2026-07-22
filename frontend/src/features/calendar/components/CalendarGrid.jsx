const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function isSameDay(dateOne, dateTwo) {
  return (
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth() &&
    dateOne.getDate() === dateTwo.getDate()
  );
}

function buildCalendarDays(currentDate) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const calendarStart = new Date(firstDayOfMonth);

  calendarStart.setDate(
    calendarStart.getDate() - firstDayOfMonth.getDay()
  );

  const calendarEnd = new Date(lastDayOfMonth);

  calendarEnd.setDate(
    calendarEnd.getDate() + (6 - lastDayOfMonth.getDay())
  );

  const days = [];
  const currentDay = new Date(calendarStart);

  while (currentDay <= calendarEnd) {
    days.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return days;
}

function getEventsForDay(events, day) {
  return events.filter((event) => {
    if (!event.startDate) {
      return false;
    }

    const eventStart = new Date(
      `${event.startDate}T00:00:00`
    );

    const eventEnd = new Date(
      `${event.endDate || event.startDate}T23:59:59`
    );

    return day >= eventStart && day <= eventEnd;
  });
}

function getEventStyle(status) {
  switch (status?.toLowerCase()) {
    case "ongoing":
      return "bg-green-100 text-green-800 border-green-200";

    case "completed":
      return "bg-gray-100 text-gray-700 border-gray-200";

    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";

    case "upcoming":
    default:
      return "bg-blue-100 text-blue-900 border-blue-200";
  }
}

export default function CalendarGrid({
  currentDate,
  events = [],
  isLoading = false,
}) {
  const today = new Date();
  const calendarDays = buildCalendarDays(currentDate);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] overflow-hidden rounded-lg border border-gray-200 bg-white">
        {/* Weekday headings */}
        <div className="grid grid-cols-7 bg-blue-900 text-white">
          {WEEK_DAYS.map((weekDay) => (
            <div
              key={weekDay}
              className="border-r border-blue-800 px-2 py-3 text-center text-sm font-semibold last:border-r-0"
            >
              {weekDay}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day) => {
            const dayEvents = getEventsForDay(events, day);

            const isCurrentMonth =
              day.getMonth() === currentDate.getMonth();

            const isToday = isSameDay(day, today);

            return (
              <div
                key={day.toISOString()}
                className={`
                  min-h-[125px]
                  border-b
                  border-r
                  border-gray-200
                  p-2
                  transition
                  hover:bg-blue-50
                  ${
                    isCurrentMonth
                      ? "bg-white"
                      : "bg-gray-50 text-gray-400"
                  }
                `}
              >
                {/* Day number */}
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      text-sm
                      font-semibold
                      ${
                        isToday
                          ? "bg-blue-900 text-white"
                          : isCurrentMonth
                            ? "text-gray-700"
                            : "text-gray-400"
                      }
                    `}
                  >
                    {day.getDate()}
                  </span>

                  {dayEvents.length > 0 && !isLoading && (
                    <span className="text-[10px] font-medium text-gray-400">
                      {dayEvents.length}
                    </span>
                  )}
                </div>

                {/* Loading state */}
                {isLoading && (
                  <div className="space-y-2">
                    <div className="h-5 animate-pulse rounded bg-gray-200" />

                    <div className="h-5 animate-pulse rounded bg-gray-200" />
                  </div>
                )}

                {/* Events */}
                {!isLoading && (
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        title={event.title}
                        className={`
                          block
                          w-full
                          truncate
                          rounded
                          border
                          px-2
                          py-1
                          text-left
                          text-[11px]
                          font-medium
                          transition
                          hover:opacity-80
                          ${getEventStyle(event.status)}
                        `}
                      >
                        {event.startTime && (
                          <span className="mr-1 font-semibold">
                            {event.startTime}
                          </span>
                        )}

                        {event.title}
                      </button>
                    ))}

                    {dayEvents.length > 3 && (
                      <button
                        type="button"
                        className="w-full rounded px-2 py-1 text-left text-[11px] font-semibold text-blue-800 transition hover:bg-blue-100"
                      >
                        +{dayEvents.length - 3} more
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/*
          BACKEND TEAM:

          The backend should return only events that the
          authenticated user is allowed to view.

          Expected event fields:

          {
            id,
            title,
            startDate,
            endDate,
            startTime,
            endTime,
            status,
            facilityId,
            facilityName
          }

          Frontend filtering must not be treated as security.
        */}
      </div>
    </div>
  );
}