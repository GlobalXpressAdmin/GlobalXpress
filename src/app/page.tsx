import Image from "next/image";
import Hero from '../components/Hero';
import Alternativas from '../components/Alternativas';

export default function Home() {
  return (
    <>
      <Hero />
      <Alternativas />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center">
        <Image
            className="mx-auto mb-8"
          src="/next.svg"
          alt="Next.js logo"
            width={200}
            height={42}
          priority
        />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido a tu página web
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tu sitio web está listo para ser personalizado
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Próximos pasos:
            </h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Personalizar el contenido
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Agregar más páginas
          </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Configurar el diseño
          </li>
            </ul>
          </div>
        </div>
    </div>
    </>
  );
}
