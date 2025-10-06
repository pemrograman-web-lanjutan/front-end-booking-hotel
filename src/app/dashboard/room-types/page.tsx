import Navbar from "../components/Navbar";
import RoomTypesPage from "../components/room-type";
import Sidebar from "../components/Sidebar";

export default function Bookings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y">
        <Navbar />
        <RoomTypesPage />
      </div>
    </div>
  );
}
