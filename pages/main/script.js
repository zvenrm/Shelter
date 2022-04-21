const burger = document.querySelector('.header-burger')
const burgerMenu = document.querySelector('.nav')
const logo = document.querySelector('.logo')
const navLink = document.querySelector('.nav-item')
const overlay = document.querySelector('.overlay')


function toggleMenu() {
    burgerMenu.classList.toggle('nav-open')
    logo.classList.toggle('logo-open')
    document.body.classList.toggle('body-hidden')
    overlay.classList.toggle('overlay-block')
}

burger.addEventListener('click', toggleMenu)
burgerMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')){
        toggleMenu()
    }
})
overlay.addEventListener('click', toggleMenu)
logo.addEventListener('click', toggleMenu)



