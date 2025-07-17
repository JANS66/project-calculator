function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    if (operator === "+") {
        add(num1, num2);
    } else if (operator === "-") {
        subtract(num1, num2);
    } else if (operator === "*") {
        multiply(num1, num2);
    } else if (operator === "/") {
        divide(num1, num2);
    };
};

function populateDisplay() {
    const buttons = document.querySelectorAll("button");
    const display = document.querySelector("#display");

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const text = e.target.textContent;
            const num = parseFloat(text);

            if (!isNaN(num)) {
                display.textContent += e.target.textContent;
            }
        })
    });
};

populateDisplay();