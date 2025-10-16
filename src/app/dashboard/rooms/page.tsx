import Navbar from "../../../components/dashboard/Navbar";
import RoomsPage from "../../../components/dashboard/Room";
import Sidebar from "../../../components/dashboard/Sidebar";

export default function Bookings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y">
        <Navbar />
        <RoomsPage />
      </div>
    </div>
  );
}
