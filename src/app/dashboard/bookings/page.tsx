import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BookingTable from "../components/BookingTable";

export default function Bookings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y">
        <Navbar />
        <BookingTable />
      </div>
    </div>
  );
}
