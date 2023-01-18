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

const goodbyeMessage = () => {
  console.log("Gracias por volar con ISDI Airlines. Hasta pronto!");
};

const promptUsername = () => {
  const userName = prompt(
    "Hola! Para acceder a ISDI Airlines, introduce tu nombre de usuario: "
  );
  if (userName === "" || userName === " ") {
    console.log("Introduce un nombre de usuario válido.");
    return promptUsername();
  }

  if (userName === null) {
    return null;
  }

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

const createFlights = () => {
  if (flights.length < 15) {
    const newFlight = {
      id: flights.length,
      to: "",
      from: "",
      cost: "",
      scale: "",
    };

    while (!newFlight.to || newFlight.to === " " || !isNaN(newFlight.to)) {
      newFlight.to = prompt("Destino: ");
    }

    while (
      !newFlight.from ||
      newFlight.from === " " ||
      !isNaN(newFlight.from)
    ) {
      newFlight.from = prompt("Origen: ");
    }

    while (!newFlight.cost || Number.isNaN(newFlight.cost)) {
      newFlight.cost = Number(prompt("Coste: €"));
    }

    newFlight.scale = Boolean(
      prompt("Escala (Y = con escala, cancelar = sin escala): ")
    );

    flights.push(newFlight);
    console.log("El vuelo ha sido añadido. La nueva lista de vuelos es:");
    console.log(flights);

    const promptCreate = Boolean(
      prompt(`Quieres crear otro vuelo? (Y = sí, cancelar = no) `)
    );
    if (promptCreate) {
      return createFlights();
    }

    return runAdminRole();
  }

  console.log(
    "El límite de vuelos es 15. Elimina un vuelo antes de crear uno nuevo."
  );
  return runAdminRole();
};

const deleteFlights = () => {
  const promptFlightId = Number(
    prompt("Escribe el número del vuelo que quieres eliminar: ")
  );

  if (!promptFlightId || isNaN(promptFlightId)) {
    console.log(`Por favor introduce un número.`);
    return deleteFlights();
  }

  let idCheck = false;

  for (let i = 0; i < flights.length && !idCheck; i++) {
    if (flights[i].id === promptFlightId) {
      flights.splice(i, 1);
      idCheck = true;
    }
  }

  if (!idCheck) {
    console.log(
      `El vuelo ${promptFlightId} no existe en la base de datos. Introduce un número de vuelo válido.`
    );
  }

  console.log(
    `El vuelo ${promptFlightId} ha sido eliminado. La nueva lista de vuelos es:`
  );
  console.log(flights);

  const promptDelete = Boolean(
    prompt(`Quieres eliminar otro vuelo? (Y = sí, cancelar = no) `)
  );
  if (promptDelete) {
    return deleteFlights();
  }

  return runAdminRole();
};

const runAdminRole = () => {
  let promptModify = prompt(
    "Escribe CREAR o ELIMINAR para modificar los vuelos. Quiero: "
  );

  if (promptModify === null) {
    return;
  }

  promptModify = promptModify.toLowerCase();

  if (promptModify === "crear") {
    return createFlights();
  }

  if (promptModify === "eliminar") {
    return deleteFlights();
  }

  if (promptModify !== "crear" || promptModify !== "eliminar") {
    console.log("Escribe CREAR o ELIMINAR para continuar.");
    runAdminRole();
  }
};

const runUserRole = () => {
  let searchPrice;

  while (!searchPrice || isNaN(searchPrice)) {
    searchPrice = Number(
      prompt("Indica tu precio y te buscamos los vuelos correspondientes: €")
    );
  }

  const myRange = flights.filter((flight) => flight.cost <= searchPrice);

  if (myRange.length === 0) {
    console.log(
      "No hay vuelos disponibles igual o inferior a este precio. Inténtalo de nuevo."
    );
  } else {
    console.log(`Aquí tienes los vuelos que cuestan €${searchPrice} o menos:`);
    myRange.forEach((flight) => {
      const scaleCheckRange = flight.scale
        ? "Este vuelo tiene escala."
        : "Este vuelo no tiene escala.";
      console.log(
        `El vuelo con origen ${flight.from} y destino ${flight.to} tiene un coste de €${flight.cost}. ${scaleCheckRange}`
      );
    });
  }

  const promptSearch = Boolean(
    prompt(`Quieres realizar otra búsqueda? (Y = sí, cancelar = no) `)
  );
  if (promptSearch) {
    return runUserRole();
  }

  return goodbyeMessage();
};

const profile = () => {
  let role = prompt("Eres ADMIN o USER? Indica tu rol: ");

  if (role === null) {
    return;
  }

  role = role.toLowerCase();

  if (role === "admin") {
    return runAdminRole();
  }

  if (role === "user") {
    return runUserRole();
  }

  if (role !== "admin" || role !== "user") {
    console.log("Escribe ADMIN o USER para continuar.");
    return profile();
  }
};

const main = () => {
  const userName = promptUsername();
  if (userName === null) {
    return goodbyeMessage();
  }

  flightInfo();
  averageCost();
  scaleInfo();
  lastFlights();
  profile();
};

main();
