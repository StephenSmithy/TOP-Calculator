//Global variables
let x = "";
let y = "";
let operation = "";
let result;


//Arithmetic functions
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

function exp(a, b) {
   return Math.pow(a, b);

}

function operate(a, b, operator) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '*') {
        return multiply(a, b);
    } else if (operator === '/') {
        if (b === 0) {
            return 'DIV0';
        }
        return divide(a, b);
    } else if (operator === 'x<sup>y</sup>') {
        return exp(a, b);
    }
}


//Resets the calculator. A hard reset wipes the current running total.
function reset(hardReset) {
    updateScreen(0);
    x = "";
    y = "";    
    operation = "";
    if (hardReset === true)  {
        result = "";
    }
}

//Evaluates the result of the current operation.
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

function appendX(str) {
    x = x + str;
}

function appendY(str) {
    y = y + str;
}

function shake() {
    const container = document.querySelector('.calculator');
    console.log(container);
    container.classList.add('shake');
    container.addEventListener('animationend', function() {
        this.classList.remove('shake')
    });
}

//updates the screen with the new value, reduces the font size to fit the screen size as the number gets bigger.
function updateScreen(value) {
    const scrn = document.querySelector('.screen');
    scrn.style.fontSize = '72px';
    scrn.innerHTML = value;   
    fontSize = parseFloat(window.getComputedStyle(scrn, null).fontSize);
    while (scrn.scrollWidth > scrn.clientWidth) {
        fontSize--;
        scrn.style.fontSize = `${fontSize}px`;
    }
 
}

//button click and key press functions.
function clickButton(e) {  
    if (this.innerHTML === 'AC') {
        reset(true);
    } else if (this.innerHTML === '=') {
        evaluate();        
    } else if (this.classList.contains('number')) {
        if ((!result) && operation === "") {
            appendX(this.innerHTML);
            updateScreen(x);
        } else if (operation !== "") {
            appendY(this.innerHTML);
            updateScreen(y);
        } else if (result === x) {
            reset();
            appendX(this.innerHTML);
            updateScreen(x);
        } else {
            appendX(this.innerHTML);
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
            shake();
        }
    }
}

function pressButton(e) {
    const pressedButton = document.querySelector(`button[data-key='${e.key}']`) 
    if (pressedButton.innerHTML === 'AC') {
        reset(true);
    } else if (pressedButton.innerHTML === 'Enter') {
        evaluate();        
    } else if (pressedButton.classList.contains('number')) {
        if ((!result) && operation === "") {
            appendX(pressedButton.innerHTML);
            updateScreen(x);
        } else if (operation !== "") {
            appendY(pressedButton.innerHTML);
            updateScreen(y);
        } else if (result === x) {
            reset();
            appendX(pressedButton.innerHTML);
            updateScreen(x);
        } else {
            appendX(pressedButton.innerHTML);
            updateScreen(x);
        }
    } else if (pressedButton.classList.contains('operator')) {
        if (operation === "") {
            operation = pressedButton.innerHTML;
        } else if (operation !== "" && y !== "") {
            evaluate(); // evaluates the answer when a second operation is pressed an y is non empty.
            operation = pressedButton.innerHTML;
        } else {
            updateScreen('ERR');
            shake();
        }
    }
}


const buttons = document.querySelectorAll('button');
buttons.forEach((button) => button.addEventListener('click', clickButton));
//buttons.forEach((button) => button.addEventListener('click', (e) => console.log(e)));

window.addEventListener('keydown',pressButton);




