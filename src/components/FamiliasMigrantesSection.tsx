export default function FamiliasMigrantesSection() {
  return (
    <section className="w-full bg-gradient-to-r from-[#005c82] to-[#0073b6] py-14 px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
        {/* Puntos decorativos y contador */}
        <div className="flex items-center w-full md:w-1/2">
          {/* Puntos decorativos */}
          <div className="hidden md:flex flex-col items-center mr-8">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 mb-1">
                <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
                <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
                <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
              </div>
              <div className="flex gap-2 mb-1">
                <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
                <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
              </div>
              <div className="flex gap-2 mb-1">
                <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
              </div>
              <div className="flex gap-2 mb-1">
                <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
                <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
              </div>
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full block" />
              </div>
            </div>
          </div>
          {/* Contador */}
          <div className="flex items-center ml-0 md:ml-4">
            <span className="text-white text-6xl font-bold mr-4">+</span>
            {["1", "3", "9", "5"].map((d, i) => (
              <span key={i} className="bg-[#0073b6] text-white text-5xl font-bold px-6 py-2 mx-1 rounded-md shadow-lg" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>{d}</span>
            ))}
          </div>
        </div>
        {/* Texto a la derecha */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mt-10 md:mt-0">
          <h3 className="text-3xl font-bold text-cyan-300 mb-2" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>Familias Migrantes</h3>
          <p className="text-white text-lg max-w-lg" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Estas familias han confiado en nuestro servicio y <br />
            <span className="font-bold">hoy disfrutan de una nueva vida en Estados Unidos.</span>
          </p>
        </div>
      </div>
      {/* Línea divisoria */}
      <div className="w-full border-t border-white/60 my-10" />
      {/* Logos sponsors */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-10 gap-y-8 mb-8">
        <img src="/condado-vanderbilt-hotel.png" alt="Condado Vanderbilt Hotel" className="h-16 object-contain" />
        <img src="/courtyard-by-marriott.png" alt="Courtyard by Marriott" className="h-16 object-contain" />
        <img src="/american-steel-foundries.png" alt="American Steel Foundries" className="h-16 object-contain" />
        <img src="/faena-hotel-miami-beach.png" alt="Faena Hotel Miami Beach" className="h-16 object-contain" />
        <img src="/natures-way-farms.png" alt="Nature's Way Farms" className="h-16 object-contain" />
        <img src="/residence-inn-by-marriott.png" alt="Residence Inn by Marriott" className="h-16 object-contain" />
        <img src="/hampton-by-hilton.png" alt="Hampton by Hilton" className="h-16 object-contain" />
        <img src="/gt-independence.png" alt="GT Independence" className="h-16 object-contain" />
        <img src="/the-queens-flowers.png" alt="The Queen's Flowers" className="h-16 object-contain" />
        <img src="/hilton.png" alt="Hilton" className="h-16 object-contain" />
        <img src="/jw-marriott.png" alt="JW Marriott" className="h-16 object-contain" />
        <img src="/marriott-hotels-resorts.png" alt="Marriott Hotels & Resorts" className="h-16 object-contain" />
        <img src="/r-plants-nursery.png" alt="R. Plants Nursery" className="h-16 object-contain" />
        <img src="/pure-beauty-farms.png" alt="Pure Beauty Farms" className="h-16 object-contain" />
        <img src="/american-airlines.png" alt="American Airlines" className="h-16 object-contain" />
        <img src="/jetblue-airways.png" alt="JetBlue Airways" className="h-16 object-contain" />
        <img src="/spirit-airlines.png" alt="Spirit Airlines" className="h-16 object-contain" />
      </div>
      {/* Frase inferior */}
      <div className="text-center mt-4">
        <span className="text-cyan-300 italic text-lg">“Dé clic y amplíe información de su futuro sponsor.”</span>
      </div>
    </section>
  );
} 