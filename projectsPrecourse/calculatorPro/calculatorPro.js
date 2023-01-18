const prompt = require("prompt-sync")();

const squareRoot = (num) => {
  return Number.isInteger(Math.sqrt(num))
    ? Math.sqrt(num)
    : parseFloat(Math.sqrt(num).toFixed(3));
};

const promptNums = () => {
  const num = prompt(
    "Introduce un número. Si no quieres introducir más números, escribe = : "
  );
  if (num === "=") {
    return null;
  } else if (isNaN(num) || num === "" || num === " ") {
    console.log(
      `${num} no es un número. Vuelve a intentarlo introduciendo al menos 1 número.`
    );
    return promptNums();
  }
  return num;
};

const pushNums = () => {
  const arrNums = [];
  let finish = false;

  while (!finish) {
    const nums = promptNums();
    if (nums === null) {
      finish = true;
    } else arrNums.push(nums);
  }
  return arrNums;
};

const calculator = (arrNums) => {
  if (arrNums.length === 1) {
    console.log(
      `La raíz cuadrada de ${arrNums[0]} es ${squareRoot(arrNums[0])}`
    );
    return;
  }

  const add = arrNums.reduce((acc, num) => Number(acc) + Number(num), 0);
  const subtract = arrNums.reduce((acc, num) => acc - num, 0);
  const multiply = arrNums.reduce((acc, num) => acc * num, 0);
  const divide = arrNums.reduce((acc, num) => acc / num, 0);
  const operations = [];
  const result = [];

  operations.push(add, subtract, multiply, divide);
  operations.forEach((operation) => {
    Number.isInteger(operation)
      ? result.push(operation)
      : result.push(parseFloat(operation).toFixed(3));
  });

  const nums = arrNums.toString();
  console.log(
    `La suma de ${nums.split(",").join(" + ")} es ${
      result[0]
    }.\nLa resta de ${nums.split(",").join(" - ")} es ${
      result[1]
    }.\nEl producto de ${nums.split(",").join(" * ")} es ${
      result[2]
    }.\nLa división de ${nums.split(",").join(" / ")} es ${result[3]}.`
  );
};

const newOperation = () => {
  const promptNew = `Quieres realizar otra operación? y = sí, n = no: `;
  if (promptNew === "y") {
    return main();
  }
  console.log("Gracias por usar la calculadora. Hasta pronto!");
};

const main = () => {
  const arrNums = pushNums();
  calculator(arrNums);
  newOperation();
};

main();
