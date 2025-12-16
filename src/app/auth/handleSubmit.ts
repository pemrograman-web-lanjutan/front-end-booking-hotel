import { toast } from "react-hot-toast";

export async function handleLogin(email: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new Error("Email tidak valid");
    }

    if (password.length < 6) {
        throw new Error("Password minimal 6 karakter");
    }

    try {
        const response = await fetch('http://localhost:8000/api/login', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            credentials: 'include',

            body: JSON.stringify({
                email,
                password
            })
            
        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("user", JSON.stringify(data.user));

            localStorage.setItem("token", data.token);

            // Set cookie for middleware
            const expiresIn = 7 * 24 * 60 * 60; // 7 days
            document.cookie = `token=${data.token}; path=/; max-age=${expiresIn}; SameSite=Strict`;

            toast.success("Login berhasil", {
                duration: 3000,
                position: "top-right",
            });

            return data;
        } else {
            toast.error(data.message || "Login gagal", {
                duration: 3000,
                position: "top-right",
            });
            throw new Error(data.message || "Login gagal");
        }
    } catch (error) {
        throw error;
    }
}


export async function handleRegister(fullname: string, email: string, phone: string, gender: string, password: string, confirmPassword: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;

    // Client-side validation
    if (!emailRegex.test(email)) {
        throw new Error("Email tidak valid");
    }

    // if (!phoneRegex.test(phone)) {
    //     throw new Error("Format nomor telepon tidak valid");
    // }

    if (password.length < 6) {
        throw new Error("Password minimal 6 karakter");
    }

    if (password !== confirmPassword) {
        throw new Error("Password dan konfirmasi password tidak sesuai");
    }

    try {
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: fullname, // Make sure this matches Laravel's expected field name
                email,
                phone,
                gender,
                phone_number: phone,
                password,
                password_confirmation: confirmPassword, // Add this for Laravel validation
                role: 'guest'
            })
        });

        const data = await response.json();

        if (response.ok) {

            toast.success("Registrasi berhasil, Silahkan login.", {
                duration: 3000,
                position: "top-right",
            })

            return { message: "Registrasi berhasil, silahkan login" };

        } else {
            if (response.status === 422) {
                const errors = data.errors;
                const firstError = Object.values(errors)[0];

                if (Array.isArray(firstError)) {

                    throw new Error(firstError[0]);

                }

                throw new Error("Validation failed");
            }

            throw new Error(data.message || "Registrasi gagal");
        }
    } catch (error) {

        if (error instanceof Error) {
            throw error;
        }
        
        throw new Error("Terjadi kesalahan saat menghubungi server");
    }
}