export type Payment = {
  payment_Id: string;
  booking_Id: string;
  amount: number;
  method: "credit_card" | "bank_transfer" | "e_wallet";
  status: "pending" | "completed" | "failed";
  transaction_Id: string;
  date: string;
};
