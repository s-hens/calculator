//Elements

const currentEq = {
    num1: ``,
    operator: ``,
    num2: ``,
}
const display = document.getElementById("display");
const history = document.getElementById("history");
const numButtons = document.querySelectorAll("button.num");
const operatorButtons = document.querySelectorAll("button.op");
const equalsButton = document.querySelector("button.equals");
const clearButton = document.querySelector("button.ac");
const delButton = document.querySelector("button.del");
const signButton = document.querySelector("button.sign");
let isNegative = false;

//Event listeners

numButtons.forEach(button => button.addEventListener("click", getNum));
operatorButtons.forEach(button => button.addEventListener("click", getOp));
equalsButton.addEventListener("click", operate);
clearButton.addEventListener("click", clear);
delButton.addEventListener("click", backspace);
signButton.addEventListener("click", toggleSign);

//Functions

function getNum() {
    if (currentEq.operator == "await") {
        //If user finishes previous equation and then starts typing a new number, clear the currentEq object and start fresh
        currentEq.operator = ``;
        currentEq.num1 = this.id;
        display.innerText = currentEq.num1;
    } else if (!currentEq.operator) {
        //Max length is 9 digits, including <= 1 decimal point
        if (currentEq.num1.includes(".") && this.id == ".") return;
        if (currentEq.num1.length > 8) return;
        //Before user chooses an operator, they're entering num1
        currentEq.num1 = currentEq.num1.concat(this.id);
        display.innerText = currentEq.num1;
    } else {
        //Max length is 9 digits, including <= 1 decimal point
        if (currentEq.num2.includes(".") && this.id == ".") return;
        if (currentEq.num2.length > 8) return;
        //After user chooses an operator, they're entering num2
        currentEq.num2 = currentEq.num2.concat(this.id);
        display.innerText = currentEq.num2;
    }
}

function toggleSign() {
    switch(true) {
        case (!currentEq.operator || currentEq.operator == "await") && isNegative == false:
            currentEq.num1 = "-" + currentEq.num1;
            display.innerText = currentEq.num1;
            isNegative = true;
            break;
        case (!currentEq.operator || currentEq.operator == "await") && isNegative == true:
            currentEq.num1 = currentEq.num1.substring(1);
            display.innerText = currentEq.num1;
            isNegative = false;
            break;
        case currentEq.operator && isNegative == false:
            currentEq.num2 = "-" + currentEq.num2;
            display.innerText = currentEq.num2;
            isNegative = true;
            break;
        case currentEq.operator && isNegative == true:
            currentEq.num2 = currentEq.num2.substring(1);
            display.innerText = currentEq.num2;
            isNegative = false;
            break;
    }
}

function getOp() {
    currentEq.operator = this.id;
    if (currentEq.num2 == ``) return;
    if (currentEq.num2 != ``) operate();
}

function operate() {
    //Get the pieces of the equation
    let a = Number(currentEq.num1);
    let b = Number(currentEq.num2);
    let c;
    //a = a
    if (b == `` && currentEq.operator == ``) c = a, b = ``;
    //No dividing by 0 allowed
    if (currentEq.operator == "/" && b == 0) {
        alert(`Cannot divide by 0`);
        return;
    }
    //Evaluate
    if (currentEq.operator == "+") c = a + b;
    if (currentEq.operator == "-") c = a - b;
    if (currentEq.operator == "*") c = a * b;
    if (currentEq.operator == "/" && b != 0) c = a / b;
    //Make the answer as precise as possible while fitting in the display
    let cString = c.toString();
    let cPrecisionString = (c.toPrecision(9));
    //If answer includes a decimal, round so that the final answer is 9 digits including the decimal point. Precision in this case depends on how many digits are before the decimal point.
    if (cString.includes(".") == true && cPrecisionString.includes("e+") == false) {
        c = Number((Number(c.toPrecision(8))).toFixed(8));
    //If answer is in scientific notation:
    } else if (cPrecisionString.includes("e+") == true) {
        let precision = 8 - Number((cPrecisionString.length - cPrecisionString.indexOf("e+")));
        if (precision < 1) precision = 1; 
        c = c.toPrecision(precision).toString();
    //If answer contains no decimal point and is not in scientific notation:
    } else {
        c = Number((Number(c.toPrecision(9))).toFixed(9));
    }
    //Display result
    display.innerText = `${c}`;
    if (history.innerHTML == ``) {
        history.innerHTML = `${a} ${currentEq.operator} ${b} = ${c}`;
    } else {
        history.innerHTML = history.innerHTML + `<br>${a} ${currentEq.operator} ${b} = ${c}`;
    }
    //User can either continue to string together operations by choosing an operator, or start typing an entirely new equation by choosing a number
    currentEq.num1 = c;
    currentEq.operator = "await";
    currentEq.num2 = ``;
}

function clear() {
    currentEq.num1 = ``;
    currentEq.operator = ``;
    currentEq.num2 = ``;
    display.innerText = `0`;
}

function backspace() {
    if (currentEq.operator == "await" || display.innerText.length == 1) {
        clear();
    } else if (!currentEq.operator) {
        toString(currentEq.num1);
        currentEq.num1 = currentEq.num1.substring(0, (currentEq.num1.length - 1));
        display.innerText = currentEq.num1;
        console.log(currentEq);
    } else {
        currentEq.num2 = currentEq.num2.substring(0, (currentEq.num2.length - 1));
        display.innerText = currentEq.num2;
    }
}