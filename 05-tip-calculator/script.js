let cassetteInput = document.querySelector('.cassette-input')
let person = document.querySelector('.party-input')
let tipBtns = document.querySelector('.tip-buttons-grid')
let tipAmount = document.getElementById('tipResult')
let totalPerPerson = document.getElementById('totalResult')
let customTip = document.getElementById('customTip')
let calculateBtn = document.querySelector('.calc-button')
let defaultTipBtn = document.querySelector('.tip-btn')
let personStr = 1
let billAmount = 0
let tipAmountStr = 15

cassetteInput.addEventListener('input', () => {
    billAmount = cassetteInput.value
})
customTip.addEventListener('input', () => {
    tipAmountStr = customTip.value
})

person.addEventListener('input', () => {
    personStr = person.value
})

const calculateTip = (amount,tip,personStr) => {
    let totalTip = (amount * tip) / 100
    let totalTipPerson = totalTip/personStr
    tipAmount.textContent = `$${totalTip}`
    totalPerPerson.textContent = `$${totalTipPerson}`
}

tipBtns.addEventListener('click', (e) => {
    const btn = e.target.closest('.tip-btn')
    if(!btn) return
    const allTipBtn = document.querySelectorAll('.tip-btn')
    tipAmountStr = btn.dataset.tip
    allTipBtn.forEach(e => {
        e.classList.remove('active')
    })
    btn.classList.add('active')
})

calculateBtn.addEventListener('click', () => {
    calculateTip(billAmount,tipAmountStr,personStr)
})

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        calculateTip(billAmount,tipAmountStr,personStr)
        if (e.repeat) return;
        calculateBtn.classList.add('pressed');
    
        setTimeout(() => {
            calculateBtn.classList.remove('pressed');  // Doesn't affect :active
        }, 200);
    }
})