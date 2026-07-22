// ======================================================
// Calendar Service
// ------------------------------------------------------
// FRONTEND TEAM:
//
// This file temporarily provides calendar events and
// facility options while the backend API is unavailable.
//
// Do not place placeholder event data directly inside
// React components. Components should receive data from
// this service.
//
// BACKEND TEAM:
//
// Replace the placeholder functions with Axios requests.
//
// Example:
//
// import axios from "axios";
//
// export async function getCalendarEvents(filters = {}) {
//   const response = await axios.get("/api/calendar/events", {
//     params: filters,
//   });
//
//   return response.data;
// }
//
// The backend should determine which events the current
// user is allowed to see based on authentication, role,
// department, unit, ownership, and event visibility.
// ======================================================

const facilities = [
  {
    id: "all",
    name: "All Facilities",
  },
  {
    id: "bishop-carlito-cenzon-sports-center",
    name: "Bishop Carlito Cenzon Sports Center",
  },
  {
    id: "diego-silang-lobby-slot-1",
    name: "Diego Silang Building Lobby - Slot 1",
  },
  {
    id: "diego-silang-lobby-slot-2",
    name: "Diego Silang Building Lobby - Slot 2",
  },
  {
    id: "diego-silang-lobby-slot-3",
    name: "Diego Silang Building Lobby - Slot 3",
  },
  {
    id: "diego-silang-lobby-slot-4",
    name: "Diego Silang Building Lobby - Slot 4",
  },
  {
    id: "diego-silang-lobby-slot-5",
    name: "Diego Silang Building Lobby - Slot 5",
  },
  {
    id: "diego-silang-lobby-slot-6",
    name: "Diego Silang Building Lobby - Slot 6",
  },
  {
    id: "diego-silang-lobby-slot-7",
    name: "Diego Silang Building Lobby - Slot 7",
  },
  {
    id: "burgos-conference-room",
    name: "Burgos Conference Room",
  },
  {
    id: "fr-francis-gevers-hall",
    name: "Fr. Francis Gevers Hall",
  },
  {
    id: "fr-paul-van-parijs-event-center",
    name: "Fr. Paul Van Parijs Event Center",
  },
  {
    id: "fr-joseph-van-den-daelen",
    name: "Fr. Joseph Van den Daelen",
  },
  {
    id: "sirib-center",
    name: "SIRIB Center",
  },
  {
    id: "alejandro-roces-boardroom",
    name: "Alejandro Roces Boardroom",
  },
  {
    id: "cca-lobby",
    name: "CCA Lobby",
  },
  {
    id: "edutech-hub",
    name: "Edutech Hub",
  },
  {
    id: "fr-raphael-desmedt-athletic-oval",
    name: "Fr. Raphael Desmedt Athletic Oval",
  },
  {
    id: "fr-seraphin-devesse-av-room",
    name: "Fr. Seraphin Devesse: AV Room",
  },
  {
    id: "fr-theophile-verbist-hall",
    name: "Fr. Theophile Verbist Hall",
  },
  {
    id: "international-teahouse",
    name: "International Teahouse",
  },
  {
    id: "library-avr",
    name: "Library AVR",
  },
  {
    id: "prince-bernard-gymnasium",
    name: "Prince Bernard Gymnasium",
  },
  {
    id: "rizal-room",
    name: "Rizal Room",
  },
];

// ======================================================
// FRONTEND PLACEHOLDER EVENTS
//
// Field notes:
//
// id:
// Unique event identifier.
//
// title:
// Name displayed inside the calendar.
//
// startDate / endDate:
// ISO date strings used for calendar placement.
//
// startTime / endTime:
// Displayed in the event details panel.
//
// facilityId / facilityName:
// Used for facility filtering.
//
// status:
// Possible examples:
// "upcoming", "ongoing", "completed", "cancelled"
//
// visibility:
// Temporary frontend representation only.
// The backend must enforce actual authorization.
//
// ownerUserId:
// User who created or owns the event.
//
// allowedRoles:
// Roles allowed to view the event.
//
// allowedUnitIds:
// Units or departments allowed to view the event.
//
// isPublic:
// Whether every authenticated user may see it.
// ======================================================

const calendarEvents = [
  {
    id: 1,
    title: "SEALYMPICS 2026",
    startDate: "2026-06-30",
    endDate: "2026-07-15",
    startTime: "12:00 AM",
    endTime: "11:59 PM",
    facilityId: "bishop-carlito-cenzon-sports-center",
    facilityName: "Bishop Carlito Cenzon Sports Center",
    status: "ongoing",

    ownerUserId: 101,
    visibility: "public",
    isPublic: true,
    allowedRoles: [],
    allowedUnitIds: [],
  },
  {
    id: 2,
    title: "Blood Donation Drive (NSTP) (Side of F.O)",
    startDate: "2026-07-06",
    endDate: "2026-07-11",
    startTime: "8:00 AM",
    endTime: "5:00 PM",
    facilityId: "diego-silang-lobby-slot-5",
    facilityName: "Diego Silang Building Lobby - Slot 5",
    status: "ongoing",

    ownerUserId: 102,
    visibility: "public",
    isPublic: true,
    allowedRoles: [],
    allowedUnitIds: [],
  },
  {
    id: 3,
    title: "Symphonic Band - Ticket Selling",
    startDate: "2026-07-06",
    endDate: "2026-07-10",
    startTime: "7:30 AM",
    endTime: "3:00 PM",
    facilityId: "diego-silang-lobby-slot-1",
    facilityName: "Diego Silang Building Lobby - Slot 1",
    status: "ongoing",

    ownerUserId: 103,
    visibility: "public",
    isPublic: true,
    allowedRoles: [],
    allowedUnitIds: [],
  },
  {
    id: 4,
    title: "Graduate Program Marketing",
    startDate: "2026-07-01",
    endDate: "2026-07-03",
    startTime: "8:00 AM",
    endTime: "5:00 PM",
    facilityId: "diego-silang-lobby-slot-2",
    facilityName: "Diego Silang Building Lobby - Slot 2",
    status: "upcoming",

    ownerUserId: 104,
    visibility: "role-based",
    isPublic: false,
    allowedRoles: ["admin", "staff", "faculty"],
    allowedUnitIds: ["graduate-school"],
  },
  {
    id: 5,
    title: "Prism Reservation for Graduation",
    startDate: "2026-07-01",
    endDate: "2026-07-03",
    startTime: "9:00 AM",
    endTime: "4:00 PM",
    facilityId: "fr-paul-van-parijs-event-center",
    facilityName: "Fr. Paul Van Parijs Event Center",
    status: "upcoming",

    ownerUserId: 105,
    visibility: "unit-based",
    isPublic: false,
    allowedRoles: ["admin", "staff"],
    allowedUnitIds: ["registrar", "student-affairs"],
  },
  {
    id: 6,
    title: "TOGA RENTAL (SLOT 4)",
    startDate: "2026-07-01",
    endDate: "2026-07-03",
    startTime: "8:00 AM",
    endTime: "5:00 PM",
    facilityId: "diego-silang-lobby-slot-4",
    facilityName: "Diego Silang Building Lobby - Slot 4",
    status: "upcoming",

    ownerUserId: 106,
    visibility: "public",
    isPublic: true,
    allowedRoles: [],
    allowedUnitIds: [],
  },
  {
    id: 7,
    title: "CHED-OPSD Visit",
    startDate: "2026-07-02",
    endDate: "2026-07-02",
    startTime: "9:00 AM",
    endTime: "3:00 PM",
    facilityId: "alejandro-roces-boardroom",
    facilityName: "Alejandro Roces Boardroom",
    status: "upcoming",

    ownerUserId: 107,
    visibility: "role-based",
    isPublic: false,
    allowedRoles: ["admin", "management"],
    allowedUnitIds: [],
  },
  {
    id: 8,
    title: "SLU Dance Troupe Anonymous",
    startDate: "2026-07-04",
    endDate: "2026-07-04",
    startTime: "1:00 PM",
    endTime: "5:00 PM",
    facilityId: "fr-raphael-desmedt-athletic-oval",
    facilityName: "Fr. Raphael Desmedt Athletic Oval",
    status: "upcoming",

    ownerUserId: 108,
    visibility: "public",
    isPublic: true,
    allowedRoles: [],
    allowedUnitIds: [],
  },
  {
    id: 9,
    title: "The Buttress Journalism Masterclass and Journalism",
    startDate: "2026-07-05",
    endDate: "2026-07-05",
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    facilityId: "fr-francis-gevers-hall",
    facilityName: "Fr. Francis Gevers Hall",
    status: "upcoming",

    ownerUserId: 109,
    visibility: "public",
    isPublic: true,
    allowedRoles: [],
    allowedUnitIds: [],
  },
  {
    id: 10,
    title: "Louisan Spotlight 2.0",
    startDate: "2026-07-06",
    endDate: "2026-07-10",
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    facilityId: "cca-lobby",
    facilityName: "CCA Lobby",
    status: "upcoming",

    ownerUserId: 110,
    visibility: "public",
    isPublic: true,
    allowedRoles: [],
    allowedUnitIds: [],
  },
  {
    id: 11,
    title: "Campus Bizzhub",
    startDate: "2026-07-08",
    endDate: "2026-07-10",
    startTime: "8:00 AM",
    endTime: "5:00 PM",
    facilityId: "diego-silang-lobby-slot-3",
    facilityName: "Diego Silang Building Lobby - Slot 3",
    status: "upcoming",

    ownerUserId: 111,
    visibility: "public",
    isPublic: true,
    allowedRoles: [],
    allowedUnitIds: [],
  },
];

// Simulate a small API delay so loading states can be tested.
function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function getCalendarFacilities() {
  await wait(150);

  return facilities;
}

export async function getCalendarEvents(filters = {}) {
  await wait(250);

  const {
    year,
    month,
    facilityId = "all",

    // FRONTEND PLACEHOLDER USER CONTEXT
    // The backend should obtain this information from the
    // authenticated token/session instead of trusting values
    // sent directly by the browser.
    currentUserId,
    currentUserRole,
    currentUserUnitId,
  } = filters;

  return calendarEvents.filter((event) => {
    const eventStart = new Date(`${event.startDate}T00:00:00`);
    const eventEnd = new Date(`${event.endDate}T23:59:59`);

    const matchesMonth =
      typeof year !== "number" ||
      typeof month !== "number" ||
      (
        eventStart <= new Date(year, month + 1, 0, 23, 59, 59) &&
        eventEnd >= new Date(year, month, 1, 0, 0, 0)
      );

    const matchesFacility =
      facilityId === "all" || event.facilityId === facilityId;

    // ====================================================
    // FRONTEND VISIBILITY SIMULATION
    //
    // This is only for temporary UI testing.
    //
    // BACKEND TEAM:
    // The API must enforce access control before returning
    // event records. Hidden events should never be sent to
    // unauthorized users.
    // ====================================================

    const matchesVisibility =
      event.isPublic ||
      event.ownerUserId === currentUserId ||
      event.allowedRoles.includes(currentUserRole) ||
      event.allowedUnitIds.includes(currentUserUnitId);

    return matchesMonth && matchesFacility && matchesVisibility;
  });
}

export async function getUpcomingEvents(filters = {}) {
  const events = await getCalendarEvents(filters);

  const today = filters.today
    ? new Date(`${filters.today}T00:00:00`)
    : new Date();

  return events
    .filter((event) => {
      const eventEnd = new Date(`${event.endDate}T23:59:59`);

      return eventEnd >= today;
    })
    .sort((firstEvent, secondEvent) => {
      return (
        new Date(firstEvent.startDate) -
        new Date(secondEvent.startDate)
      );
    });
}