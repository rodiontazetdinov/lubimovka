import {data} from './data.js'
import Card from "./Card.js";
const template = '.top-slider-template'
const containerForSliderTop = document.querySelector('.reviews__slider')
const buttonBack =document.querySelector('.reviews__button_type_back')

export function name() {
  data.map((e, i) => containerForSliderTop.append(Card(e, template, i)))


}

function moveSlider(e) {
  let card = document.querySelector(`li[number='0']`)
  card.classList.add('reviews__action')
}

buttonBack.addEventListener('click', moveSlider)
