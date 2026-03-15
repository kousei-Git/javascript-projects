const API_LINK = 'https://icanhazdadjoke.com/'

let randomJokeBtn = document.getElementById('jokeBtn')
let jokeContainer = document.getElementById('jokeText')
let displayJokesHistory = document.getElementById('jokeHistory')
let historySection = document.querySelector('.history-column')
let copyBtn = document.querySelector('.btn-share')
let arr = []

async function getJokeApi(){
    const response = await fetch(API_LINK, {
        headers: {
            'Accept': 'application/json'
        }
    })
    const data = await response.json()
    updateData(data)
}

randomJokeBtn.addEventListener('click', () => {
    getJokeApi()    
})

function updateData(data){
    jokeContainer.textContent = data.joke
    if(arr.length >= 3){
        arr.pop()
    }
    arr.unshift(data.joke)
    saveJokes(arr)
    updateDisplay(arr)
}

function updateDisplay(arr){
    displayJokesHistory.innerHTML = ''
    if (!arr.length > 0 ) return
    historySection.style.display = 'block'
    arr.map(item => {
        displayJokesHistory.innerHTML += `
            <li class="history-item">
                ${item}
            </li>
        `
    })
}

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(jokeContainer.textContent)
})

function saveJokes(arr){
    localStorage.setItem('Array', JSON.stringify(arr))
}

function renderJokes(){
    const savedJokes = JSON.parse(localStorage.getItem('Array'))
    console.log(savedJokes)
    if(!savedJokes) return
    arr = savedJokes
    updateDisplay(arr)
    console.log(arr[0])
    jokeContainer.innerHTML = arr[0]
}

renderJokes()