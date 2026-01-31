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

    // Clear button
    if (buttonValue === "C") {
        clear();
        return;
    }

    // Display section
    if (display.value === "0") {
        display.value = buttonValue;
    } else {
        display.value += buttonValue;
    }
}