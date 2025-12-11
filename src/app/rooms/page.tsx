"use client";
import RoomsPages from "../hotel/[rooms]";

export default async function RoomsPage() {

  const data = await fetch("")

  return (
    <div>
      <RoomsPages />
    </div>
  );
}
