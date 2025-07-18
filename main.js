function formatResult(result) {
    const rounded = Number(result.toFixed(2));
    return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2);
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
let disableOperators = true;
let disableEquals = true;

function toggleOperators(disableOperators, disableEquals) {
    if (disableOperators) {
        buttons.forEach(button => {
            if (["+", "-", "/", "*"].includes(button.textContent)) {
                button.disabled = true;
            }
        })
    } else if (!disableOperators) {
        buttons.forEach(button => {
            if (["+", "-", "/", "*"].includes(button.textContent)) {
                button.disabled = false;
            }
        })
    }

    if (disableEquals) {
        buttons.forEach(button => {
            if (["="].includes(button.textContent)) {
                button.disabled = true;
            }
        })
    } else if (!disableEquals) {
        buttons.forEach(button => {
            if (["="].includes(button.textContent)) {
                button.disabled = false;
            }
        })
    }
}

let justEvaluated = false;

function populateDisplay() {
    const display = document.querySelector("#display");
    toggleOperators(disableOperators, disableEquals);

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            display.textContent += e.target.textContent;

            toggleOperators(disableOperators = false, disableEquals = true);

            if (/[+\-*/]/.test(display.textContent)) {
                toggleOperators(disableOperators = true, disableEquals = true);
                justEvaluated = false;
            }

            if (/[0-9]/.test(e.target.textContent)) {
                const lastOperatorIndex = Math.max(
                    display.textContent.lastIndexOf("+"),
                    display.textContent.lastIndexOf("-"),
                    display.textContent.lastIndexOf("*"),
                    display.textContent.lastIndexOf("/")
                );

                if (lastOperatorIndex !== -1) {
                    toggleOperators(disableOperators = true, disableEquals = false);
                }
            }

            if (/[0]/.test(e.target.textContent)) {
                const divisionOperatorIndex = display.textContent.lastIndexOf("/")

                if (divisionOperatorIndex !== -1) {
                    display.textContent = "Error, cant divide by 0!"
                    toggleOperators(disableOperators = true, disableEquals = true);
                }
            }

            // Slice everything into variables and calculate
            if (e.target.textContent === "=") {
                // Find operator in display
                const operators = ["+", "-", "*", "/"];
                // Find first operator
                const operatorIndex = [...display.textContent].findIndex(char => operators.includes(char));

                if (operatorIndex !== -1) {
                    const operator = display.textContent[operatorIndex];
                    const num1 = display.textContent.slice(0, operatorIndex);
                    const num2 = display.textContent.slice(operatorIndex + 1, -1);
                    display.textContent = (operate(num1, operator, num2));
                    justEvaluated = true;
                    toggleOperators(disableOperators = false, disableEquals = true);
                }
            }

            // Clear everything and enable operators 
            if (e.target.textContent === "CLR") {
                display.textContent = "";
                toggleOperators(disableOperators = true, disableEquals = true);
            }

            // So when user presses digit after his evaluation was done, start new calculation, not append that digit to result
            if (justEvaluated) {
                if (/\d/.test(e.target.textContent)) {
                    display.textContent = e.target.textContent;
                    justEvaluated = false;
                    return;
                } else if (/[+\-*]/.test(e.target.textContent)) {
                    justEvaluated = false;
                }
            }
        })
    });
};


populateDisplay();