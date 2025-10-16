import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import Overview from "../../components/dashboard/Overview";
import BookingTable from "../../components/dashboard/BookingTable";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Navbar />
        <Overview />
        <BookingTable />
      </div>
    </div>
  );
}
