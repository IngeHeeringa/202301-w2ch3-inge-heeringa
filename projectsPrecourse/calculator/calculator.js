const prompt = require("prompt-sync")();

const squareRoot = (num) => {
  return Number.isInteger(Math.sqrt(num))
    ? Math.sqrt(num)
    : parseFloat(Math.sqrt(num).toFixed(3));
};

const promptNum1 = () => {
  const num1 = prompt("Introduce el primer número: ");
  if (isNaN(num1) || num1 === "" || num1 === " ") {
    console.log(
      `${num1} no es un número. Vuelve a intentarlo introduciendo un número.`
    );
    return promptNum1();
  }
  return num1;
};

const promptNum2 = () => {
  const num2 = prompt("Introduce el segundo número: ");
  if (num2 === "") {
    return null;
  } else if (isNaN(num2) || num2 === " ") {
    console.log(
      `${num2} no es un número. Vuelve a intentarlo introduciendo un número.`
    );
    return promptNum2();
  }

  return num2;
};

const calculator = (num1, num2) => {
  const add = Number(num1) + Number(num2);
  const subtract = Number(num1) - Number(num2);
  const multiply = Number(num1) * Number(num2);
  const divide = Number(num1) / Number(num2);
  let operations = [];
  let result = [];

  operations.push(add, subtract, multiply, divide);
  operations.forEach((operation) => {
    Number.isInteger(operation)
      ? result.push(operation)
      : result.push(Number.parseFloat(operation.toFixed(3)));
  });
  console.log(
    `La suma de ${num1} y ${num2} es ${result[0]}.\nLa resta de ${num1} y ${num2} es ${result[1]}\nEl producto de ${num1} y ${num2} es ${result[2]}\nLa división de ${num1} y ${num2} es ${result[3]}`
  );
};

const main = () => {
  const num1 = promptNum1();
  const num2 = promptNum2();
  if (num2 === null) {
    console.log(`La raíz cuadrada de ${num1} es ${squareRoot(num1)}`);
    return null;
  }
  calculator(num1, num2);
};

main();
