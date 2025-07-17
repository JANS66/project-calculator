function add(num1, num2) {
    return +num1 + +num2;
}

function subtract(num1, num2) {
    return +num1 - +num2;
}

function multiply(num1, num2) {
    return +num1 * +num2;
}

function divide(num1, num2) {
    return +num1 / +num2;
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

function populateDisplay() {
    const buttons = document.querySelectorAll("button");
    const display = document.querySelector("#display");

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            display.textContent += e.target.textContent;

            // Disable operators after one operator chosen
            if (/[+\-*/]/.test(e.target.textContent)) {
                buttons.forEach(button => {
                    if (["+", "-", "/", "*"].includes(button.textContent)) {
                        button.disabled = true;
                    }
                });
            }

            // Slice everything into variables and calculate
            if (e.target.textContent === "=") {
                buttons.forEach(button => {
                    if ("=".includes(button.textContent)) {
                        button.disabled = true;
                    }
                })
                // Find operator in display
                const operators = ["+", "-", "*", "/"];
                // Find first operator
                const operatorIndex = [...display.textContent].findIndex(char => operators.includes(char));

                if (operatorIndex !== -1) {
                    const operator = display.textContent[operatorIndex];
                    const num1 = display.textContent.slice(0, operatorIndex);
                    const num2 = display.textContent.slice(operatorIndex + 1, -1);
                    display.textContent += (operate(num1, operator, num2));
                }
            }

            // Clear everything and enable operators 
            if (e.target.textContent === "CLR") {
                display.textContent = "";
                buttons.forEach(button => {
                    if (["+", "-", "/", "*", "="].includes(button.textContent)) {
                        button.disabled = false;
                    }
                })
            }
        })
    });
};


populateDisplay();