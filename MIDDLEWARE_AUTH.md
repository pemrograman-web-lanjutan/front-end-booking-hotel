# Middleware Authentication Documentation

## Overview
Middleware ini melindungi rute `/dashboard` dengan mengecek kehadiran token autentikasi. Jika user belum login, mereka akan diarahkan ke halaman login dengan parameter redirect.

## File-File yang Diubah/Dibuat

### 1. `middleware.ts` (Root Project)
**Fungsi**: Mengecek token sebelum akses ke `/dashboard`
- Jika user belum login (tidak ada token), redirect ke `/auth/login` dengan parameter `redirect` berisi path yang ingin diakses
- Token dapat berada di cookie atau authorization header
- Rute public tetap dapat diakses tanpa autentikasi

### 2. `src/app/auth/handleSubmit.ts`
**Perubahan**:
- Menambahkan logik untuk set token sebagai cookie saat login berhasil
- Token disimpan di localStorage dan cookie untuk kompatibilitas
- Cookie ditetapkan dengan option `SameSite=Strict` untuk keamanan

### 3. `src/app/auth/login/page.tsx`
**Perubahan**:
- Menggunakan `useSearchParams()` untuk mendapatkan parameter `redirect` dari URL
- Setelah login berhasil, user akan diarahkan ke URL yang disimpan di parameter `redirect`
- Jika user adalah admin, akan diarahkan ke `/dashboard`, jika bukan akan diarahkan ke path yang diminta
- Menambahkan fungsi `setTokenCookie()` untuk memastikan cookie tersimpan

### 4. `src/app/auth/logout.ts` (Baru)
**Fungsi**: Helper function untuk logout
- Menghapus user data dari localStorage
- Menghapus token dari localStorage dan cookie
- Memanggil endpoint logout di server (jika ada)

## Cara Kerja

1. **User mencoba akses `/dashboard` tanpa login**:
   - Middleware mengecek kehadiran token di cookie
   - Jika tidak ada, middleware redirect ke `/auth/login?redirect=/dashboard`

2. **User melakukan login**:
   - Token disimpan di localStorage dan cookie
   - User diarahkan ke path yang ada di parameter `redirect`
   - Jika ada pending booking, akan dikirim otomatis

3. **User berhasil akses `/dashboard`**:
   - Middleware menemukan token, akses diizinkan
   - Dashboard page dapat ditampilkan

## Keamanan
- Token disimpan di cookie dengan `SameSite=Strict` untuk mencegah CSRF
- Token juga disimpan di localStorage sebagai backup
- Cookie memiliki max-age 7 hari
- Middleware hanya melindungi `/dashboard`

## Setup Logout
Jika ingin menambahkan tombol logout di dashboard atau navbar:

```tsx
import { handleLogout } from "@/app/auth/logout";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  
  const handleLogoutClick = async () => {
    await handleLogout();
    router.push("/");
  };

  return (
    <button onClick={handleLogoutClick}>
      Logout
    </button>
  );
}
```

## Testing
1. Buka `http://localhost:3000/dashboard` tanpa login
2. Anda akan diarahkan ke `/auth/login?redirect=/dashboard`
3. Lakukan login dengan credential yang valid
4. Anda akan diarahkan kembali ke `/dashboard`

## Catatan
- Middleware akan mereload saat Anda membuat perubahan pada file `middleware.ts`
- Pastikan backend mengirimkan token dalam response login
- Cookie dan localStorage harus tersinkronisasi untuk menghindari bug
