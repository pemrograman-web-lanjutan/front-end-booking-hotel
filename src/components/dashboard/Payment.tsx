"use client";

import { useState } from "react";
import PaymentModal from "../modal/ModalFormPayment";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      bookingId: "BKG-101",
      amount: 1200000,
      method: "Credit Card",
      status: "Paid",
      transactionId: "TXN-9087",
      date: "2025-09-18",
    },
    {
      id: 2,
      bookingId: "BKG-102",
      amount: 850000,
      method: "Bank Transfer",
      status: "Pending",
      transactionId: "TXN-9090",
      date: "2025-09-19",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  useState<any>(null);

  const handleEdit = (payment: any) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const handleUpdate = (updated: any) => {
    setPayments((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deletePayment = (id: number) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Payments</h2>

      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Payment ID</th>
            <th className="border px-3 py-2 text-left">Booking ID</th>
            <th className="border px-3 py-2 text-left">Amount</th>
            <th className="border px-3 py-2 text-left">Method</th>
            <th className="border px-3 py-2 text-left">Status</th>
            <th className="border px-3 py-2 text-left">Transaction ID</th>
            <th className="border px-3 py-2 text-left">Date</th>
            <th className="border px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{p.id}</td>
              <td className="border px-3 py-2">{p.bookingId}</td>
              <td className="border px-3 py-2">
                Rp {p.amount.toLocaleString("id-ID")}
              </td>
              <td className="border px-3 py-2">{p.method}</td>
              <td
                className={`border px-3 py-2 font-medium ${
                  p.status === "Paid"
                    ? "text-green-600"
                    : p.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                {p.status}
              </td>
              <td className="border px-3 py-2">{p.transactionId}</td>
              <td className="border px-3 py-2">{p.date}</td>

              <td className="border px-3 py-2 text-center flex gap-2">
                <button
                  onClick={() => handleEdit(payments)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs">
                  Edit
                </button>
                <button
                  onClick={() => deletePayment(p.id)}
                  className="px-3 py-1 text-xs bg-red-600 text-white rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <PaymentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleUpdate}
          initialData={selectedPayment}
        />
      )}
    </div>
  );
}
