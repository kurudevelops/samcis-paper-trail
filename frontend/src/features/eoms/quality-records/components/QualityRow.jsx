import ActionButtons from "./ActionButtons";

function formatDate(dateValue) {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function QualityRow({
  record,
  index = 0,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr
      className={`
        border-b
        border-gray-200
        transition
        hover:bg-blue-50
        ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
      `}
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-800">
        {record.qrCode || "—"}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-center text-gray-700">
        {formatDate(record.asOfDate)}
      </td>

      <td className="px-6 py-4 text-gray-700">
        <div className="font-medium text-gray-800">
          {record.title || "Untitled record"}
        </div>

        {record.fileName && (
          <div className="mt-1 text-xs text-gray-500">
            {record.fileName}
          </div>
        )}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-center text-gray-700">
        {formatDate(record.submissionDate)}
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <ActionButtons
          record={record}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}