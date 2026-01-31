// Calculations block
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(numA, numB, operator) {
    const a = Number(numA);
    const b = Number(numB);

    return operator(a, b);
}

let a = 0;
let operator = null;
let b = null;

// Event handlers block
const display = document.getElementById("display-box");
const buttons = document.getElementById("buttons-box");

display.value = "0";

function clear() {
    display.value = "0";
    a = 0;
    operator = null;
    b = null;
}

buttons.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn")) return; // Prevents passing a value from clicking in between buttons
    
    handleEvent(e.target.dataset.value);
});

// Main block
function handleEvent(buttonValue) {
    console.log(buttonValue);

    // Clear (C) button
    if (buttonValue === "C") {
        clear();
        return;
    }

    // Percentage (%) button
    if (buttonValue === "%") {
        return display.value = display.value / 100;
    }

    // Return (⌫) button
    if (buttonValue === "⌫") {
        if (display.value === "0") return;
        if (display.value.length === 1) {
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

    // Display section
    if (display.value === "0") {
        display.value = buttonValue;
    } else {
        display.value += buttonValue;
    }
}