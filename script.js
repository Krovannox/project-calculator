// Log Status
function logStatus(buttonValue) {
    console.log(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`);
    console.log(`Button pressed: [${buttonValue}]`);
    console.log(`Current value of (a): ${a}`);
    console.log(`Current value of (operator): ${operator}`);
    console.log(`Current value of (b): ${b}`);
    console.log(`==========================================`);
    console.log(`Display value: ${display.value}`);
    console.log(`Reset display: ${resetDisplay}`);
    console.log(`==========================================`);
}

// Calculations block
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "Error": (a / b);

function operate(numA, numB, operator) {
    const a = Number(numA);
    const b = Number(numB);

    switch (operator) {
        case "+":
            operator = add;
            break;
        case "-":
            operator = subtract;
            break;
        case "×":
            operator = multiply;
            break
        case "÷":
            operator = divide;
            break;
    }

    return operator(a, b);
}

let a = "0";
let operator = null;
let b = null;

let resetDisplay = false;

// Event handlers block
const display = document.getElementById("display-box");
const buttons = document.getElementById("buttons-box");

display.value = "0";

function clear() {
    display.value = "0";
    a = "0";
    operator = null;
    b = null;
    resetDisplay = false;
}

buttons.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn")) return; // Prevents passing a value from clicking in between buttons
    
    handleEvent(e.target.dataset.value, e.target.classList);
});

// Main block
function handleEvent(buttonValue, buttonClass) {
    // Clear (C) button
    if (buttonValue === "C") {
        clear();
        return;
    }

    // Handles Error message
    if (display.value === "Error") {
        return;
    } else {
        // Percentage (%) button
        if (buttonValue === "%") {
            return display.value = display.value / 100;
        }

        // Return (⌫) button
        if (buttonValue === "⌫") {
            if (display.value === "0") return;
            
            if (display.value.length === 1 || (display.value.length === 2 && display.value.includes("-"))) {
                return display.value = "0";
            } else {
                return display.value = display.value.slice(0, -1);
            }
        }

        // Plus-Minus (±) button
        if (buttonValue === "±") {
            if (display.value === "0") return;
            
            if (!display.value.includes("-")) {
                return display.value = "-" + display.value;
            } else {
                return display.value = display.value.slice(1);
            }
        }

        // Decimal Point (.) button
        if (buttonValue === ".") {
            if (display.value.includes(".")) return;
            
            return display.value = display.value + ".";
        }

        // Operators buttons
        if (buttonClass.contains("operator") && buttonValue !== "=") {
            if (a !== "0" && operator !== null) {
                console.log("FLAG B");
                b = display.value;
                display.value = operate(a, b, operator);
                a = display.value;
                operator = buttonValue;
                resetDisplay = true;
                logStatus(buttonValue);
                return;
            } else {
                console.log("FLAG A");
                a = display.value;
                display.value = "";
                operator = buttonValue;

                logStatus(buttonValue);
                return;
            }
        }

        if (buttonValue === "=") {
            if (operator === null) return;

            b = display.value;
            display.value = operate(a, b, operator);
            a = display.value;

            operator = null;
            b = null;
            resetDisplay = true;
            logStatus(buttonValue);
            return;
        }
    }

    // Display section
    if (resetDisplay) {
        display.value = buttonValue;
        resetDisplay = false;
    } else if (display.value === "0") {
        display.value = buttonValue;
    } else {
        display.value += buttonValue;
    }

    logStatus(buttonValue);
}