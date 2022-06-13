import { data } from './data.js'
import Card from "./Card.js";
import Pagination from './Pagination.js';

const cardTemplate = '.top-slider-template'
const containerForSliderTop = document.querySelector('.reviews__slider')
const navigationWidth = document.querySelector('.reviews__head').offsetWidth
let containerForSliderTopPagination
const buttonBack = document.querySelector('.reviews__button_type_back')
const buttonNext = document.querySelector('.reviews__button_type_next')
const reviewsSlider = document.querySelector('.reviews__slider')


const paginationTemplate = '.top-slider-pagination-template'
if (reviewsSlider.clientWidth > 541) {
  containerForSliderTopPagination = document.querySelector('.reviews__pagination-radio')
  document.querySelector('.reviews__pagination-radio_min').style.display = 'none'
  console.log('11111');
} else {
  containerForSliderTopPagination = document.querySelector('.reviews__pagination-radio_min')
  document.querySelector('.reviews__pagination-radio_min').style.display = 'flex'
  console.log('2222222');
}

export function render() {
  data.map((e, i) => {
    containerForSliderTop.append(Card(e, cardTemplate, i))
    containerForSliderTopPagination.append(Pagination(paginationTemplate, i, handleChangePagination))
  })
}

let coin = 0
let right = 0

function handleChangePagination(e) {
  let rightCoin = +(e.target.getAttribute('paginate'))
  right = (reviewsSlider.clientWidth + 30) * rightCoin
  coin = rightCoin
  let cardInFocus = document.querySelector(`li[number="${coin}"]`)
  let paginateInFocus = document.querySelector(`li[paginate="${coin}"]`)
  reviewsSlider.style.right = `${right}px`
  const reviewsItems = document.querySelectorAll('.reviews__card')
  reviewsItems.forEach(el => el.classList.add('reviews_inactive'))
  const reviewsPaginationList = document.querySelectorAll('.reviews__item')
  reviewsPaginationList.forEach(el => el.classList.remove('reviews__item_active'))
  cardInFocus.classList.remove('reviews_inactive')
  paginateInFocus.classList.add('reviews__item_active')

  if (coin > 0 && coin < data.length - 1) {
    buttonBack.classList.remove('reviews__button_disabled')
    buttonNext.classList.remove('reviews__button_disabled')
  }

  if (coin === 0) {
    buttonBack.classList.add('reviews__button_disabled')
    buttonNext.classList.remove('reviews__button_disabled')
  }
  if (coin === data.length - 1) {
    buttonNext.classList.add('reviews__button_disabled')
    buttonBack.classList.remove('reviews__button_disabled')
  }
}


function stopSlider(e) {
  const buttonDisabled = e.target.closest('.reviews__button')
  buttonDisabled.classList.add('reviews__button_disabled')
}

function moveSliderNext(e) {
  if (buttonNext.classList.contains('reviews__button_disabled')) {
    return ''
  }
  right += reviewsSlider.clientWidth + 30
  coin === data.length - 2 ? stopSlider(e) : ''
  coin++
  let cardInFocus = document.querySelector(`li[number="${coin}"]`)
  let cardsNoneFocus = document.querySelector(`li[number="${coin - 1}"]`)


  let paginateInFocus = document.querySelector(`li[paginate="${coin - 1}"]`)
  let paginateNoneFocus = document.querySelector(`li[paginate="${coin}"]`)
  paginateInFocus.classList.remove('reviews__item_active')
  paginateNoneFocus.classList.add('reviews__item_active')

  cardInFocus.classList.remove('reviews_inactive')
  cardsNoneFocus.classList.add('reviews_inactive')

  reviewsSlider.style.right = `${right}px`
  buttonBack.classList.remove('reviews__button_disabled')
}

function moveSliderBack(e) {
  if (buttonBack.classList.contains('reviews__button_disabled')) {
    return ''
  }
  coin === 1 ? stopSlider(e) : ''
  right -= reviewsSlider.clientWidth + 30
  let cardInFocus = document.querySelector(`li[number="${coin}"]`)
  let cardsNoneFocus = document.querySelector(`li[number="${coin - 1}"]`)

  let paginateInFocus = document.querySelector(`li[paginate="${coin}"]`)
  let paginateNoneFocus = document.querySelector(`li[paginate="${coin - 1}"]`)

  paginateInFocus.classList.remove('reviews__item_active')
  paginateNoneFocus.classList.add('reviews__item_active')

  cardInFocus.classList.add('reviews_inactive')
  cardsNoneFocus.classList.remove('reviews_inactive')
  reviewsSlider.style.right = `${right}px`
  coin--
  buttonNext.classList.remove('reviews__button_disabled')
}



buttonBack.addEventListener('click', moveSliderBack)  //Слушатели на кнопки
buttonNext.addEventListener('click', moveSliderNext)  //Слушатели на кнопки
