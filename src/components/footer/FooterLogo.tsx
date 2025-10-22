import Image from "next/image";

export default function FooterLogo() {
  return (
    <div>
      <Image
        src="/logo/Asset-2.png"
        alt="logo"
        width={100}
        height={100}
        className="rounded-full"
      />
      <p className="mt-4 text-gray-200">
        Hotel Inferno Ramah Keluarga adalah penginapan nyaman dengan suasana
        hangat dan fasilitas lengkap, ideal untuk liburan bersama keluarga.
      </p>
    </div>
  );
}
