const burger = document.querySelector('.header-burger')
const burgerMenu = document.querySelector('.nav')
const logo = document.querySelector('.logo')
const overlay = document.querySelector('.overlay')

const btnLeft = document.querySelector('.slider-left')
const btnRight = document.querySelector('.slider-right')
const slider = document.querySelector('.items')

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
const moveRight = () => {
    slider.classList.add("transition-right")
    btnLeft.removeEventListener("click", moveLeft)
    btnRight.removeEventListener("click", moveRight)
}

const moveLeft = () => {
    slider.classList.add("transition-left")
    btnLeft.removeEventListener("click", moveLeft)
    btnRight.removeEventListener("click", moveRight)
}

btnLeft.addEventListener("click", moveLeft)
btnRight.addEventListener("click", moveRight)


/*----------sliderEND----------*/