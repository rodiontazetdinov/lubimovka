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

// sliderItems.forEach((item, idx, arr) => {
//   if (item.classList.contains('slider__item_is-visible')) {
//     item.classList.remove('slider__item_is-visible');
//     sliderItems[idx+1].classList.add('slider__item_is-visible');
//     console.log('removed');
//     debugger;
//   }
// });

rightArrowBtn.addEventListener('click', () => {
  slideNext(sliderItems);
});

function slideNext(arr) {

  arr.some((item, idx) => {
    if (item.classList.contains('slider__item_is-visible')) {

      removeItemClass(item);
      if (idx < (arr.length -1)) {
        addItemClass(arr[idx + 1])
        return true;
      } else if (idx == (arr.length -1)) {
        // addItemClass(arr[0]);
        addItemClass(arr[0]);
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
