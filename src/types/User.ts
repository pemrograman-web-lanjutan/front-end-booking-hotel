export type Users = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone_number: string;
    gender: "male" | "female";
    role: "admin" | "guest";
}