// ======================================================
// QUALITY RECORDS SERVICE
//
// Temporary frontend service.
//
// BACKEND TEAM:
// Replace these functions with Axios calls to the
// Quality Records API.
//
// Expected features:
//
// - List records
// - Search
// - Upload
// - Update
// - Delete
// - Pagination
// - Sorting
//
// ======================================================

const qualityRecords = [
  {
    id: 1,
    qrCode: "QR-SMI-001",
    asOfDate: "2026-04-08",
    title: "Minutes of the Meeting",
    submissionDate: "2026-06-16",
    fileName: "minutes-meeting.pdf",
    uploadedBy: "Quality Assurance",
  },
  {
    id: 2,
    qrCode: "QR-SMI-002",
    asOfDate: "2026-04-28",
    title: "Minutes of the Meeting",
    submissionDate: "2026-06-16",
    fileName: "meeting-2.pdf",
    uploadedBy: "Quality Assurance",
  },
  {
    id: 3,
    qrCode: "QR-SMI-003",
    asOfDate: "2026-05-19",
    title: "Minutes of the Meeting",
    submissionDate: "2026-06-16",
    fileName: "meeting-3.pdf",
    uploadedBy: "Registrar",
  },
  {
    id: 4,
    qrCode: "QR-SMI-004",
    asOfDate: "2026-06-08",
    title: "Minutes of the Meeting",
    submissionDate: "2026-06-16",
    fileName: "meeting-4.pdf",
    uploadedBy: "Registrar",
  },
  {
    id: 5,
    qrCode: "QR-SMI-005",
    asOfDate: "2026-06-11",
    title: "Minutes of the Meeting",
    submissionDate: "2026-06-16",
    fileName: "meeting-5.pdf",
    uploadedBy: "Dean",
  },
  {
    id: 6,
    qrCode: "QR-SMI-006",
    asOfDate: "2024-01-13",
    title: "Memos",
    submissionDate: "2026-06-16",
    fileName: "memo-1.pdf",
    uploadedBy: "HR Office",
  },
];

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getQualityRecords(search = "") {
  await delay();

  if (!search.trim()) {
    return qualityRecords;
  }

  const keyword = search.toLowerCase();

  return qualityRecords.filter(
    (record) =>
      record.qrCode.toLowerCase().includes(keyword) ||
      record.title.toLowerCase().includes(keyword)
  );
}

export async function uploadQualityRecord(record) {
  await delay();

  console.log("Upload placeholder:", record);

  return {
    success: true,
  };
}

export async function updateQualityRecord(id, updatedRecord) {
  await delay();

  console.log("Update placeholder:", id, updatedRecord);

  return {
    success: true,
  };
}

export async function deleteQualityRecord(id) {
  await delay();

  console.log("Delete placeholder:", id);

  return {
    success: true,
  };
}