import Sidebar from "../components/Sidebar";
import SettingPage from "../components/Setting";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar></Sidebar>
      <div className="flex-1 p-6 overflow-y">
        <SettingPage />
      </div>
    </div>
  );
}
