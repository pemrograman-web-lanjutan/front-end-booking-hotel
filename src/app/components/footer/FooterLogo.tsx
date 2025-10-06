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
      <p className="mt-4 text-gray-200">Hotel Oyo Ramah Keluarga</p>
    </div>
  );
}
