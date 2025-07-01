import Image from "next/image";
import Hero from '../components/Hero';
import Alternativas from '../components/Alternativas';
import VacantesCarousel from '../components/VacantesCarousel';

export default function Home() {
  return (
    <>
      <Hero />
      <Alternativas />
      <VacantesCarousel />
      <div className="px-2 -mt-16 mb-12 ml-8">
        <a href="/todas-vacantes" className="bg-[#0D4A7A] hover:bg-[#1161A9] text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">Ver todas las vacantes</a>
      </div>
    </>
  );
}
