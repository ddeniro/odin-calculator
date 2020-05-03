
const add = (x, y) => parseFloat(x) + parseFloat(y);
const subtract = (x,y) => parseFloat(x) - parseFloat(y);
const multiply = (x, y) => parseFloat(x) * parseFloat(y);
const divide = (x,y) => parseFloat(x) / parseFloat(y);
const operate = (operator, x, y) => operator(x,y);

let clearBtn = document.getElementById('clear');
let deleteBtn = document.getElementById('delete');
let divideBtn = document.getElementById('divide');
let multiplyBtn = document.getElementById('multiply');

let sevenBtn = document.getElementById('seven');
let eightBtn = document.getElementById('eight');
let nineBtn = document.getElementById('nine');
let subtractBtn = document.getElementById('subtract');

let fourBtn = document.getElementById('four');
let fiveBtn = document.getElementById('five');
let sixBtn = document.getElementById('six');
let addBtn = document.getElementById('add');

let oneBtn = document.getElementById('one');
let twoBtn = document.getElementById('two');
let threeBtn = document.getElementById('three');

let zeroBtn = document.getElementById('zero');
let pointBtn = document.getElementById('point');
let equalsBtn = document.getElementById('equals');

//all the buttons
let totalDisplay = document.getElementById('total-equation');
let currentDisplay = document.getElementById('current-number');
let prevIsOperand = false;
let decimalUsed = false;
let x = undefined;
let y = undefined;
let infix = [];

//Give numbers ability to add to display on click.
let numbers = [zeroBtn, oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn, nineBtn];
numbers.forEach(number => {
    number.addEventListener("click", () => {
        totalDisplay.innerText = totalDisplay.innerText + number.innerText;
        currentDisplay.innerText = currentDisplay.innerText + number.innerText;
        prevIsOperand = false;
    })
})

clearBtn.addEventListener('click', () => {
    totalDisplay.textContent = '';
    currentDisplay.textContent = '';
})

//Buttons that handle the logic for using operands.
let operators = [divideBtn, multiplyBtn, subtractBtn, addBtn];
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (!prevIsOperand) {
            infix.push(currentDisplay.innerText, operator.innerText);
            totalDisplay.innerText = totalDisplay.innerText + operator.innerText;
            currentDisplay.innerText = '';
            prevIsOperand = true;
            decimalUsed = false;
        }
    })
})
const isOperator = (char) =>{
    switch (char) {
        case '-':
        case '+':
        case '×':
        case '÷':
            return true;
    }
    return false;
}
const getPrecedence = (operand) => {
    switch(operand) {
        case '-':
        case '+':
            return 1;
        case '×':
        case '÷':
            return 2;
    }
}

const infixToPostfix = (infix) => {
    let stack = [];
    let output = [];
    infix.forEach(element => {
        if (isOperator(element)) {
            if (stack.length > 0 ) {
                // Stack has an operator, compare it with element and either add higher precedence, or pop to postfix.
                if (getPrecedence(stack[stack.length - 1]) > getPrecedence(element)) {
                    output.push(stack.pop());
                    stack.push(element);
                }
                else {
                    stack.push(element);
                }
            }
            else {
                stack.push(element);
            }
        }
        else {
            output.push(element);
        }

    })
    for (let i = 0; i < stack.length; i++) {
        const element = stack[i];
        output.push(element)   
    }
    return output;
}
/**
 * 
 * @param {array} postfix Our postfix equation e.g. 123×+4-
 * This will evaluate a postfix array. 
 * @return {number} this is the result of our equation, the final element in the stack.
 */
const postfixEvaluate = (postfix) => {
    let stack = [];
    for (let i = 0; i < postfix.length; i++) {
        const element = postfix[i];
        if (!isOperator(element)) {
            stack.push(element);
        }
        else {
            console.log('operator:', element);
            let y = stack.pop();
            let x = stack.pop();
            switch (element) {
                case '+':
                    stack.push(operate(add, x, y));
                    break;
                case '-':
                    stack.push(operate(subtract, x, y));
                    break;
                case '×':
                    stack.push(operate(multiply, x, y));
                    break;
                case '÷':
                    stack.push(operate(divide, x, y));
                    break;
            }

        }
        
    }
    console.log(stack);
    return Math.round(1000*stack[0]) / 1000;
}
const keys = [];
const logKey = (e) => {
    keys.push(e.key);
    console.log(keys);
}
const addNumber = number => {
    totalDisplay.innerText = totalDisplay.innerText + number;
    currentDisplay.innerText = currentDisplay.innerText + number;
    prevIsOperand = false;
}
const addOperator = operator => {
    if (!prevIsOperand) {
            infix.push(currentDisplay.innerText, operator);
            totalDisplay.innerText = totalDisplay.innerText + operator;
            currentDisplay.innerText = '';
            prevIsOperand = true;
            decimalUsed = false;
        }
}
const backspace = () => {
    let text = currentDisplay.innerText;
    text = text.slice(0, text.length - 1);
    currentDisplay.innerText = text;

    let totalText = totalDisplay.innerText;
    totalText = totalText.slice(0, text.length - 1);
    totalDisplay.innerText = text;
}
const evaluate = () => {
    console.log('infix:', infix);
    infix.push(currentDisplay.innerText);
    infix = infixToPostfix(infix);
    let postfix = postfixEvaluate(infix);
    currentDisplay.innerText = postfix
    totalDisplay.innerText = postfix;
    infix = [];
    prevIsOperand = false;
    decimalUsed = false;
}
const addDecimal = () => {
    if (!decimalUsed) {
        totalDisplay.innerText = totalDisplay.innerText + pointBtn.innerText;
        currentDisplay.innerText = currentDisplay.innerText + pointBtn.innerText;
        decimalUsed = true;
    }
}
clearBtn.addEventListener('click', () => {
    totalDisplay.textContent = '';
    currentDisplay.textContent = '';
    decimalUsed = false;
    prevIsOperand = false;
})
pointBtn.addEventListener('click', addDecimal);
equalsBtn.addEventListener('click', evaluate);
deleteBtn.addEventListener('click', backspace);
document.addEventListener('keydown', logKey);
document.addEventListener('keydown', e => {
    if (e.key === '0') {
        addNumber(0);
    }
    if (e.key === '1') {
        addNumber(1);
    }
    if (e.key === '2') {
        addNumber(2);
    }
    if (e.key === '3') {
        addNumber(3);
    }
    if (e.key === '4') {
        addNumber(4);
    }
    if (e.key === '5') {
        addNumber(5);
    }
    if (e.key === '6') {
        addNumber(6);
    }
    if (e.key === '7') {
        addNumber(7);
    }
    if (e.key === '8') {
        addNumber(8);
    }
    if (e.key === '9') {
        addNumber(9);
    }
    if (e.key === '-') {
        addOperator('-');
    }
    if (e.key === '+') {
        addOperator('+');
    }
    if (e.key === '*') {
        addOperator('×');
    }
    if (e.key === '/') {
        addOperator('÷');
    }
    if (e.key === 'Backspace') {
        backspace();
    }
    if (e.key === 'Enter') {
        evaluate();
    }
    if( e.key === '.') {
        addDecimal();
    }
})