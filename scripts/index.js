"use strict";

const body = document.querySelector('.page'),
      slider = body.querySelector('.slider'),
      leftArrowBtn = slider.querySelector('#left-arrow'),
      rightArrowBtn = slider.querySelector('#right-arrow'),
      sliderList = slider.querySelector('.slider__list'),
      sliderItems = Array.from(sliderList.querySelectorAll('.slider__item'));

const slide = document.querySelector('#slide');

function createSlide(author, text) {
  const element = slide.content.querySelector('.slider__item').cloneNode(true);
  element.querySelector('.slider__signature').textContent = author;
  element.querySelector('.slider__text').textContent = text;
  element.classList.add('slider__item_is-visible');

  return element;
}

function fillSlideList() {
    sliderConfig.slidesWindow.forEach(item => {
      const element = createSlide(sliderConfig.slides[item].author, sliderConfig.slides[item].text);
      console.log(item.author);
      console.log(item.text);
      sliderList.append(element);
    });
}

// тут создаётся начальное кол-во слайдов
let slidesCount = Math.floor(window.innerWidth / 420);
let slidesWindow = []; // сюда положим индексы от нуля до размера окна
//slidesWindow.push() // надо придумать как положить туда индексы

function fillStartWindow() {
  for (let i = 0; i < sliderConfig.slidesCount; i++) {
    sliderConfig.slidesWindow.push(i);
  }
}

const sliderConfig = {
  slidesCount: slidesCount,
  slides: [
    {
      author: 'Наталья Зайцева',
      text: 'Что-то похожее на&nbsp;эффект от&nbsp;мультфильмов типа &laquo;Сауз Парк&raquo; или про коня Боджэка возникает&nbsp;&mdash; я&nbsp;думаю, и&nbsp;пьеса написана с&nbsp;этой интонацией американских взрослых мультсериалов. И&nbsp;как хорошо все это с&nbsp;куклой-носочком. Так все чисто сделано!'
    },
    {
      author: 'Дина Годер',
      text: 'Для самой этой истории формат читки работает отличным ироническим отстранением'
    },
    {
      author: 'Дарья Морозова',
      text: 'Мне данный формат дал возможность самой выбирать, как двигается персонаж, что на&nbsp;нем надето, какую машину он&nbsp;водит, и&nbsp;что за&nbsp;плакат висит в&nbsp;подвале церкви. Это было приятно, ведь я&nbsp;как будто сама поучаствовала в&nbsp;спектакле'
    },
    {
      author: 'Наталья Зайцева',
      text: 'Что-то похожее на&nbsp;эффект от&nbsp;мультфильмов типа &laquo;Сауз Парк&raquo; или про коня Боджэка возникает&nbsp;&mdash; я&nbsp;думаю, и&nbsp;пьеса написана с&nbsp;этой интонацией американских взрослых мультсериалов. И&nbsp;как хорошо все это с&nbsp;куклой-носочком. Так все чисто сделано!'
    },
    {
      author: 'Дина Годер',
      text: 'Для самой этой истории формат читки работает отличным ироническим отстранением'
    },
    {
      author: 'Дарья Морозова',
      text: 'Мне данный формат дал возможность самой выбирать, как двигается персонаж, что на&nbsp;нем надето, какую машину он&nbsp;водит, и&nbsp;что за&nbsp;плакат висит в&nbsp;подвале церкви. Это было приятно, ведь я&nbsp;как будто сама поучаствовала в&nbsp;спектакле'
    }
  ],
 slidesWindow: [] //добавить состояние окна, чтобы слайдер не забывал какие именно слайды были отрисованы
};

// console.log(sliderConfig.slides[0].author);

window.addEventListener('resize',(evt) => {
  sliderConfig.slidesCount = Math.floor(evt.target.innerWidth / 420);

});



// window.addEventListener('resize',(evt) => {  //показывает сколько сейчас слайдов помещается
//   console.log(sliderConfig.slidesCount);
// });

fillStartWindow();
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
