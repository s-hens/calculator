//Elements

const currentEq = {
    num1: ``,
    operator: ``,
    num2: ``,
}
const display = document.getElementById("display");
const history = document.getElementById("history");
const numButtons = document.querySelectorAll("button.num");
const numKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operatorButtons = document.querySelectorAll("button.op");
const operatorKeys = ["+", "-", "*", "/"];
const equalsButton = document.querySelector("button.equals");
const equalsKeys = ["=", "Enter"];
const delButton = document.querySelector("button.del");
const delKeys = ["Delete", "Backspace"];
const clearButton = document.querySelector("button.ac");
const signButton = document.querySelector("button.sign");
let isNegative = false;
let clearFromBackspace = false;
let stringingOps = false;

//Event listeners

numButtons.forEach(button => button.addEventListener("click", getNum));
window.addEventListener("keydown", getNum);

operatorButtons.forEach(button => button.addEventListener("click", getOp));
window.addEventListener("keydown", getOp);

equalsButton.addEventListener("click", evaluate);
window.addEventListener("keydown", evaluate);

delButton.addEventListener("click", backspace);
window.addEventListener("keydown", backspace);

clearButton.addEventListener("click", clear);
window.addEventListener("keydown", clear);

signButton.addEventListener("click", toggleSign);

//Functions

function getNum(e) {
    //Determine if relevant keydown OR click/touch OR irrelevant keydown
    if (numKeys.includes(e.key) == true) {
        this.id = e.key;
    } else if (e.type == "click") {
    } else {
        return;
    }
    if (currentEq.operator == "await" && stringingOps == false) {
        //If user finishes previous equation and then starts typing a new number, clear the currentEq object and start fresh
        currentEq.operator = ``;
        currentEq.num1 = this.id;
        display.innerText = currentEq.num1;
    } else if (!currentEq.operator) {
        //Max length is 8 digits, including <= 1 decimal point
        if (currentEq.num1.includes(".") && this.id == ".") return;
        if (currentEq.num1.length > 7) return;
        //Before user chooses an operator, they're entering num1
        currentEq.num1 = currentEq.num1.concat(this.id);
        display.innerText = currentEq.num1;
    } else {
        //Max length is 8 digits, including <= 1 decimal point
        if (currentEq.num2.includes(".") && this.id == ".") return;
        if (currentEq.num2.length > 7) return;
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

function getOp(e) {
    //Determine if relevant keydown OR click/touch OR irrelevant keydown
    if (operatorKeys.includes(e.key) == true) {
        this.id = e.key;
    } else if (e.type == "click") {
    } else {
        return;
    }
    //Determine if user is stringing together multiple equations
    if (currentEq.num2 == `` && currentEq.num1 != ``) {
        currentEq.operator = this.id;
        display.innerText = currentEq.operator;
        return;
    } else if (currentEq.num2 != `` && currentEq.num1 != ``) {
        stringingOps = true;
        currentEq.operator = this.id;
        display.innerText = currentEq.operator;
        evaluate();
    } else {
    }
}

function evaluate(e) {
    //Determine if relevant keydown OR click/touch OR irrelevant keydown
    if (stringingOps == true) {
    } else if (equalsKeys.includes(e.key) == true || e.type == "click") {
        stringingOps = false;
    } else {
        return;
    }
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
    //Make the answer as precise as possible while fitting in the display. Max length is 8 digits
    let cString = c.toString();
    let cPrecisionString = (c.toPrecision(8));
    if (cString.includes(".") == true && cPrecisionString.includes("e+") == false) {
        c = Number((Number(c.toPrecision(7))).toFixed(6));
    } else if (cPrecisionString.includes("e+") == true) {
        let precision = 7 - Number((cPrecisionString.length - cPrecisionString.indexOf("e+")));
        if (precision < 1) precision = 1; 
        c = c.toPrecision(precision).toString();
    } else {
        c = Number((Number(c.toPrecision(8))).toFixed(8));
    }
    //Display result
    display.innerText = `${c}`;
    history.innerHTML = `${a} ${currentEq.operator} ${b} = ${c}`;
    //User can either continue to string together operations by choosing an operator, or start typing an entirely new equation by choosing a number
    currentEq.num1 = c;
    currentEq.num2 = ``;
    //Allow users to string operations without pressing = between each
    if (stringingOps == false) {
        currentEq.operator = "await";
    }
}

function clear(e) {
    //Determine if relevant keydown OR click/touch OR irrelevant keydown
    if (clearFromBackspace == true || e.key == "c" || e.type == "click") {
        currentEq.num1 = ``;
        currentEq.operator = ``;
        currentEq.num2 = ``;
        display.innerText = `0`;
        history.innerText = ``;
        clearFromBackspace = false;
    } else return;
}

function backspace(e) {
    //Determine if relevant keydown OR click/touch OR irrelevant keydown
    if (delKeys.includes(e.key) == true || e.type == "click") {
        //Delete most recent input
        if (currentEq.operator == "await" || display.innerText.length == 1) {
            clearFromBackspace = true;
            clear(e);
        } else if (!currentEq.operator) {
            toString(currentEq.num1);
            currentEq.num1 = currentEq.num1.substring(0, (currentEq.num1.length - 1));
            display.innerText = currentEq.num1;
        } else {
            currentEq.num2 = currentEq.num2.substring(0, (currentEq.num2.length - 1));
            display.innerText = currentEq.num2;
        }
    } else return;
}