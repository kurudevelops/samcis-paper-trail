import Statcardsrow from "./components/Statcardsrow";
import Chartcard from "./components/Chartcard";
import BarChartWidget from "./components/BarChartWidget";
import PieChartWidget from "./components/PieChartWidget";
import { statCards, barChartData, pieChartData } from "./dashboard.data";

export default function Dashboard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-sm text-gray-500 mt-1">
        Welcome back, &lt;name&gt; | Unit:{" "}
        <span className="text-blue-600 font-medium">SMI</span> | Cluster:
        Academic
      </p>

      {/* KPI cards */}
      <div className="mt-6">
        <Statcardsrow cards={statCards} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Chartcard title="SMI Controlled Documents">
          <BarChartWidget data={barChartData} />
        </Chartcard>
        <Chartcard title="SMI Controlled Documents">
          <PieChartWidget data={pieChartData} />
        </Chartcard>
      </div>
    </div>
  );
}