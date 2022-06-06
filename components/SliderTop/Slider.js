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

let coin = 0
let right = 747

function moveSliderBack() {
  let left = -right
  coin ++
  let cardInFocus = document.querySelector(`li[number="${coin}"]`)
  let cardsNoneFocus = document.querySelector(`li[number="${coin-1}"]`)
  cardInFocus.classList.remove('reviews_inactive')
  cardsNoneFocus.classList.add('reviews_inactive')
  reviewsSlider.style.right = `${right}px`
  reviewsSlider.style.left = `${left}px`
  right+=747
  console.log('back ' + right)
}
function moveSliderNext() {
  let left = right
  let cardInFocus = document.querySelector(`li[number="${coin}"]`)
  // right-=747
  let cardsNoneFocus = document.querySelector(`li[number="${coin-1}"]`)
  cardInFocus.classList.add('reviews_inactive')
  cardsNoneFocus.classList.remove('reviews_inactive')
  reviewsSlider.style.left = `${right}px`
  reviewsSlider.style.right = `${left}px`
  coin --

}

buttonBack.addEventListener('click', moveSliderBack)
buttonNext.addEventListener('click', moveSliderNext)
