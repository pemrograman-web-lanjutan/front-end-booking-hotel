import Image from "next/image";
import { RoomFilter } from "@/types/Room";
import {Link} from "next/link";

interface RoomCardProps {
  room: RoomFilter;
}

export default function RoomCard({ room }: RoomCardProps) {

  return (
    <div className="border rounded-xl shadow-md overflow-hidden bg-white" >
      <div className="relative w-full h-48">
        <Image
          src={"/hotel/canggu-1.png"}
          alt={room.nama_hotel}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-lg truncate">{room.nama_hotel}</h2>
        <p className="text-gray-600 text-sm mt-1">{room.cabang_hotel}</p>
        <p className="text-gray-500 text-xs">{room.max_occupancy}</p>
        <p className="text-gray-500 text-xs">{room.room_status}</p>

        <div className="mt-4 font-bold text-lg">
          Rp {room.price_per_night.toLocaleString()}
          <span className="text-sm font-normal text-gray-500"> / malam</span>
        </div>
      </div>
    </div>

  );
}
