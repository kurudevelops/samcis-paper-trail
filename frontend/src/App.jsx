import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <AppLayout
      activePath="/dashboard"
      onNavigate={(path) => console.log("Navigate to:", path)}
      onLogout={() => console.log("Logout clicked")}
    >
      <p className="text-2xl text-center">Main Content Area (Placeholder)</p>
    </AppLayout>
  );
}

export default App;