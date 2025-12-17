import Navbar from "../../../components/Navbar";
import DetailHotel from "./detailHotel";
import RoomHotel from "./roomHotel";
import RoomsPages from "./rooms";
import UlasanList from "./UlasanList";

type PageProps = {
  params: {
    id: string;
  };
};

export default function HotelsPage({ params }: PageProps) {
  const { id } = params;

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
