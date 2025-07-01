import Image from "next/image";

export default function Sponsors() {
  return (
    <section className="bg-[#004E6E] py-12 px-4 text-white text-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
          <Image src="/american-steel-foundries.png" alt="American Steel Foundries" width={120} height={60} className="mx-auto" />
          <Image src="/hilton.png" alt="Hilton" width={120} height={60} className="mx-auto" />
        </div>
        <p className="text-cyan-300 italic mt-8">&quot;Dé clic y amplíe información de su futuro sponsor.&quot;</p>
      </div>
    </section>
  );
} 