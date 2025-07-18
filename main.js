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

function toggleButtons(symbols, shouldDisable) {
    buttons.forEach(button => {
        if (symbols.includes(button.textContent)) {
            button.disabled = shouldDisable;
        }
    })
}

let justEvaluated = false;

function populateDisplay() {
    const display = document.querySelector("#display");
    toggleButtons(["/", "*", "-", "+", "="], true);
    toggleButtons(["."], false);

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            buttons.forEach(button => {
                if (["DEL"].includes(button.textContent)) {
                    button.disabled = false;
                }
            })

            if (justEvaluated) {
                toggleButtons(["."], false);
                if (/\d|\./.test(e.target.textContent)) {
                    display.textContent = e.target.textContent;
                    justEvaluated = false;
                    return;
                } else if (/[+\-*/]/.test(e.target.textContent)) {
                    justEvaluated = false;
                }
            }

            if (display.textContent.length >= 12 && !["DEL", "CLR"].includes(e.target.textContent)) {
                return;
            }

            if (e.target.textContent === "DEL") {
                const lastChar = display.textContent.slice(-1);
                if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
                    toggleButtons(["/", "*", "-", "+"], false);
                }
                display.textContent = display.textContent.slice(0, -1);
                return;
            }

            display.textContent += e.target.textContent;

            toggleButtons(["/", "*", "-", "+"], false);
            toggleButtons(["="], true);

            if (/[+\-*/]/.test(display.textContent)) {
                toggleButtons(["/", "*", "-", "+", "="], true);
                toggleButtons(["."], false);
            }

            if (/[0-9]/.test(e.target.textContent)) {
                const lastOperatorIndex = Math.max(
                    display.textContent.lastIndexOf("+"),
                    display.textContent.lastIndexOf("-"),
                    display.textContent.lastIndexOf("*"),
                    display.textContent.lastIndexOf("/")
                );

                if (lastOperatorIndex !== -1) {
                    toggleButtons(["/", "*", "-", "+"], true);
                    toggleButtons(["="], false);
                }
            }

            let dots = display.textContent.match(/\./g);
            if (dots && dots.length >= 2) {
                toggleButtons(["."], true);
            }

            if (/[\.]/.test(e.target.textContent)) {
                toggleButtons(["/", "*", "-", "+", "=", "."], true);
            }

            if (/[0]/.test(display.textContent)) {
                const divisionOperatorIndex = display.textContent.lastIndexOf("/")

                if (divisionOperatorIndex !== -1) {
                    display.textContent = "Error, cant divide by 0!";
                    toggleButtons(["/", "*", "-", "+", "=", "."], true);
                    justEvaluated = true;
                    buttons.forEach(button => {
                        if (["DEL"].includes(button.textContent)) {
                            button.disabled = true;
                        }
                    })
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
                    toggleButtons(["/", "*", "-", "+", "."], false);
                    toggleButtons(["="], true);
                }
            }

            // Clear everything and disable operators 
            if (e.target.textContent === "CLR") {
                display.textContent = "";
                toggleButtons(["/", "*", "-", "+", "="], true);
                toggleButtons(["."], false);
            }
        })
    });

    document.addEventListener("keydown", (e) => {
        let key = e.key;

        if (key === "Enter") key = "=";
        if (key === "Backspace") key = "DEL";

        const btn = [...buttons].find(button => button.textContent === key);
        if (btn) {
            btn.click();
        }
    });
};


populateDisplay();