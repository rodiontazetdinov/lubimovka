"use strict";

const body = document.querySelector('.page'),
      slider = body.querySelector('.slider'),
      leftArrowBtn = slider.querySelector('#left-arrow'),
      rightArrowBtn = slider.querySelector('#right-arrow'),
      sliderList = slider.querySelector('.slider__list');

const slide = document.querySelector('#slide');


//функции

function createSlide(author, text) {
  const element = slide.content.querySelector('.slider__item').cloneNode(true);
  element.querySelector('.slider__signature').textContent = author;
  element.querySelector('.slider__text').textContent = text;

  return element;
}

function fillSlideList() {
  const sliderItems = Array.from(sliderList.querySelectorAll('.slider__item'));
  deactivateSlides(sliderItems);
  activateSlides(sliderItems);
  console.log(testConfig());
}

function deactivateSlides(sliderItems) {
  sliderItems.forEach((slide, idx) => {
    if (slide.classList.contains('slider__item_is-visible')) {
      slide.classList.remove('slider__item_is-visible');
      console.log(`deactivated ${idx}`);
    }
  });
}

function activateSlides(sliderItems) {
  sliderItems.forEach((slide, idx) => {
    if (sliderConfig.slidesWindow.indexOf(idx) > -1) {
      slide.classList.add('slider__item_is-visible');
      console.log(`activated ${idx}`);
    }
  });
}

function handleBtnState () {
  const firstSlide = 0;
  const lastSlide = sliderConfig.lastSlidePosition;
  sliderConfig.slidesWindow.forEach((item) => {
    if (item == firstSlide) {
      disableBtn(leftArrowBtn);
      activateBtn(rightArrowBtn);
    } else if (item == lastSlide) {
      disableBtn(rightArrowBtn);
      activateBtn(leftArrowBtn);
    }
  });
}

function testConfig() {
  console.log(`
  ---------------------------
  окно
  ${sliderConfig.slidesWindow}
  количество слайдов
  ${sliderConfig.slidesCount}
  первый слайд
  ${sliderConfig.firstSlidePosition}
  ---------------------------
  `);
}



function fillStartSlideList() {
  sliderConfig.slides.forEach((item, idx) => {
    const element = createSlide(item.author,item.text);
    if (idx < sliderConfig.slidesCount) {
      element.classList.add('slider__item_is-visible');
    }
    sliderList.append(element);
  });
}

function fillWindow(firstSlidePosition) {

  console.log(firstSlidePosition, 'первая позиция передали в fillWindow');
  //((sliderConfig.slidesWindow.indexOf(sliderConfig.lastSlidePosition) > -1) && ((sliderConfig.lastSlidePosition + 1) >= 0))

  // if (sliderConfig.slidesWindow.indexOf(sliderConfig.lastSlidePosition) > -1) {
  //   firstSlidePosition = (sliderConfig.lastSlidePosition + 1) - sliderConfig.slidesCount; //ЗАТЫК ВОТ ТУТ. Когда присутствует последняя карточка. Какое условие нужно поставить, чтобы ограничить срабатывание.
  //   console.log(firstSlidePosition, 'если последний слайд есть в окне, то первая позиция будет последняя минус кол-во слайдов');
 // } else
  if (firstSlidePosition - sliderConfig.slidesCount < 0) {
    firstSlidePosition = 0;
    console.log(firstSlidePosition, 'если последней позиции в окне нет, и первая позиция минус кол-во слайдов < 0, то первая позиция будет 0');
  }

  sliderConfig.slidesWindow = [];
  for (let i = firstSlidePosition; i < (firstSlidePosition + sliderConfig.slidesCount); i++) {
    console.log(firstSlidePosition, ' for позиция начала передачи в окно');
    sliderConfig.slidesWindow.push(i);
    console.log(i, 'for то что передается в окно');
  }

  handleBtnState();
  console.log('fillWindow');
}

function disableBtn(btn) {
  btn.classList.add('slider__button_inactive');
  btn.setAttribute('disabled', 'disabled');
}
function activateBtn(btn) {
  btn.classList.remove('slider__button_inactive');
  btn.removeAttribute('disabled');
}

function countSlides() {
  sliderConfig.slidesCount = (Math.floor(window.innerWidth / 420) < 4) ? Math.floor(window.innerWidth / 420) : 3;
}

function slideNext () {
  setFirstSlidePosition('back');
    if ((sliderConfig.firstSlidePosition + sliderConfig.slidesCount) <= 5) { //если в диапазоне до 5 включительно
      sliderConfig.firstSlidePosition += sliderConfig.slidesCount;
    } else if (sliderConfig.slidesWindow.indexOf(sliderConfig.lastSlidePosition) > -1) {
      sliderConfig.firstSlidePosition = (sliderConfig.lastSlidePosition + 1) - sliderConfig.slidesCount; //ЗАТЫК ВОТ ТУТ. Когда присутствует последняя карточка. Какое условие нужно поставить, чтобы ограничить срабатывание.
      console.log(sliderConfig.firstSlidePosition, 'если последний слайд есть в окне, то первая позиция будет последняя минус кол-во слайдов');
    }
    //sliderConfig.firstSlidePosition += sliderConfig.slidesCount;

    fillWindow(sliderConfig.firstSlidePosition);
    fillSlideList();


  //}
}

function slidePrevious () {
  setFirstSlidePosition('forward');
    if ((sliderConfig.firstSlidePosition - sliderConfig.slidesCount) >= 0) {
      console.log('if');
      sliderConfig.firstSlidePosition -= sliderConfig.slidesCount;
    } else if ((sliderConfig.firstSlidePosition - sliderConfig.slidesCount) < 0) {
      console.log('else if');
      sliderConfig.firstSlidePosition = 0;
    }

    //console.log('fillWindow');
    fillWindow(sliderConfig.firstSlidePosition);
    //console.log('fillSlideList');
    fillSlideList();
    //fillSlideList();

}

function updateSlider() {
  setFirstSlidePosition('update');
}

function setFirstSlidePosition (scenario) {
  // switch (scenario) {
  //   case 'forward':
  //     if (checkForward()) {

  //     } else {
  //       sliderConfig.firstSlidePosition += sliderConfig.slides;
  //     }
  //     break;
  //   case 'back':
  //     alert( 'В точку!' );
  //     break;
  //   case 'update':
  //     alert( 'Перебор' );
  //     break;
  //   default:
  //     alert( "Нет таких значений" );
  // }
}

function checkForward () {
  return sliderConfig.firstSlidePosition + sliderConfig.slides;
}

function checkBack () {
  return sliderConfig.firstSlidePosition - sliderConfig.slides;
}

let slidesCount = (Math.floor(window.innerWidth / 420) < 4) ? Math.floor(window.innerWidth / 420) : 3;//   let result = условие ? значение1 : значение2;

const sliderConfig = {
  slidesCount: slidesCount,
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
      author: 'Леонид Якубович',
      text: 'Те, кто играл, но в финал не вышел, вы получаете мои эксклюзивные кружечки. Таких нет в магазинах, только у меня. А вы, финалист, завидуйте!'
    },
    {
      author: 'Армин Арлерт',
      text: 'Ты никогда не перевернёшь ход вещей, если не готов пожертвовать всем'
    },
    {
      author: 'Иван Карамазов',
      text: 'Я спрашивал себя много раз: есть ли в мире такое отчаяние, чтобы победило во мне эту исступленную и неприличную может быть жажду жизни, и решил, что, кажется, нет такого'
    }
  ],
  firstSlidePosition: 0,
  lastSlidePosition: 5,
  slidesWindow: []
};

//обработчики

window.addEventListener('resize',(evt) => {
  updateSlider();
  // if (window.innerWidth < 910 ) {
  //   sliderConfig.slidesCount = 1;
  //   // countSlides();
  //   fillWindow(sliderConfig.firstSlidePosition);
  //   fillSlideList();

  // }
  // if (window.innerWidth >= 910 && window.innerWidth <= 1329) {
  //   sliderConfig.slidesCount = 2;
  //   // countSlides();
  //   fillWindow(sliderConfig.firstSlidePosition);
  //   fillSlideList();
  // }

  // if (window.innerWidth >=1330) {
    //sliderConfig.slidesCount = 3;
    countSlides();
    fillWindow(sliderConfig.firstSlidePosition);
    fillSlideList();
  //}
});

rightArrowBtn.addEventListener('click', () => {
  slideNext();
});

leftArrowBtn.addEventListener('click', () => {
  slidePrevious();
});

//работа кода


fillWindow(sliderConfig.firstSlidePosition);

fillStartSlideList();
