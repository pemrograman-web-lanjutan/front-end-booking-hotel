export default function About() {
  return (
    <>
      <div
        id="about"
        className="flex flex-col items-center bg-[var(--primary)] px-4 sm:px-8 md:px-12 lg:px-15 py-12 sm:py-16 md:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[var(--foreground)] font-bold text-center mb-6 sm:mb-8">
          About Us
        </h1>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-10 w-full max-w-7xl">
          <div className="text-[var(--foreground)] w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Inferno Hotel
            </h2>
            <p className="text-sm sm:text-base md:text-md leading-relaxed">
              Selamat datang di Hotel Inferno, destinasi yang memadukan
              kenyamanan modern dengan pelayanan hangat. Terletak di lokasi
              strategis, kami menghadirkan kamar elegan, kuliner istimewa, serta
              fasilitas lengkap untuk beristirahat maupun beraktivitas.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed mt-3 sm:mt-4">
              Bagi kami, setiap tamu adalah prioritas. Di Hotel Inferno, Anda
              tidak hanya menginap — Anda menciptakan pengalaman berkesan.
            </p>
          </div>
          <div className="w-full lg:w-1/2 h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
            <video
              src="/hotel.mp4"
              className="w-full h-full object-cover"
              controls
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </div>
    </>
  );
}
