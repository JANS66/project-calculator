function formatResult(result) {
    let str = result.toString();

    if (str.length >= 12) {
        return Number(str).toFixed(2)
    }
    return str;
}

function add(num1, num2) {
    let result = +num1 + +num2;
    return formatResult(result);
}

function subtract(num1, num2) {
    let result = +num1 - +num2;
    return formatResult(result);
}

function multiply(num1, num2) {
    let result = +num1 * +num2;
    return formatResult(result);
}

function divide(num1, num2) {
    let result = +num1 / +num2;
    return formatResult(result);
}

function operate(num1, operator, num2) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    };
};

const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll("#number");
const operatorButtons = document.querySelectorAll("#operator");
const utilityButtons = document.querySelectorAll("#utility");
let firstOperand = '';
let secondOperand = '';
let operator = '';
let justEvaluated = false;

numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        const digit = e.target.textContent;

        if (justEvaluated) {
            display.textContent = e.target.textContent;
            justEvaluated = false;
            return;
        }

        display.textContent += digit;
    });
})

operatorButtons.forEach(button => {
    button.addEventListener("click", e => {
        const clickedOperator = e.target.textContent;

        if (clickedOperator === "=") {
            if (operator) {
                const parts = display.textContent.split(operator);
                secondOperand = parts[1];
                if (operator === "/" && Number(secondOperand) === 0) {
                    display.textContent = "Can't divide by 0!";
                    operator = '';
                    justEvaluated = true;
                    return;
                }
                if (firstOperand && secondOperand) {
                    const result = operate(firstOperand, operator, secondOperand);
                    display.textContent = result;
                    firstOperand = result;
                    operator = '';
                    secondOperand = '';
                    justEvaluated = true;
                }
            }
            return;
        }

        if (!operator) {
            firstOperand = display.textContent;
            operator = clickedOperator;
            display.textContent += operator;
        } else {
            const parts = display.textContent.split(operator);
            secondOperand = parts[1];

            if (firstOperand && secondOperand) {
                const result = operate(firstOperand, operator, secondOperand);
                display.textContent = result + clickedOperator;
                firstOperand = result;
                operator = clickedOperator;
                justEvaluated = false;
            }
        }
    });
})

utilityButtons.forEach(button => {
    button.addEventListener("click", e => {
        const utility = e.target.textContent;

        if (utility === "DEL") {
            display.textContent = display.textContent.slice(0, -1);
        }

        if (utility === "CLR") {
            display.textContent = "";
        }
    });
})

document.addEventListener("keydown", e => {
    let key = e.key;

    if (key === "Enter") key = "=";
    if (key === "Backspace") key = "DEL";

    const btn = [...buttons].find(button => button.textContent === key);
    if (btn) {
        btn.click();
    }
})