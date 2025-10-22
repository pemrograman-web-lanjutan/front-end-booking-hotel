import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import BookingTable from "../../components/dashboard/BookingTable";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Navbar />
        <BookingTable />
      </div>
    </div>
  );
}
