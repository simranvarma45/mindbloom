export default function BackgroundBlobs() {
  return (
    <>
      {/* Pink Blob - Top Left */}
      <div className="hidden sm:block absolute top-[-80px] left-[-80px] w-64 h-64 md:w-80 md:h-80 bg-pink-300 opacity-20 rounded-full filter blur-2xl animate-blob z-0" />

      {/* Peach Blob - Bottom Right */}
      <div className="hidden sm:block absolute bottom-[-100px] right-[-80px] w-72 h-72 md:w-96 md:h-96 bg-orange-200 opacity-10 rounded-full filter blur-3xl animate-blob animation-delay-2000 z-0" />

      {/* Mint Blob - Center Fade */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-green-200 opacity-10 rounded-full filter blur-3xl animate-blob animation-delay-4000 z-0" />
    </>
  );
}
