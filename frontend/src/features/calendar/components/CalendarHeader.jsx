import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

export default function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
}) {
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">

      {/* ===========================================
          Calendar Title
      =========================================== */}

      <div className="flex items-center justify-between flex-wrap gap-4">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            Calendar
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View upcoming events, reservations and
            facility schedules.
          </p>

        </div>

        {/* ===========================================
            Navigation Buttons
        =========================================== */}

        <div className="flex items-center gap-2">

          <button
            onClick={onToday}
            className="
              px-4
              py-2
              rounded-md
              bg-blue-900
              text-white
              hover:bg-blue-800
              transition
            "
          >
            Today
          </button>

          <button
            onClick={onPreviousMonth}
            className="
              p-2
              rounded-md
              border
              border-gray-300
              hover:bg-gray-100
              transition
            "
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="
              flex
              items-center
              gap-2
              px-5
              py-2
              rounded-md
              bg-gray-100
            "
          >
            <CalendarDays
              size={18}
              className="text-blue-900"
            />

            <span className="font-semibold">
              {monthName}
            </span>
          </div>

          <button
            onClick={onNextMonth}
            className="
              p-2
              rounded-md
              border
              border-gray-300
              hover:bg-gray-100
              transition
            "
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}