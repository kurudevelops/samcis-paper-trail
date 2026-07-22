import RequestForActionActions from "./RequestForActionActions";

function getStatusColor(status) {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-700";

    case "In Progress":
      return "bg-yellow-100 text-yellow-700";

    case "For Review":
      return "bg-blue-100 text-blue-700";

    case "Closed":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RequestForActionRow({
  row,
  index = 0,
  onView,
}) {
  return (
    <tr
      className={`
        border-b
        border-gray-300
        transition-colors
        hover:bg-blue-50
        ${
          index % 2 === 0
            ? "bg-white"
            : "bg-gray-50"
        }
      `}
    >
      <td className="px-6 py-4 font-medium">
        {row.referenceNo}
      </td>

      <td className="px-6 py-4">
        {row.raType}
      </td>

      <td className="px-6 py-4 text-center">
        {formatDate(row.issueDate)}
      </td>

      <td className="px-6 py-4">
        {row.issuedBy}
      </td>

      <td className="px-6 py-4 text-center">
        <span
          className={`
            inline-flex
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${getStatusColor(row.status)}
          `}
        >
          {row.status}
        </span>
      </td>

      <td className="px-6 py-4">
        <RequestForActionActions
          row={row}
          onView={onView}
        />
      </td>

      {/*
      ======================================================

      BACKEND TEAM

      Expected response fields:

      id
      referenceNo
      raType
      issueDate
      issuedBy
      status

      ======================================================
      */}
    </tr>
  );
}