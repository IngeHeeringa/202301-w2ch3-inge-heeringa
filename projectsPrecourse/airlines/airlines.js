const prompt = require("prompt-sync")();

const flights = [
  { id: 0, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 1, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 2, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 3, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 4, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 5, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 6, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 7, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 8, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 9, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

const promptUsername = () => {
  const userName = prompt(
    "Hola! Para acceder a ISDI Airlines, introduce tu nombre de usuario: "
  );
  console.log(
    `Bienvenid@ a ISDI Airlines, ${userName}. Aquí encuentras la última información sobre nuestros vuelos.`
  );
};

const flightInfo = () => {
  flights.forEach((flight) => {
    const scaleCheck = flight.scale
      ? "Este vuelo tiene escala."
      : "Este vuelo no tiene escala.";
    console.log(
      `El vuelo con origen ${flight.from} y destino ${flight.to} tiene un coste de €${flight.cost}. ${scaleCheck}`
    );
  });
};

const averageCost = () => {
  const totalCost = flights.reduce((acc, flight) => acc + flight.cost, 0);
  const averageCost = (totalCost / flights.length).toFixed(2);
  console.log(`El coste medio de los vuelos es de €${averageCost}.`);
};

const scaleInfo = () => {
  const totalScale = flights.reduce((acc, flight) => acc + flight.scale, 0);
  console.log(`De los ${flights.length} vuelos, ${totalScale} tienen escala.`);
};

const lastFlights = () => {
  console.log(`Los últimos vuelos de hoy tienen como destino:`);
  for (let i = flights.length - 5; i < flights.length; i++) {
    console.log(flights[i].to);
  }
};

const main = () => {
  promptUsername();
  flightInfo();
  averageCost();
  scaleInfo();
  lastFlights();
};

main();
