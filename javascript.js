const currentEquation = {
    num1: ``,
    operator: ``,
    num2: ``,
}

const numButtons = document.querySelectorAll("button.num");

numButtons.forEach(button => button.addEventListener("click", getNum));

function getNum() {
    //Before user chooses an operator, they're entering num1
    //After user chooses an operator, they're entering num2
    if (!currentEquation.operator) {
        currentEquation.num1 = currentEquation.num1.concat(this.id);
        console.log(currentEquation);
    } else {
        currentEquation.num2 = currentEquation.num2.concat(this.id);
        console.log(currentEquation);
    }
}

const operatorButtons = document.querySelectorAll("button.op");

operatorButtons.forEach(button => button.addEventListener("click", getOp));

function getOp() {
    currentEquation.operator = this.id;
    console.log(currentEquation);
}

const equalsButton = document.querySelector("button.equals");

equalsButton.addEventListener("click", operate);

function operate() {
    let a = Number(currentEquation.num1);
    let b = Number(currentEquation.num2);
    let c;
    switch (true) {
        case currentEquation.operator == "+":
            c = a + b;
            break;
        case currentEquation.operator == "-":
            c = a - b;
            break;
        case currentEquation.operator == "*":
            c = a * b;
            break;
        case currentEquation.operator == "/":
            c = a / b;
            break;
    }
    console.log(c);
}