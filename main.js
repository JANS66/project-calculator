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

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const utilityButtons = document.querySelectorAll(".utility");
const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
let justEvaluated = false;
let operator = '';
let firstOperand = '';
let secondOperand = '';
let buildingSecondOperand = false;

numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        const digit = e.target.textContent;

        if (justEvaluated) {
            display.textContent = digit;
            firstOperand = digit;
            operator = '';
            secondOperand = '';
            justEvaluated = false;
            buildingSecondOperand = false;
            return;
        }

        if (digit === ".") {
            const current = buildingSecondOperand ? secondOperand : firstOperand;
            if (current.includes(".")) return;
        }

        if (!operator) {
            if (firstOperand.toString().length >= 12) return;
            firstOperand += digit;
            display.textContent += digit;
        } else {
            if (secondOperand.toString().length >= 12) return;
            secondOperand += digit;
            buildingSecondOperand = true;
            display.textContent += digit;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", e => {
        const clickedOperator = e.target.textContent;

        if (clickedOperator === "=") {
            if (operator && secondOperand !== '') {
                if (operator === "/" && Number(secondOperand) === 0) {
                    display.textContent = "Can't divide by 0!";
                    justEvaluated = true;
                    return;
                }

                const result = operate(firstOperand, operator, secondOperand);
                display.textContent = result;
                firstOperand = result;
                operator = '';
                secondOperand = '';
                justEvaluated = true;
                buildingSecondOperand = false;
            }
            return;
        }

        if (justEvaluated) {
            justEvaluated = false;
        }

        if (!operator) {
            operator = clickedOperator;
            display.textContent += operator;
        } else if (secondOperand !== '') {
            if (operator === "/" && Number(secondOperand) === 0) {
                display.textContent = "Can't divide by 0!";
                justEvaluated = true;
                return;
            }

            const result = operate(firstOperand, operator, secondOperand);
            display.textContent = result + clickedOperator;
            firstOperand = result;
            secondOperand = '';
            operator = clickedOperator;
            buildingSecondOperand = false;
        }
    });
});

utilityButtons.forEach(button => {
    button.addEventListener("click", e => {
        const utility = e.target.textContent;

        if (utility === "DEL") {
            const current = display.textContent;
            if (current.length === 0) return;

            display.textContent = current.slice(0, -1);

            if (justEvaluated) {
                display.textContent = "";
                firstOperand = "";
                secondOperand = "";
                operator = "";
                justEvaluated = false;
                return;
            }

            if (!operator) {
                firstOperand = firstOperand.slice(0, -1);
            } else if (operator && secondOperand === '') {
                operator = '';
            } else {
                secondOperand = secondOperand.slice(0, -1);
            }
        }

        if (utility === "CLR") {
            display.textContent = "";
            firstOperand = "";
            secondOperand = "";
            operator = "";
            justEvaluated = false;
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
        btn.classList.add("active");
        setTimeout(() => btn.classList.remove("active"), 100);
    }
})