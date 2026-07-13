import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./features/dashboard/Dashboard"

function App() {
  return (
    <AppLayout activePath="/dashboard">
      <Dashboard />
    </AppLayout>
  );
}

export default App;