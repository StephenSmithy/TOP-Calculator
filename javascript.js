let x = "";
let y = "";
let operation = "";
let result;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        if (b === 0) return 'DIV 0 ERR';
        return divide(a, b);
    }
}

function reset(hardReset) {
    updateScreen(0);
    x = "";
    y = "";    
    operation = "";
    if (hardReset === true)  {
        result = "";
    }
}

function evaluate() {
    if (operation !== "" && y !== "") {
        result = operate(Number(x), Number(y), operation);
        x = result;
        y = "";
        operation = "";    
        updateScreen(result);
    } else {
        x = result;
        y = "";
        operation = "";    
        updateScreen(result);
    } 
}


function executeButton(e) {  
    if (this.innerHTML === 'AC') {
        reset(true);
    } else if (this.innerHTML === '=') {
        evaluate();        
    } else if (this.classList.contains('number')) {
        if ((!result) && operation === "") {
            x = x + this.innerHTML;
            updateScreen(x);
        } else if (operation !== "") {
            y = y + this.innerHTML;
            updateScreen(y);
        } else if (result === x) {
            reset();
            x = x + this.innerHTML;
            updateScreen(x);
        } else {
            x = x + this.innerHTML;
            updateScreen(x);
        }
    } else if (this.classList.contains('operator')) {
        if (operation === "") {
            operation = this.innerHTML;
        } else if (operation !== "" && y !== "") {
            evaluate(); // evaluates the answer when a second operation is pressed an y is non empty.
            operation = this.innerHTML;
        } else {
            updateScreen('ERR');
        }
    }
}

function updateScreen(value) {
    const scrn = document.querySelector('.screen');
    scrn.style.fontSize = '72px';
    scrn.innerHTML = value;   
    fontSize = parseFloat(window.getComputedStyle(scrn, null).fontSize);
    while (scrn.scrollWidth > scrn.clientWidth) {
        fontSize--;
        scrn.style.fontSize = `${fontSize}px`;
        console.log(window.getComputedStyle(scrn, null).fontSize);
    }
 
}



function pressButton(e) {
    const pressedButton = document.querySelector(`button[data-key='${e.key}']`);
    executedButton(pressedButton);

}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => button.addEventListener('click', executeButton));
//buttons.forEach((button) => button.addEventListener('click', (e) => console.log(e)));

window.addEventListener('keydown',pressButton);


