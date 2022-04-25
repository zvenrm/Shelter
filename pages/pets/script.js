const burger = document.querySelector('.header-burger')
const burgerMenu = document.querySelector('.nav')
const logo = document.querySelector('.logo')
const overlay = document.querySelector('.overlay')
const cards = document.querySelector('.ourfriends-items')
const allCards = document.querySelectorAll('.ourfriends-item')
const paginationBtns = document.querySelector('.ourfriends-buttons')
const numberButton = document.querySelector('.number-button')
const leftBtns = document.querySelectorAll('.left-btns')
const rightBtns = document.querySelectorAll('.right-btns')

const modal = document.querySelector('.modal')
const cardClose = document.querySelector('.card-close')
const cardImg = document.querySelector('.card-img')
const cardName = document.querySelector('.card-name')
const cardType = document.querySelector('.type')
const cardBreed = document.querySelector('.breed')
const cardText = document.querySelector('.card-text')
const cardAge = document.querySelector('#age')
const cardInoculations = document.querySelector('#inoculations')
const cardDiseases = document.querySelector('#diseases')
const cardParasites = document.querySelector('#parasites')


const getData = async (url) => await ((await fetch(url)).json());
const pets = await getData('../../assets/pets.json');

/*----------бургер---------------*/

function toggleMenu() {
    burgerMenu.classList.toggle('nav-open')
    logo.classList.toggle('logo-open')
    document.body.classList.toggle('body-hidden')
    overlay.classList.toggle('overlay-block')
    burger.classList.toggle('burger-open')
}

burger.addEventListener('click', toggleMenu)
burgerMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')){
        toggleMenu()
    }
})
overlay.addEventListener('click', toggleMenu)
logo.addEventListener('click', toggleMenu)

/*----------бургер-конец--------------*/

/*--------------------------------------------------*/

/*-------------пагинация-------------------*/

const petsPack = [0, 1, 2, 3, 4, 5, 6, 7]

let commonArr = []

for(let i = 0; i < 6; i++){
    for(let j = 0; j < 8; j++){
        commonArr.push(petsPack[j])
    }
}

console.log(commonArr)

const screenWidth = window.innerWidth

const commonArraySlice = (elements, array) => {
    const arr = []
    for (let i = 0; i < array.length; i += elements) {
        arr.push(array.slice(i, i + elements))
    }
    return arr

}

const sortArr = arr => {
    for(let i = 0; i < arr.length; i++){
        arr[i] = arr[i].sort(()=>Math.random()-0.5)
    }
}

const createStartTemplate = n => {
    for (let i = 0; i < n; i++){
        cards.children[i].children[0].src = pets[commonArr[0][i]].img
        cards.children[i].children[1].innerHTML = pets[commonArr[0][i]].name
    }
}

let pagesCnt
let cardsCnt

if (screenWidth >= 1280){
    commonArr = commonArraySlice(8, commonArr)
    sortArr(commonArr)
    console.log(commonArr)
    cardsCnt = 8
    createStartTemplate(cardsCnt)
    pagesCnt = 6
}
else if (screenWidth >= 768 && screenWidth < 1279){
    commonArr = commonArraySlice(6, commonArr).sort(()=>Math.random()-0.5)
    sortArr(commonArr)
    cardsCnt = 6
    createStartTemplate(cardsCnt)
    console.log(commonArr)
    pagesCnt = 8
}
else if (screenWidth < 768){
    commonArr = commonArraySlice(3, commonArr).sort(()=>Math.random()-0.5)
    sortArr(commonArr)
    cardsCnt = 3
    createStartTemplate(cardsCnt)
    console.log(commonArr)
    pagesCnt = 16
}

const leftClassesChange = () => {
    if(numberButton.textContent === '1'){
        rightBtns.forEach(el => {
            el.classList.remove('non-active')
        })
        leftBtns.forEach(el => {
            el.classList.add('non-active')
        })
    }
}

const rightClassesChange = () => {
    if(numberButton.textContent === String(pagesCnt)){
        leftBtns.forEach(el => {
            el.classList.remove('non-active')
        })
        rightBtns.forEach(el => {
            el.classList.add('non-active')
        })
    }
}


const animation = () => {
    allCards.forEach((e) => {
        e.classList.add('blur-in')
    })
}

paginationBtns.addEventListener('click', (e) => {
    if(!e.target.classList.contains('non-active') && e.target.textContent === '>'){
        animation()
        numberButton.innerHTML = +numberButton.textContent + 1
        leftBtns.forEach(el => {
            el.classList.remove('non-active')
        })
        rightClassesChange()
    }
    else if(!e.target.classList.contains('non-active') && e.target.textContent === '>>'){
        animation()
        numberButton.innerHTML = commonArr.length
        rightClassesChange()
    }
    else if(!e.target.classList.contains('non-active') && e.target.textContent === '<'){
        animation()
        numberButton.innerHTML = +numberButton.textContent - 1
        rightBtns.forEach(el => {
            el.classList.remove('non-active')
        })
        leftClassesChange()
    }
    else if(!e.target.classList.contains('non-active') && e.target.textContent === '<<'){
        animation()
        numberButton.innerHTML = '1'
        rightBtns.forEach(el => {
            el.classList.remove('non-active')
        })
        leftClassesChange()
    }
})

allCards.forEach(e => {
    e.addEventListener("animationend", (animationEvent) => {
        if (animationEvent.animationName === "blur-in") {
            for(let i = 0; i < cardsCnt; i++){
                allCards[i].children[0].src = pets[commonArr[+numberButton.textContent - 1][i]].img
                allCards[i].children[1].innerHTML = pets[commonArr[+numberButton.textContent - 1][i]].name
            }
            e.classList.remove('blur-in')
            e.classList.add('blur-out')
        } else {
            e.classList.remove('blur-out')
        }
    })
})

/*-------------пагинация-конец------------*/

/*--------------------------------------------------------*/

/*-------------modal------------*/

const cardsClick = (e) => {
    const currIndex = Array.from(allCards).indexOf(e.currentTarget)
    const currPet = pets[commonArr[+numberButton.textContent - 1][currIndex]]
    cardImg.style.backgroundImage = `url(${currPet.img})`
    cardName.innerHTML = currPet.name
    cardType.innerHTML = currPet.type
    cardBreed.innerHTML = currPet.breed
    cardText.innerHTML = currPet.description
    cardAge.innerHTML = currPet.age
    cardInoculations.innerHTML = currPet.inoculations
    cardDiseases.innerHTML = currPet.diseases
    cardParasites.innerHTML = currPet.parasites
    modal.classList.add('modal-block')
    document.body.classList.add('body-hidden')
}

allCards.forEach((elem) => {
    elem.addEventListener('click', cardsClick)
})

cardClose.addEventListener('click', () => {
    modal.classList.remove('modal-block')
    document.body.classList.remove('body-hidden')
})

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')){
        modal.classList.remove('modal-block')
        document.body.classList.remove('body-hidden')
    }
})
modal.addEventListener('mouseover', e => {
    if (e.target.classList.contains('modal')){
        cardClose.classList.add('close-hover')
    }
    else{
        cardClose.classList.remove('close-hover')
    }
})

/*-------------modal-END-----------*/