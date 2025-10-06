import Navbar from "../components/Navbar";
import PaymentsPage from "../components/Payment";
import Sidebar from "../components/Sidebar";

export default function Bookings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y">
        <Navbar />
        <PaymentsPage />
      </div>
    </div>
  );
}
