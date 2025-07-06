const vacantes = [
  {
    empresa: "Arlene Resource Management LLC",
    descripcion: "Trabajo agrícola con papas: siembra, cultivo, cosecha y empaque.",
    cargo: "Trabajador Agrícola",
    salario: "$18.83/hora",
    email: "office@arleneresourcemanagement.com",
    workers: "8",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-014831"
  },
  {
    empresa: "Fresh Harvest, Inc.",
    descripcion: "Cosecha y cultivo de cebollas, remolachas, nabos y otros vegetales.",
    cargo: "Trabajador de Campo",
    salario: "$17.04/hora",
    email: "No especificado",
    workers: "135",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-24334-507521"
  },
  {
    empresa: "CSS Farms LLC",
    descripcion: "Clasificación de papas por tamaño, forma y calidad; carga de camiones.",
    cargo: "Clasificador de Productos Agrícolas",
    salario: "$18.83/hora",
    email: "No especificado",
    workers: "7",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25030-655764"
  },
  {
    empresa: "Nature's Choice Inc.",
    descripcion: "Trabajos generales en granja con cultivo de frutas y vegetales.",
    cargo: "Trabajador Agrícola",
    salario: "$16.08/hora",
    email: "No especificado",
    workers: "56",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25154-048563"
  },
  {
    empresa: "P. MARIN HARVESTING, INC.",
    descripcion: "Cosecha de manzanas en plantaciones; incluye trepar escaleras y cargar.",
    cargo: "Trabajador Agrícola",
    salario: "$16.16/hora",
    email: "primo.harvest@outlook.com",
    workers: "21",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25092-820948"
  },
  {
    empresa: "Arlene Resource Management LLC",
    descripcion: "Cosecha de verduras y frutas en campo abierto.",
    cargo: "Trabajador Agrícola",
    salario: "$18.15/hora",
    email: "office@arleneresourcemanagement.com",
    workers: "62",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25161-075068"
  },
  {
    empresa: "Six Flags Great America",
    descripcion: "Preparación y venta de alimentos en parque de diversiones.",
    cargo: "Trabajador de Servicio de Alimentos",
    salario: "$14.28/hora",
    email: "SFGRAMHR@sftp.com",
    workers: "155",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-24002-601886"
  },
  {
    empresa: "The Red Inn at Provincetown Inc",
    descripcion: "Lavado de platos, utensilios, limpieza de cocina en restaurante turístico.",
    cargo: "Lavaplatos",
    salario: "$17.03–$20.00/hora",
    email: "No especificado",
    workers: "10",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-24002-605141"
  },
  {
    empresa: "The Everglades Club, Inc.",
    descripcion: "Preparación de alimentos en cocina de club privado.",
    cargo: "Cocinero",
    salario: "$20.00/hora",
    email: "No especificado",
    workers: "8",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-24185-174184"
  },
  {
    empresa: "Brickman Group Ltd LLC",
    descripcion: "Tareas de paisajismo, mantenimiento de jardines y zonas verdes.",
    cargo: "Paisajista",
    salario: "$18.05/hora",
    email: "No especificado",
    workers: "65",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-24191-187945"
  },
  {
    empresa: "GIII HARVESTING, LLC",
    descripcion: "Trabajo agrícola general en la cosecha de cultivos diversos.",
    cargo: "Trabajador Agrícola",
    salario: "$16.16 por hora",
    email: "No especificado",
    workers: "30",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-010841"
  },
  {
    empresa: "Vanderhyde Dairy Inc.",
    descripcion: "Operación de maquinaria agrícola para preparación del suelo y cosecha.",
    cargo: "Operador de Equipos Agrícolas",
    salario: "$16.16 por hora",
    email: "royvdh123@gmail.com",
    workers: "4",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-24334-507393"
  },
  {
    empresa: "All-N Transport LLC",
    descripcion: "Conducción de camiones y maquinaria para recolección y transporte de cultivos.",
    cargo: "Conductor de Camión Pesado y Remolque",
    salario: "$23.51 por hora",
    email: "No especificado",
    workers: "11",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25030-654112"
  },
  {
    empresa: "Alexander Family Farms LLC",
    descripcion: "Trabajo en cultivo y cosecha de tabaco y otros productos agrícolas.",
    cargo: "Trabajador Agrícola",
    salario: "$16.00 - $18.00 por hora (estimado)",
    email: "No especificado",
    workers: "6",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-013359"
  },
  {
    empresa: "Sleepy Creek Farms",
    descripcion: "Cuidado de ganado, incluyendo alimentación, medicación y mantenimiento de cercas.",
    cargo: "Trabajador de Granja",
    salario: "$16.08 por hora",
    email: "CJAMESONH@gmail.com",
    workers: "3",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-056454"
  },
  {
    empresa: "J & H Fleming Farms, Inc.",
    descripcion: "Trabajo agrícola general en cultivo y cosecha de frutas y vegetales.",
    cargo: "Trabajador Agrícola",
    salario: "$16.08 por hora",
    email: "No especificado",
    workers: "12",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25161-072058"
  },
  {
    empresa: "Buoye Honey Company Inc",
    descripcion: "Preparación de abejas y equipos para polinización y producción de miel.",
    cargo: "Apicultor",
    salario: "$16.52 por hora",
    email: "No especificado",
    workers: "12",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25154-046861"
  },
  {
    empresa: "5L RANCH",
    descripcion: "Pastoreo de ganado en áreas de pastizales y mantenimiento de cercas.",
    cargo: "Pastor de Ganado",
    salario: "$16.52 por hora",
    email: "No especificado",
    workers: "2",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25154-044973"
  },
  {
    empresa: "Elder Ranch Inc",
    descripcion: "Trabajo agrícola general en cultivo y cosecha de cultivos diversos.",
    cargo: "Trabajador Agrícola",
    salario: "$16.52 por hora",
    email: "No especificado",
    workers: "6",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-012008"
  },
  {
    empresa: "Foothill Packing, Inc. SA-3",
    descripcion: "Trabajo en viñedos, incluyendo irrigación y operación de equipos agrícolas.",
    cargo: "Trabajador de Viñedo y Conductor de Van",
    salario: "$16.52 por hora",
    email: "No especificado",
    workers: "4",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-24334-507621"
  },
  {
    empresa: "Klepac Greenhouses",
    descripcion: "Labor en invernadero para producción de plantas en maceta.",
    cargo: "Trabajador de Invernadero",
    salario: "$15.79 por hora",
    email: "bsadovsky@klepac.com",
    workers: "52",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-012664"
  },
  {
    empresa: "Briggs Harvesting LLC",
    descripcion: "Operación de maquinaria para cosecha y transporte de cultivos.",
    cargo: "Conductor de Camión Pesado y Remolque",
    salario: "$28.21 por hora",
    email: "No especificado",
    workers: "5",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-24365-575827"
  },
  {
    empresa: "Jacobs Brothers",
    descripcion: "Asistencia en operaciones agrícolas, incluyendo manejo de estiércol y cultivos.",
    cargo: "Técnico Agrícola",
    salario: "$18.15 por hora",
    email: "john4@jacobsbrotherswi.com",
    workers: "6",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25030-653219"
  },
  {
    empresa: "Temp.Labor, LLC",
    descripcion: "Cosecha de fresas con pago por pieza y garantía salarial.",
    cargo: "Cosechador",
    salario: "$16.23 - $20.25 por hora (estimado)",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-012575"
  },
  {
    empresa: "E & D Custom Silage LLC",
    descripcion: "Operación de maquinaria agrícola para producción y cosecha de cultivos.",
    cargo: "Operador de Equipos Agrícolas",
    salario: "$16.52 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25161-074651"
  },
  {
    empresa: "SARC, Inc",
    descripcion: "Cosecha manual de lechuga iceberg utilizando herramientas mecánicas.",
    cargo: "Trabajador Agrícola",
    salario: "$22.55 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-014881"
  },
  {
    empresa: "North Carolina Grower's Association, Inc.",
    descripcion: "Cosecha de batatas con pago por pieza y garantía salarial.",
    cargo: "Trabajador Agrícola",
    salario: "$16.16 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-014579"
  },
  {
    empresa: "Sandy Bay Oyster Company",
    descripcion: "Cultivo y cosecha de ostras en granja acuícola.",
    cargo: "Trabajador de Granja de Ostras",
    salario: "$16.00 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-24334-507576"
  },
  {
    empresa: "Northwestern Orchards, LLC",
    descripcion: "Cosecha de manzanas Fuji con pago por pieza y garantía salarial.",
    cargo: "Trabajador de Huerto",
    salario: "$19.82 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25161-073732"
  },
  {
    empresa: "Ponce Harvesting, LLC",
    descripcion: "Cosecha de frijoles verdes y labores generales en granja.",
    cargo: "Cosechador / Trabajador Agrícola",
    salario: "$17.50 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  },
  {
    empresa: "Jacobs Brothers",
    descripcion: "Operaciones agrícolas incluyendo manejo de estiércol y cultivos.",
    cargo: "Técnico Agrícola",
    salario: "$18.15 por hora",
    email: "john4@jacobsbrotherswi.com",
    workers: "6",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25030-653219"
  },
  {
    empresa: "Klepac Greenhouses",
    descripcion: "Trabajo en invernadero para producción de plantas en maceta.",
    cargo: "Trabajador de Invernadero",
    salario: "$15.79 por hora",
    email: "bsadovsky@klepac.com",
    workers: "52",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-012664"
  },
  {
    empresa: "Temp.Labor, LLC",
    descripcion: "Cosecha de fresas con pago por pieza y garantía salarial.",
    cargo: "Cosechador",
    salario: "$20.25 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-012575"
  },
  {
    empresa: "Star Farms Inc",
    descripcion: "Labores agrícolas generales incluyendo inspección y clasificación de cultivos.",
    cargo: "Trabajador Agrícola",
    salario: "$18.15 por hora",
    email: "No especificado",
    workers: "1",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25030-654134"
  },
  {
    empresa: "Toon Farms LLC",
    descripcion: "Cuidado y cosecha de tabaco Burley.",
    cargo: "Trabajador Agrícola",
    salario: "No especificado",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25154-047573"
  },
  {
    empresa: "Tamura Farms, Inc",
    descripcion: "Labores en granja de cebollas y operaciones de empaque.",
    cargo: "Trabajador Agrícola / Operador de Equipos",
    salario: "No especificado",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25154-043869"
  },
  {
    empresa: "VALLEY VIEW AG, LLC",
    descripcion: "Labores generales en granja incluyendo siembra y cosecha.",
    cargo: "Trabajador Agrícola",
    salario: "No especificado",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25161-075515"
  },
  {
    empresa: "RJ Pork LLC",
    descripcion: "Labores en granja porcina incluyendo alimentación y mantenimiento.",
    cargo: "Trabajador Agrícola",
    salario: "No especificado",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25143-014856"
  },
  {
    empresa: "Halls G4, LLP",
    descripcion: "Operación de maquinaria agrícola para cultivo y cosecha.",
    cargo: "Operador de Equipos Agrícolas",
    salario: "No especificado",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25154-044870"
  },
  {
    empresa: "King Ranch, Inc",
    descripcion: "Pastoreo y manejo de ganado en ranchos extensivos.",
    cargo: "Pastor de Ganado",
    salario: "No especificado",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-055886"
  },
  {
    empresa: "Spring Valley Associates, LLC",
    descripcion: "Labores agrícolas generales en la producción de alfalfa, ganado y ovejas.",
    cargo: "Trabajador Agrícola",
    salario: "$17.84 por hora",
    email: "kwright_sva@yahoo.com",
    workers: "4",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-24354-558693"
  },
  {
    empresa: "Bennett Orchards LLC",
    descripcion: "Trabajo en huertos de frutas: melocotones, nectarinas, arándanos y otros productos.",
    cargo: "Trabajador de Huerto y Granja",
    salario: "$17.96 por hora",
    email: "henry@bennettorchards.com",
    workers: "8",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-24346-535013"
  },
  {
    empresa: "Fresh Harvest, Inc.",
    descripcion: "Cosecha de vegetales y labores agrícolas generales en Yuma, Arizona.",
    cargo: "Trabajador de Cosecha de Vegetales",
    salario: "$16.32 por hora",
    email: "agdatahr@agdataglobal.com",
    workers: "633",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-24237-291512"
  },
  {
    empresa: "Sea Pines Resort, LLC",
    descripcion: "Atención a huéspedes en restaurante del resort, incluyendo toma de pedidos y servicio de alimentos.",
    cargo: "Mesero/a",
    salario: "$11.29 por hora",
    email: "No especificado",
    workers: "30",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-24319-474379"
  },
  {
    empresa: "Nantucket Island Resorts/White Elephant Resorts",
    descripcion: "Servicio de alimentos y bebidas en restaurante de hotel en Nantucket, MA.",
    cargo: "Mesero/a",
    salario: "$19.09 por hora",
    email: "CAREERS@WHITEELEPHANTRESORTS.COM",
    workers: "32",
    link: "https://seasonaljobs.dol.gov/jobs/H-400-23001-672991"
  },
  {
    empresa: "R & R Harvesting, Inc.",
    descripcion: "Cosecha general de cultivos en Monette, Arkansas.",
    cargo: "Trabajador Agrícola",
    salario: "$14.83 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  },
  {
    empresa: "R & R Harvesting, Inc.",
    descripcion: "Conducción de vehículos de transporte para trabajadores agrícolas en Monette, Arkansas.",
    cargo: "Conductor de Transporte",
    salario: "$17.75 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  },
  {
    empresa: "R & R Harvesting Inc.",
    descripcion: "Preparación y servicio de alimentos en cafetería institucional en Fitchburg, Wisconsin.",
    cargo: "Cocinero/a",
    salario: "$18.15 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  },
  {
    empresa: "R & R Harvesting Inc.",
    descripcion: "Conducción de vehículos de transporte para trabajadores agrícolas en Arena, Wisconsin.",
    cargo: "Conductor de Transporte",
    salario: "$18.15 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  },
  {
    empresa: "R & R Harvesting Inc.",
    descripcion: "Cosecha general de cultivos en Arena, Wisconsin.",
    cargo: "Trabajador Agrícola",
    salario: "$18.15 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  },
  {
    empresa: "R&R Christo Construction, LLC",
    descripcion: "Labores de construcción general en Germantown, Illinois.",
    cargo: "Obrero de Construcción",
    salario: "$33.45 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  },
  {
    empresa: "R & K Tobacco",
    descripcion: "Labores agrícolas relacionadas con el cultivo de tabaco en Murray, Kentucky.",
    cargo: "Trabajador Agrícola",
    salario: "$15.87 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  },
  {
    empresa: "Lake Buffum Blueberry Farms LLC",
    descripcion: "Cosecha de arándanos y otras labores agrícolas en Lake Hamilton, Florida.",
    cargo: "Trabajador Agrícola",
    salario: "$16.23 por hora",
    email: "bbohan9443@aol.com",
    workers: "25",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25118-909857"
  },
  {
    empresa: "L & R Calvert Farms LLC",
    descripcion: "Labores agrícolas generales en Bloomfield, Kentucky.",
    cargo: "Trabajador Agrícola",
    salario: "$15.87 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  },
  {
    empresa: "R & K Tobacco",
    descripcion: "Labores agrícolas relacionadas con el cultivo de tabaco en Murray, Kentucky.",
    cargo: "Trabajador Agrícola",
    salario: "$15.87 por hora",
    email: "No especificado",
    workers: "No especificado",
    link: "https://seasonaljobs.dol.gov/jobs/H-300-25156-054731"
  }
];

export default vacantes;



