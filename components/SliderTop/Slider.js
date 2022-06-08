import {data} from './data.js'
import Card from "./Card.js";
const template = '.top-slider-template'
const containerForSliderTop = document.querySelector('.reviews__slider')
const buttonBack =document.querySelector('.reviews__button_type_back')
const buttonNext =document.querySelector('.reviews__button_type_next')
const reviewsSlider = document.querySelector('.reviews__slider')

export function name() {
  data.map((e, i) => containerForSliderTop.append(Card(e, template, i)))
}
const dada = document.querySelector('.reviews__slider')
console.log(dada.clientWidth)
let coin = 0
let right = 0

function turnSlider() {
  right = 0
  reviewsSlider.style.right = `${right}px`
  let cardInFocus = document.querySelector(`li[number="0"]`)
  let cardsNoneFocus = document.querySelector(`li[number="${coin}"]`)
  cardInFocus.classList.remove('reviews_inactive')
  cardsNoneFocus.classList.add('reviews_inactive')
  coin = 0
}

function moveSliderBack() {
  right+= reviewsSlider.clientWidth
  if(coin === data.length-1){
    return turnSlider()
  }
  coin ++

  let cardInFocus = document.querySelector(`li[number="${coin}"]`)
  let cardsNoneFocus = document.querySelector(`li[number="${coin-1}"]`)
  cardInFocus.classList.remove('reviews_inactive')
  cardsNoneFocus.classList.add('reviews_inactive')
  reviewsSlider.style.right = `${right}px`
}

function moveSliderNext() {
  if(coin === 0){
    right = reviewsSlider.clientWidth * (data.length-1)
    coin = data.length-1
    let cardInFocus = document.querySelector(`li[number="${coin}"]`)
    let cardsNoneFocus = document.querySelector(`li[number="0"]`)
    cardInFocus.classList.remove('reviews_inactive')
    cardsNoneFocus.classList.add('reviews_inactive')
    reviewsSlider.style.right = `${right}px`
    return null
  }
  right-=reviewsSlider.clientWidth
  let cardInFocus = document.querySelector(`li[number="${coin}"]`)
  let cardsNoneFocus = document.querySelector(`li[number="${coin-1}"]`)
  cardInFocus.classList.add('reviews_inactive')
  cardsNoneFocus.classList.remove('reviews_inactive')
  reviewsSlider.style.right = `${right}px`
  coin --
}

// buttonBack.addEventListener('click', moveSliderBack)
buttonBack.addEventListener('click', moveSliderNext)
buttonNext.addEventListener('click', moveSliderBack)
