import PlanningActions from "./PlanningActions";

function formatSubmissionDate(dateValue) {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function PlanningRow({
  row,
  index = 0,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr
      className={`
        border-b
        border-gray-300
        transition-colors
        hover:bg-blue-50
        ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
      `}
    >
      <td className="px-6 py-4 text-gray-800">
        {row.planning || "Untitled planning document"}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-center text-gray-700">
        {row.academicYear || "—"}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-center text-gray-700">
        {formatSubmissionDate(row.submissionDate)}
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <PlanningActions
          row={row}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}