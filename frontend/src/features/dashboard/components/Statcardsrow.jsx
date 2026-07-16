import StatCard from "./StatCard";

export default function StatCardsRow({ cards }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.id} {...card} />
      ))}
    </div>
  );
}