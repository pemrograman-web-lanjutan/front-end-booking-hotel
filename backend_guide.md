# Backend Query Guide for Room Prices

Agar frontend dapat menghitung `Total Amount` secara otomatis, API endpoint `getRooms` harus menyertakan data harga kamar.

Berikut adalah query Laravel Eloquent yang perlu Anda tambahkan di Controller backend Anda.

## 1. Pastikan Model Memiliki Relasi

Di file `app/Models/Room.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    // ... code lainnya ...

    // Relasi ke RoomType
    public function roomType()
    {
        // Sesuaikan 'id_rooms_type' dengan nama kolom foreign key di database Anda
        return $this->belongsTo(RoomType::class, 'id_rooms_type');
    }
}
```

## 2. Update Controller untuk Memuat Relasi (Eager Loading)

Di Controller tempat Anda mengambil data kamar (misalnya `RoomController.php` atau `BookingController.php`):

```php
public function getRooms()
{
    // Gunakan 'with' untuk mengambil data roomType sekaligus
    $rooms = Room::with('roomType')->get();
    
    // Atau jika Anda ingin spesifik mengambil kolom harga saja untuk efisiensi:
    // $rooms = Room::with('roomType:id,name,price')->get();

    return response()->json([
        'data' => $rooms
    ]);
}
```

## 3. Pastikan Field Harga Tersedia

Pastikan tabel `room_types` (atau tabel tempat harga disimpan) memiliki kolom salah satu dari berikut:
- `price`
- `price_per_night`

Frontend akan otomatis mencari kedua nama field tersebut.
