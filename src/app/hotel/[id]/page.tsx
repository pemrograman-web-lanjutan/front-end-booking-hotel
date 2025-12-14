import Navbar from "../../../components/Navbar";
import DetailHotel from "./[detailHotel]";
import RoomHotel from "./[roomHotel]";
import RoomsPages from "./[rooms]";
import UlasanList from "./[UlasanList]";

export default async function HotelsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("Hotel ID:", id);

  return (
    <div className="bg-[var(--third)]">
      <Navbar />
      <DetailHotel />
      <RoomHotel id={id} />
      <RoomsPages />
      <UlasanList id={id} />
    </div>
  );
}
