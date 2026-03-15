let counterValue = document.querySelector('.counter-value')
let incBtn = document.getElementById('incBtn')
let decBtn = document.getElementById('decBtn')
let reset = document.querySelector('.reset-btn')
let toggleBtn = document.querySelector('.theme-toggle')
let count = 0

console.log(counterValue)
const updateDisplay = () => {
    counterValue.textContent = count
}
incBtn.addEventListener('click', () => {
    count++
    updateDisplay()
})
decBtn.addEventListener('click', () => {
    count--
    updateDisplay()
})
reset.addEventListener('click', () => {
    count = 0
    updateDisplay()
})
