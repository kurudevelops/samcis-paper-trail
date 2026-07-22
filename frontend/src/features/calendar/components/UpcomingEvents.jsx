import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

function formatEventDate(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  const startLabel = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const endLabel = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (startDate === endDate) {
    return startLabel;
  }

  return `${startLabel} - ${endLabel}`;
}

function getStatusClasses(status) {
  switch (status) {
    case "ongoing":
      return "bg-green-100 text-green-700";

    case "completed":
      return "bg-gray-200 text-gray-600";

    case "cancelled":
      return "bg-red-100 text-red-700";

    case "upcoming":
    default:
      return "bg-blue-100 text-blue-700";
  }
}

export default function UpcomingEvents({
  events = [],
  isLoading = false,
}) {
  return (
    <aside className="rounded-lg border border-gray-200 bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-2">
          <CalendarDays
            size={19}
            className="text-blue-900"
          />

          <h2 className="font-bold text-gray-800">
            Upcoming Events
          </h2>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          Scheduled events visible to the current user.
        </p>
      </div>

      {/* Event list */}
      <div className="max-h-[650px] space-y-3 overflow-y-auto p-4">
        {isLoading ? (
          <>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-3 h-3 w-1/2 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
              </div>
            ))}
          </>
        ) : events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-10 text-center">
            <CalendarDays
              size={30}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm font-medium text-gray-600">
              No upcoming events
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Events will appear here once schedules are available.
            </p>
          </div>
        ) : (
          events.map((event) => (
            <article
              key={event.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold leading-5 text-gray-800">
                  {event.title}
                </h3>

                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusClasses(
                    event.status
                  )}`}
                >
                  {event.status || "upcoming"}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <CalendarDays
                    size={14}
                    className="mt-0.5 shrink-0 text-blue-800"
                  />

                  <span>
                    {formatEventDate(
                      event.startDate,
                      event.endDate
                    )}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <Clock3
                    size={14}
                    className="mt-0.5 shrink-0 text-blue-800"
                  />

                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-blue-800"
                  />

                  <span>{event.facilityName}</span>
                </div>
              </div>

              {/* ==================================================
                  BACKEND TEAM

                  Add event-detail navigation here when the
                  event-details endpoint and page are available.

                  Example:

                  onClick={() => navigate(`/calendar/events/${event.id}`)}

                  The backend must still verify that the current
                  user is authorized to view the selected event.
              ================================================== */}

              <button
                type="button"
                className="mt-4 text-xs font-semibold text-blue-800 transition hover:text-blue-600"
              >
                View details
              </button>
            </article>
          ))
        )}
      </div>
    </aside>
  );
}