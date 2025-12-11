"use client";

import { useEffect, useState } from "react";
import { Payment } from "../../types/payment";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (booking: Payment) => void;
  initialData: Payment | null;
}

export default function PaymentModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<Payment>({
    payment_Id: "",
    booking_Id: "",
    amount: 0,
    method: "credit_card",
    status: "pending",
    transaction_Id: "",
    date: "",
  });

  // Isi otomatis saat update
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Update Booking</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nama Tamu</label>
            <select
              name="method"
              value={form.method}
              onChange={handleChange}
              className="w-full border p-2 rounded">
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="e-wallet">E Wallet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Status Booking</label>
            <select
              name="status_booking"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded">
              <option value="pending">Pending</option>
              <option value="complated">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded">
              Update Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
