//Elements

const currentEq = {
    num1: ``,
    operator: ``,
    num2: ``,
}
const display = document.getElementById("display");
const numButtons = document.querySelectorAll("button.num");
const operatorButtons = document.querySelectorAll("button.op");
const equalsButton = document.querySelector("button.equals");
const signButton = document.querySelector("button.sign");
let isNegative = false;

//Event listeners

numButtons.forEach(button => button.addEventListener("click", getNum));
operatorButtons.forEach(button => button.addEventListener("click", getOp));
equalsButton.addEventListener("click", operate);
signButton.addEventListener("click", toggleSign);

//Functions

function getNum() {
    if (currentEq.operator == "await") {
        //If user finishes previous equation and then starts typing a new number, clear the currentEq object and start fresh
        currentEq.operator = ``;
        currentEq.num1 = this.id;
        console.log(currentEq);
    } else if (!currentEq.operator) {
        //Before user chooses an operator, they're entering num1
        currentEq.num1 = currentEq.num1.concat(this.id);
        console.log(currentEq);
    } else {
        //After user chooses an operator, they're entering num2
        currentEq.num2 = currentEq.num2.concat(this.id);
        console.log(currentEq);
    }
}

function toggleSign() {
    switch(true) {
        case !currentEq.operator && isNegative == false:
            currentEq.num1 = "-" + currentEq.num1;
            isNegative = true;
            console.log(currentEq);
            break;
        case !currentEq.operator && isNegative == true:
            currentEq.num1 = currentEq.num1.substring(1);
            isNegative = false;
            console.log(currentEq);
            break;
        case currentEq.operator && isNegative == false:
            currentEq.num2 = "-" + currentEq.num2;
            isNegative = true;
            console.log(currentEq);
            break;
        case currentEq.operator && isNegative == true:
            currentEq.num2 = currentEq.num2.substring(1);
            isNegative = false;
            console.log(currentEq);
            break;
    }
}

function getOp() {
    currentEq.operator = this.id;
    console.log(currentEq);
    if (currentEq.num2 == ``) return;
    if (currentEq.num2 != ``) operate();
}

function operate() {
    //Get the pieces of the equation
    let a = Number(currentEq.num1);
    let b = Number(currentEq.num2);
    let c;
    //No dividing by 0 allowed
    if (currentEq.operator == "/" && b == 0) console.log("You can't divide by 0, but nice try.");
    //Evaluate
    if (currentEq.operator == "+") c = a + b;
    if (currentEq.operator == "-") c = a - b;
    if (currentEq.operator == "*") c = a * b;
    if (currentEq.operator == "/" && b != 0) c = a / b;
    console.log(c);
    display.innerText = `${c}`;
    //c is the new num1. User can either continue by choosing an operator, or start typing an entirely new equation.
    currentEq.num1 = c;
    currentEq.operator = "await";
    currentEq.num2 = ``;
}