"use strict";

const body = document.querySelector('.page'),
      slider = body.querySelector('.slider'),
      leftArrowBtn = slider.querySelector('#left-arrow'),
      rightArrowBtn = slider.querySelector('#right-arrow'),
      sliderList = slider.querySelector('.slider__list'),
      sliderItems = Array.from(sliderList.querySelectorAll('.slider__item'));

const slide = document.querySelector('#slide');

//функции

function createSlide(author, text) {
  console.log('createSlide');
  const element = slide.content.querySelector('.slider__item').cloneNode(true);
  element.querySelector('.slider__signature').textContent = author;
  element.querySelector('.slider__text').textContent = text;
  element.classList.add('slider__item_is-visible');

  return element;
}

function fillSlideList() {
    console.log('fillSlideList');
    sliderList.innerHTML = '';
    fillWindow(sliderConfig.firsSlidePosition);
    sliderConfig.slidesWindow.forEach(item => {
      console.log(sliderConfig.slidesWindow);
      const element = createSlide(sliderConfig.slides[item].author, sliderConfig.slides[item].text);

      sliderList.append(element);
    });
}

// function fillStartWindow() { // сюда вместо нуля добавить позишн
//   console.log('fillStartWindow');
//   for (let i = 0; i < sliderConfig.slidesCount; i++) {
//     sliderConfig.slidesWindow.push(i);
//   }
// }

function fillWindow(firsSlidePosition) { // сюда вместо нуля добавить позишн
  console.log('filltWindow');
  sliderConfig.slidesWindow = [];
  for (let i = firsSlidePosition; i < sliderConfig.slidesCount; i++) {
    sliderConfig.slidesWindow.push(i);
  }
}

function countSlides() {
  console.log('counSlides');
  sliderConfig.slidesCount = (Math.floor(window.innerWidth / 420) < 4) ? Math.floor(window.innerWidth / 420) : 3;
}

// тут создаётся начальное кол-во слайдов
let slidesCount = (Math.floor(window.innerWidth / 420) < 4) ? Math.floor(window.innerWidth / 420) : 3;//   let result = условие ? значение1 : значение2;
let slidesWindow = []; // сюда положим индексы от нуля до размера окна
//slidesWindow.push() // надо придумать как положить туда индексы



const sliderConfig = {
  slidesCount: slidesCount,
  firsSlidePosition: 0,
  slides: [
    {
      author: 'Наталья Зайцева',
      text: 'Что-то похожее на эффект от мультфильмов типа «Сауз Парк» или про коня Боджэка возникает — я думаю, и пьеса написана с этой интонацией американских взрослых мультсериалов. И как хорошо все это с куклой-носочком. Так все чисто сделано!'
    },
    {
      author: 'Дина Годер',
      text: 'Для самой этой истории формат читки работает отличным ироническим отстранением'
    },
    {
      author: 'Дарья Морозова',
      text: 'Мне данный формат дал возможность самой выбирать, как двигается персонаж, что на нем надето, какую машину он водит, и что за плакат висит в подвале церкви. Это было приятно, ведь я как будто сама поучаствовала в спектакле'
    },
    {
      author: 'Наталья Зайцева',
      text: 'Что-то похожее на эффект от мультфильмов типа «Сауз Парк» или про коня Боджэка возникает — я думаю, и пьеса написана с этой интонацией американских взрослых мультсериалов. И как хорошо все это с куклой-носочком. Так все чисто сделано!'
    },
    {
      author: 'Дина Годер',
      text: 'Для самой этой истории формат читки работает отличным ироническим отстранением'
    },
    {
      author: 'Дарья Морозова',
      text: 'Мне данный формат дал возможность самой выбирать, как двигается персонаж, что на нем надето, какую машину он водит, и что за плакат висит в подвале церкви. Это было приятно, ведь я как будто сама поучаствовала в спектакле'
    }
  ],
 slidesWindow: [] //добавить состояние окна, чтобы слайдер не забывал какие именно слайды были отрисованы
};

// console.log(sliderConfig.slides[0].author);

window.addEventListener('resize',(evt) => {
  //countSlides();
  //sliderConfig.slidesCount = (Math.floor(window.innerWidth / 420) < 4) ? Math.floor(window.innerWidth / 420) : 3;

});

window.addEventListener('resize',(evt) => {

  if (window.innerWidth < 910 ) {
    sliderConfig.slidesCount = 1;
    fillSlideList();

  }
  if (window.innerWidth >= 910 && window.innerWidth <= 1329) {
    sliderConfig.slidesCount = 2;
    fillSlideList();
  }

  if (window.innerWidth >=1330) {
    sliderConfig.slidesCount = 3;

    fillSlideList();
  }
});



// console.log(sliderList.innerHTML);

// window.addEventListener('resize',(evt) => {  //показывает сколько сейчас слайдов помещается
//   console.log(sliderConfig.slidesCount);
// });

// fillStartWindow();
fillSlideList();


//обработчики

// rightArrowBtn.addEventListener('click', () => {
//   slideNext(sliderItems);
//   handleBtnState(rightArrowBtn);
//   activateBtn(leftArrowBtn);
// });

// leftArrowBtn.addEventListener('click', () => {
//   slidePrevious(sliderItems);
//   handleBtnState(leftArrowBtn);
//   activateBtn(rightArrowBtn);
// });

//функции

// function slideNext(arr) {

//   arr.some((item, idx) => {
//     if (item.classList.contains('slider__item_is-visible')) {

//       removeItemClass(item);
//       if (idx < (arr.length -1)) {
//         addItemClass(arr[idx + 1]);
//         return true;
//       }
//       // } else if (idx == (arr.length -1)) {
//       //   // addItemClass(arr[0]);
//       //   addItemClass(arr[0]);
//       //   return true;
//       // }

//     }
//   });
// }

// function slidePrevious(arr) {

//   arr.some((item, idx) => {
//     if (item.classList.contains('slider__item_is-visible')) {

//       removeItemClass(item);
//       if (idx < arr.length && idx > 0) {
//         addItemClass(arr[idx - 1]);
//         return true;
//       } else if (idx == 0) {
//         // addItemClass(arr[0]);
//         addItemClass(arr[arr.length -1]);
//         return true;
//       }

//     }
//   });
// }

// function removeItemClass(item) {
//   item.classList.remove('slider__item_is-visible');
// }

// function addItemClass(item) {
//   item.classList.add('slider__item_is-visible');
// }

// function handleBtnState(btn) {
//   sliderItems.forEach((item, idx, arr) => {
//     if (item.classList.contains('slider__item_is-visible')) {
//       if (idx === 0 || idx === (arr.length -1)) {
//         disableBtn(btn);
//       // } else {
//       //   activateBtn(btn);
//       }
//     } else {
//       activateBtn(btn);
//     }
//   });
// }

// function disableBtn(btn) {
//   btn.classList.add('slider__button_inactive');
//   btn.setAttribute('disabled', 'disabled');
// }

// function activateBtn(btn) {
//   btn.classList.remove('slider__button_inactive');
//   btn.removeAttribute('disabled');
// }
