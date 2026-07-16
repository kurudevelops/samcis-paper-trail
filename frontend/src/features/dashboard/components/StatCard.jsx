// Maps a "tone" name to actual Tailwind classes, so StatCardsRow/data
// only ever passes semantic names (danger, warning, accent, success)


const toneClasses = {
  danger: "text-red-500",
  warning: "text-amber-500",
  accent: "text-blue-500",
  success: "text-green-600",
};

export default function StatCard({ label, value, sub, tone = "accent" }) {
  const colorClass = toneClasses[tone] ?? toneClasses.accent;

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center">
      <span className={`text-[11px] font-semibold tracking-wide uppercase ${colorClass}`}>
        {label}
      </span>
      <span className={`text-3xl font-bold mt-2 ${colorClass}`}>{value}</span>
      {sub && <span className={`text-[11px] mt-1 ${colorClass}`}>{sub}</span>}
    </div>
  );
}