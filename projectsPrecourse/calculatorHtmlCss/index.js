const form = document.getElementById("calculator-form");
const current = document.querySelector("[data-current-result]");
const previous = document.querySelector("[data-temp-result]");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const sqrt = document.querySelector("[data-sqrt]");
const equals = document.querySelector("[data-equals]");
const clear = document.querySelector("[data-clear]");
const allClear = document.querySelector("[data-all-clear]");

let equation = [];
const operatorArr = ["/", "*", "-", "+"];
const operatorsInEquationArr = /[^0-9.]/g;

const formatEquationArr = (equation) => equation.toString().split(",").join("");

const extractOperator = (equationArr) =>
  equationArr.match(operatorsInEquationArr).toString();

const formatDecimals = (result) =>
  Number.isInteger(result) ? result : parseFloat(result.toFixed(3));

const calculate = (equation, operator, callback) => {
  const firstNumsArr = equation.slice(0, equation.indexOf(operator));
  const secondNumsArr = equation.slice(
    equation.indexOf(operator) + 1,
    equation.length
  );
  const firstNum = formatEquationArr(firstNumsArr);
  const secondNum = formatEquationArr(secondNumsArr);
  const result = formatDecimals(callback(firstNum, secondNum));
  return result;
};

const add = (num1, num2) => Number(num1) + Number(num2);

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

allClear.addEventListener("click", () => {
  current.value = "0";
  previous.value = "0";
  equation = [];
});

clear.addEventListener("click", () => {
  const equationArr = formatEquationArr(equation);
  if (
    equationArr.match(operatorsInEquationArr) &&
    !equationArr.includes(Infinity)
  ) {
    const usedOperator = extractOperator(equationArr);
    equation = equation.slice(0, equation.indexOf(usedOperator) + 1);
    current.value = usedOperator;
  } else {
    current.value = "0";
    equation = [];
  }
});

sqrt.addEventListener("click", () => {
  const num = formatEquationArr(equation);
  current.value = formatDecimals(Math.sqrt(num));
  previous.value = "0";
  equation = [];
  equation.push(current.value);
});

equals.addEventListener("click", () => {
  const equationArr = formatEquationArr(equation);
  const usedOperator = extractOperator(equationArr);

  // eslint-disable-next-line default-case
  switch (usedOperator) {
    case "+":
      current.value = calculate(equation, "+", add);
      break;
    case "-":
      current.value = calculate(equation, "-", subtract);
      break;
    case "*":
      current.value = calculate(equation, "*", multiply);
      break;
    case "/":
      current.value = calculate(equation, "/", divide);
      break;
  }

  equation = [];
  equation.push(current.value);
});

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    equation.push(e.target.value);
    if (current.value.length > 12) {
      previous.value = "0";
      current.value = "Display error";
      equation = [];
    } else if (current.value === "0" || operatorArr.includes(current.value)) {
      current.value = e.target.value;
    } else if (e.target.value === "." && current.value.includes(".")) {
      current.value += e.target.value.replace(".", "");
      equation.pop();
    } else current.value += e.target.value;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (equation.length > 0) {
      equation.push(e.target.value);
    }

    if (equation.length === 0) {
      current.value = "0";
    } else if (
      operatorArr.includes(current.value) &&
      operatorArr.includes(e.target.value)
    ) {
      equation.splice(equation.length - 2, 1);
      current.value = e.target.value;
    } else if (equation[equation.length - 2] === ".") {
      equation.splice(equation.length - 2, 1);
      previous.value = formatEquationArr(equation.slice(0, -1));
      current.value = e.target.value;
    } else {
      previous.value = current.value;
      current.value = e.target.value;
    }
  });
});
