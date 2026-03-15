const display = document.getElementById('display');
const btnClear = document.getElementById('btnClear');
const btnDelete = document.getElementById('btnDelete');
const btnEquals = document.getElementById('btnEquals');
const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const cpuLoad = document.getElementById('cpuLoad');
const readyState = document.getElementById('readyState');

let currentValue = '0';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    let displayValue = currentValue;
    
    if (displayValue.length > 12) {
        displayValue = displayValue.slice(0, 12);
    }
    
    display.textContent = displayValue;
    display.classList.remove('error');
}

function showError(message) {
    display.textContent = message;
    display.classList.add('error');
    
    setTimeout(() => {
        display.classList.remove('error');
    }, 1000);
}

function updateCpuLoad() {
    const randomLoad = Math.floor(Math.random() * 30) + 70;
    cpuLoad.textContent = randomLoad;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentValue = '';
        shouldResetDisplay = false;
    }
    
    if (number === '.' && currentValue.includes('.')) {
        return;
    }
    
    if (currentValue === '0' && number !== '.') {
        currentValue = number;
    } else {
        currentValue += number;
    }
    
    updateDisplay();
    updateCpuLoad();
}

function setOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    
    previousValue = currentValue;
    operator = op;
    shouldResetDisplay = true;
    
    readyState.textContent = 'CALC...';
    updateCpuLoad();
}

function calculate() {
    if (operator === null || shouldResetDisplay) {
        return;
    }
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) {
        showError('ERR_NAN');
        clear();
        return;
    }
    
    let result;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                showError('ERR_DIV0');
                clear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    if (!isFinite(result)) {
        showError('ERR_INF');
        clear();
        return;
    }
    
    result = Math.round(result * 100000000) / 100000000;
    
    currentValue = result.toString();
    operator = null;
    previousValue = '';
    shouldResetDisplay = true;
    
    updateDisplay();
    readyState.textContent = 'TRUE';
    updateCpuLoad();
    
    glitchEffect();
}

function clear() {
    currentValue = '0';
    previousValue = '';
    operator = null;
    shouldResetDisplay = false;
    
    updateDisplay();
    readyState.textContent = 'TRUE';
    updateCpuLoad();
}

function deleteLastChar() {
    if (currentValue.length === 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
        currentValue = '0';
    } else {
        currentValue = currentValue.slice(0, -1);
    }
    
    updateDisplay();
    updateCpuLoad();
}

function glitchEffect() {
    const calculator = document.querySelector('.calculator');
    calculator.style.transform = 'translate(2px, -2px)';
    
    setTimeout(() => {
        calculator.style.transform = 'translate(-2px, 2px)';
    }, 50);
    
    setTimeout(() => {
        calculator.style.transform = 'translate(0, 0)';
    }, 100);
}

function handleKeyboard(e) {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLastChar();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clear();
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.dataset.number;
        appendNumber(number);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const op = button.dataset.operator;
        setOperator(op);
    });
});

btnClear.addEventListener('click', clear);

btnDelete.addEventListener('click', deleteLastChar);

btnEquals.addEventListener('click', calculate);

document.addEventListener('keydown', handleKeyboard);

setInterval(() => {
    const randomFluctuation = Math.floor(Math.random() * 5) - 2;
    const currentLoad = parseInt(cpuLoad.textContent);
    let newLoad = currentLoad + randomFluctuation;
    
    newLoad = Math.max(65, Math.min(99, newLoad));
    
    cpuLoad.textContent = newLoad;
}, 2000);

updateDisplay();