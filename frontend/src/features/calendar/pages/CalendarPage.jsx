import { useEffect, useMemo, useState } from "react";

import CalendarHeader from "../components/CalendarHeader";
import FacilityFilter from "../components/FacilityFilter";
import CalendarGrid from "../components/CalendarGrid";
import UpcomingEvents from "../components/UpcomingEvents";

import {
  getCalendarEvents,
  getCalendarFacilities,
  getUpcomingEvents,
} from "../services/calendarService";

// Temporary frontend user context.
//
// BACKEND TEAM:
// Replace this with the authenticated user's data.
// The backend should determine event visibility using
// the logged-in user's session or access token.
const CURRENT_USER = {
  id: 101,
  role: "staff",
  unitId: "smi",
};

export default function CalendarPage() {
  const today = useMemo(() => new Date(), []);

  const [currentDate, setCurrentDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedFacility, setSelectedFacility] =
    useState("all");

  const [facilities, setFacilities] = useState([]);
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] =
    useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  useEffect(() => {
    async function loadFacilities() {
      try {
        const facilityData =
          await getCalendarFacilities();

        setFacilities(facilityData);
      } catch (error) {
        console.error(
          "Failed to load calendar facilities:",
          error
        );

        setFacilities([]);
        setErrorMessage(
          "Unable to load facility options."
        );
      }
    }

    loadFacilities();
  }, []);

  useEffect(() => {
    async function loadCalendarData() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const filters = {
          year: currentYear,
          month: currentMonth,
          facilityId: selectedFacility,

          // Temporary frontend values only.
          // The backend should get these from authentication.
          currentUserId: CURRENT_USER.id,
          currentUserRole: CURRENT_USER.role,
          currentUserUnitId: CURRENT_USER.unitId,

          today: today.toISOString().split("T")[0],
        };

        const [eventData, upcomingData] =
          await Promise.all([
            getCalendarEvents(filters),
            getUpcomingEvents(filters),
          ]);

        setEvents(eventData);
        setUpcomingEvents(upcomingData);
      } catch (error) {
        console.error(
          "Failed to load calendar data:",
          error
        );

        setEvents([]);
        setUpcomingEvents([]);
        setErrorMessage(
          "Unable to load calendar events."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCalendarData();
  }, [
    currentMonth,
    currentYear,
    selectedFacility,
    today,
    refreshKey,
  ]);

  function handlePreviousMonth() {
    setCurrentDate(
      (previousDate) =>
        new Date(
          previousDate.getFullYear(),
          previousDate.getMonth() - 1,
          1
        )
    );
  }

  function handleNextMonth() {
    setCurrentDate(
      (previousDate) =>
        new Date(
          previousDate.getFullYear(),
          previousDate.getMonth() + 1,
          1
        )
    );
  }

  function handleToday() {
    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );
  }

  function handleFacilityChange(event) {
    setSelectedFacility(event.target.value);
  }

  function handleRefresh() {
    setRefreshKey(
      (previousKey) => previousKey + 1
    );
  }

  return (
    <div className="space-y-6">
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <FacilityFilter
          facilities={facilities}
          selectedFacility={selectedFacility}
          onFacilityChange={handleFacilityChange}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        {errorMessage && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            isLoading={isLoading}
          />

          <UpcomingEvents
            events={upcomingEvents}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}