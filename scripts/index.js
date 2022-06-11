"use strict";

const body = document.querySelector('.page'),
      slider = body.querySelector('.slider'),
      leftArrowBtn = slider.querySelector('#left-arrow'),
      rightArrowBtn = slider.querySelector('#right-arrow'),
      sliderList = slider.querySelector('.slider__list'),
      sliderItems = Array.from(sliderList.querySelectorAll('.slider__item'));

// console.log(sliderItems);

const sliderCounter = 0;

//обработчики

rightArrowBtn.addEventListener('click', () => {
  slideNext(sliderItems);
  handleBtnState(rightArrowBtn);
  activateBtn(leftArrowBtn);
});

leftArrowBtn.addEventListener('click', () => {
  slidePrevious(sliderItems);
  handleBtnState(leftArrowBtn);
  activateBtn(rightArrowBtn);
});

//функции

function slideNext(arr) {

  arr.some((item, idx) => {
    if (item.classList.contains('slider__item_is-visible')) {

      removeItemClass(item);
      if (idx < (arr.length -1)) {
        addItemClass(arr[idx + 1]);
        return true;
      }
      // } else if (idx == (arr.length -1)) {
      //   // addItemClass(arr[0]);
      //   addItemClass(arr[0]);
      //   return true;
      // }

    }
  });
}

function slidePrevious(arr) {

  arr.some((item, idx) => {
    if (item.classList.contains('slider__item_is-visible')) {

      removeItemClass(item);
      if (idx < arr.length && idx > 0) {
        addItemClass(arr[idx - 1]);
        return true;
      } else if (idx == 0) {
        // addItemClass(arr[0]);
        addItemClass(arr[arr.length -1]);
        return true;
      }

    }
  });
}

function removeItemClass(item) {
  item.classList.remove('slider__item_is-visible');
}

function addItemClass(item) {
  item.classList.add('slider__item_is-visible');
}

function handleBtnState(btn) {
  sliderItems.forEach((item, idx, arr) => {
    if (item.classList.contains('slider__item_is-visible')) {
      if (idx === 0 || idx === (arr.length -1)) {
        disableBtn(btn);
      // } else {
      //   activateBtn(btn);
      }
    } else {
      activateBtn(btn);
    }
  });
}

function disableBtn(btn) {
  btn.classList.add('slider__button_inactive');
  btn.setAttribute('disabled', 'disabled');
}

function activateBtn(btn) {
  btn.classList.remove('slider__button_inactive');
  btn.removeAttribute('disabled');
}
