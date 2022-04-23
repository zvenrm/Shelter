
const burger = document.querySelector('.header-burger')
const burgerMenu = document.querySelector('.nav')
const logo = document.querySelector('.logo')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')
const btnLeft = document.querySelector('.slider-left')
const btnRight = document.querySelector('.slider-right')
const slider = document.querySelector('.items')
let sliderCards = document.querySelectorAll('.slider-item')
const cardClose = document.querySelector('.card-close')
const itemLeft = document.querySelector('#item-left')
const itemRight = document.querySelector('#item-right')
const itemActive = document.querySelector('#item-active')

const cardImg = document.querySelector('.card-img')
const cardName = document.querySelector('.card-name')
const cardType = document.querySelector('.type')
const cardBreed = document.querySelector('.breed')
const cardText = document.querySelector('.card-text')
const cardAge = document.querySelector('#age')
const cardInoculations = document.querySelector('#inoculations')
const cardDiseases = document.querySelector('#diseases')
const cardParasites = document.querySelector('#parasites')

/*------предзагрузка картинок------*/


const images = new Array();
function preloadImages(images) {
    images.forEach((image, i) => {
        image = new Image();
        image.src = images[i];
    })
}
preloadImages([
    '../../assets/images/pets-jennifer.jpg',
    '../../assets/images/pets-sophia.jpg',
    '../../assets/images/pets-woody.jpg',
    '../../assets/images/pets-scarlett.jpg',
    '../../assets/images/pets-katrine.jpg',
    '../../assets/images/pets-timmy.jpg',
    '../../assets/images/pets-freddie.jpg',
    '../../assets/images/pets-charly.jpg']
)


/*------предзагрузка картинок КОНЕЦ------*/


const getData = async (url) => await ((await fetch(url)).json());
const pets = await getData('../../assets/pets.json');


let slideArr = []
while(slideArr.length < 3){
    let number = Math.floor(Math.random() * 8)
    if(!slideArr.includes(number)){
        slideArr.push(number)
    }
}

for (let i = 0; i < itemActive.children.length; i++){
    itemActive.children[i].children[0].src = pets[slideArr[i]].img
    itemActive.children[i].children[1].innerHTML = pets[slideArr[i]].name
}

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

/*----------slider----------*/
const updateSlideArr = () => {
    while(slideArr.length < 6){
        let number = Math.floor(Math.random() * 8)
        if(!slideArr.includes(number)){
            slideArr.push(number)
        }
    }
    slideArr.splice(0, 3)
    console.log(slideArr)
}

const createSliderItem = (item) => {
    updateSlideArr()
    item.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const card = createCardTemplate();
        const cardImg = document.createElement("img")
        cardImg.classList.add('item-img')
        cardImg.src = pets[slideArr[i]].img
        const cardTitle = document.createElement("h3")
        cardTitle.classList.add('slider-title')
        cardTitle.innerHTML = pets[slideArr[i]].name
        const cardButton = document.createElement("button")
        cardButton.classList.add('slider-btn')
        cardButton.innerHTML = 'Learn more'
        card.append(cardImg, cardTitle, cardButton)
        item.appendChild(card);
    }
}

const moveRight = () => {
    createSliderItem(itemRight)
    slider.classList.add("transition-right")
    btnLeft.removeEventListener("click", moveLeft)
    btnRight.removeEventListener("click", moveRight)
    sliderCards.forEach(elem => {
        elem.removeEventListener('click', cardsClick)
    })
}

const moveLeft = () => {
    createSliderItem(itemLeft)
    slider.classList.add("transition-left")
    btnLeft.removeEventListener("click", moveLeft)
    btnRight.removeEventListener("click", moveRight)
    sliderCards.forEach(elem => {
        elem.removeEventListener('click', cardsClick)
    })
}

const createCardTemplate = () => {
    const card = document.createElement("div");
    card.classList.add("slider-item");
    return card;
}

btnLeft.addEventListener("click", moveLeft)
btnRight.addEventListener("click", moveRight)

slider.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "move-left") {
        
        slider.classList.remove("transition-left");
        document.querySelector("#item-active").innerHTML = itemLeft.innerHTML;
    } else {
        slider.classList.remove("transition-right");
        document.querySelector("#item-active").innerHTML = itemRight.innerHTML;
    }
    btnLeft.addEventListener("click", moveLeft);
    btnRight.addEventListener("click", moveRight);
    sliderCards = document.querySelectorAll('.slider-item')
    sliderCards.forEach(elem => {
        elem.addEventListener('click', cardsClick)
    })
})


/*----------sliderEND----------*/

/*-------modal-----------------*/

/* const modalChange = () => {
    const currIndex = sliderCards.indexOf(elem)
    console.log(currIndex)
} */

const cardsClick = (e) => {
    const currIndex = Array.from(itemActive.children).indexOf(e.currentTarget)
    const currPet = pets[slideArr[currIndex]]
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

sliderCards.forEach((elem) => {
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

/*-------modal-END-------------*/

