const vacantes = [
  {
    logo: "/american-steel-logo.png",
    empresa: "American Steel Carports",
    estado: "Abierto",
    estadoColor: "bg-green-400",
    ubicacion: "Joshua, Texas",
    descripcion: "Fabricante de cocheras y estructuras metálicas",
    salario: "$30,000 - $33,000 USD anuales",
    horario: "Lunes a viernes, 8 AM - 5 PM",
    posiciones: ["Steel Worker", "General Labor"],
    idioma: "Español o Inglés conversacional",
    boton: "Postular ahora",
    cerrado: false
  },
  {
    logo: "/rplants-logo.png",
    empresa: "R Plants Inc. Nursery",
    estado: "Abierto",
    estadoColor: "bg-green-400",
    ubicacion: "Homestead, Florida",
    descripcion: "Aerolínea estadounidense",
    salario: "$30,000 - $33,000 USD anuales",
    horario: "Lunes a viernes, 8 AM - 5 PM",
    posiciones: ["Assistant Grower"],
    idioma: "Español",
    boton: "Postular ahora",
    cerrado: false
  },
  {
    logo: "/faena-hotel-logo.png",
    empresa: "Faena Hotel",
    estado: "Abierto",
    estadoColor: "bg-green-400",
    ubicacion: "Miami Beach, Florida",
    descripcion: "Hotel de lujo 5 estrellas y 5 estrellas plus",
    salario: "$30,000 - $33,000 USD anuales",
    horario: "Turnos Rotativos",
    posiciones: ["Housekeeping", "Steward"],
    idioma: "Español o Inglés conversacional",
    boton: "Postular ahora",
    cerrado: false
  },
  ...Array.from({ length: 17 }, (_, i) => ({
    logo: "/generic-logo.png",
    empresa: `Empresa Genérica ${i + 4}`,
    estado: "Abierto",
    estadoColor: "bg-green-400",
    ubicacion: `Ciudad Genérica ${i + 4}`,
    descripcion: "Descripción genérica de la vacante",
    salario: "$25,000 - $35,000 USD anuales",
    horario: "Horario flexible",
    posiciones: ["Puesto Genérico 1", "Puesto Genérico 2"],
    idioma: "Español",
    boton: "Postular ahora",
    cerrado: false
  }))
];

export default vacantes; 