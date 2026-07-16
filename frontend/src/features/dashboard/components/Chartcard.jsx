export default function Chartcard({ title, children }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">{title}</h2>
      {children}
    </div>
  );
}