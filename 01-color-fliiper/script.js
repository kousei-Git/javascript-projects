const flipBtn = document.querySelector('.flip-btn')
const colorCode = document.getElementById('color-code')
const btnSimple = document.querySelector('.btn-simple')
const btnHex = document.querySelector('.btn-hex')
const toggleBtn = document.querySelector('toggle-btn')


const returnHexCode = () => {
    const str = "ABCDEF1234567890"
    let hexCode = '#'
    for (let i=1;i<=6;i++){
        hexCode += str[Math.floor(16*Math.random())]
    }
    return hexCode
}

let newColor = '#E63946'
let mode = 'hex'

flipBtn.addEventListener('click', () => {
    newColor = returnHexCode()
    document.documentElement.style.setProperty('--body-bg',newColor)
    displayColorCode(mode,newColor)
    saveThings(newColor,mode)
})

const displayColorCode = (mode,color) => {
    if (mode === 'simple')
        colorCode.textContent = ntc.name(color)[1]
    if (mode === 'hex')
        colorCode.textContent = color
}

btnHex.addEventListener('click',() => {
    colorCode.textContent = newColor
    mode = 'hex'
    saveThings(newColor,mode)
    addTranslation()
})

btnSimple.addEventListener('click',() => {
    colorCode.textContent = ntc.name(newColor)[1]
    mode = 'simple'
    saveThings(newColor,mode)
    addTranslation()
})

const addTranslation = () => {
    if(mode === 'hex'){
        btnSimple.classList.remove('active')
        btnHex.classList.add('active')
    }else{
        btnSimple.classList.add('active')
        btnHex.classList.remove('active')
    }
}

const saveThings = (color,mode) => {
    localStorage.setItem('color',color)
    localStorage.setItem('colorMode',mode)
    console.log(color,mode)
}

const getThings = () => {
    const localStorageColor = localStorage.getItem('color')
    const localStorageMode = localStorage.getItem('colorMode')
    console.log(localStorageColor,localStorageMode)
    return [localStorageColor,localStorageMode]
}

window.addEventListener('DOMContentLoaded',() => {
    const [savedColor,savedMode] =  getThings()
    if(savedColor,savedMode){
        document.documentElement.style.setProperty('--body-bg',savedColor)
        mode = savedMode
        newColor = savedColor
        displayColorCode(savedMode,savedColor)
        addTranslation()
    }
})