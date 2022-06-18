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

function fillStartSlideList() {
  sliderConfig.slides.forEach((item, idx) => {
    const element = createSlide(item.author,item.text);
    if (idx < sliderConfig.slidesCount) {
      element.classList.add('slider__item_is-visible');
    }
    sliderList.append(element);
  });
}

function translateX(active) {
  switch (sliderConfig.directionIs) {
    case 'right':
      active.style.left =  `${sliderList.offsetWidth}px`;
      active.style.transform = `translateX(-${sliderList.offsetWidth}px)`;
      active.style.transition = "transform 2s";
      break;
    case 'left':
      active.style.right =  `${sliderList.offsetWidth}px`;
      active.style.transform = `translateX(${sliderList.offsetWidth}px)`;
      active.style.transition = "transform 2s";
      break;
  }
}

function deTranslateX(item) {
  item.style.left = "";
  item.style.right = "";
  item.style.transform = "";
  item.style.transition = "";
}

function slideNext () {
  setFirstSlidePosition('forward');
  fillSliderWindow();
  fillSlideList();
  handleArrowsState();
}

function slidePrevious () {
  setFirstSlidePosition('back');
  fillSliderWindow();
  fillSlideList();
  handleArrowsState();
}

function setFirstSlidePosition (scenario) {
  switch (scenario) {
    case 'forward':
      if (stepForward() > sliderConfig.lastSlidePosition) {
        sliderConfig.firstSlidePosition = sliderConfig.lastSlidePosition + 1 - sliderConfig.slidesCount;
      } else {
        sliderConfig.firstSlidePosition += sliderConfig.slidesCount;
      }
      break;
    case 'back':
      if (stepBack() < 0) {
        sliderConfig.firstSlidePosition = 0;
      } else {
        sliderConfig.firstSlidePosition -= sliderConfig.slidesCount;
      }
      break;
    case 'update':
      if (sliderConfig.slidesCount > sliderConfig.slidesWindow.length) {
        setFirstSlidePosition('forward');
      } else if (sliderConfig.slidesCount < sliderConfig.slidesWindow.length) {
        setFirstSlidePosition('forward');
      }
      break;
    default:
      sliderConfig.firstSlidePosition = 0;
  }
}

function stepForward () {
  return sliderConfig.firstSlidePosition + sliderConfig.slidesCount;
}

function stepBack () {
  return sliderConfig.firstSlidePosition - sliderConfig.slidesCount;
}

function handleArrowsState () {
  console.log('handleArrowsState');
  if (sliderConfig.slidesWindow.indexOf(0) > -1) {
    console.log('index 0 есть');
    console.log(sliderConfig.slidesWindow.indexOf(0));
    disableBtn(leftArrowBtn);
    activateBtn(rightArrowBtn);
  } else if (sliderConfig.slidesWindow.indexOf(sliderConfig.lastSlidePosition) > -1) {
    console.log('index 5 есть');
    console.log(sliderConfig.slidesWindow.indexOf(sliderConfig.lastSlidePosition));
    disableBtn(rightArrowBtn);
    activateBtn(leftArrowBtn);
  } else {
    activateBtn(leftArrowBtn);
    activateBtn(rightArrowBtn);
  }
}

function disableBtn(btn) {
  btn.classList.add('slider__button_inactive');
  btn.setAttribute('disabled', 'disabled');
}
function activateBtn(btn) {
  btn.classList.remove('slider__button_inactive');
  btn.removeAttribute('disabled');
}

function updateSliderWindow () {
  countSlides();
  fillSliderWindow();
  handleArrowsState();
}

function countSlides() {
  sliderConfig.slidesCount = (Math.floor(sliderConfig.innerWidth / 420) < 4) ? Math.floor(window.innerWidth / 420) : 3;
}

function fillSliderWindow () {
  sliderConfig.slidesWindow = [];
  for (let i = sliderConfig.firstSlidePosition; i < (sliderConfig.firstSlidePosition + sliderConfig.slidesCount); i++) {
    sliderConfig.slidesWindow.push(i);
  }
}

function updateSlider () {
  handleArrowsState();
  updateSliderWindow();
  fillSlideList();

}

function countSlides() {

  if (window.innerWidth < 830) {
    sliderConfig.slidesCount = 1;
  } else if (window.innerWidth > 1260) {
    sliderConfig.slidesCount = 3;
  } else {
    sliderConfig.slidesCount = 2;
  }

}


function deactivateSlides(sliderItems) {
  sliderItems.forEach((slide, idx) => {
    if (slide.classList.contains('slider__item_is-visible')) {
      slide.classList.remove('slider__item_is-visible');
      deTranslateX(slide);
    }
  });
}

function activateSlides(sliderItems) {
  sliderItems.forEach((slide, idx) => {
    if (sliderConfig.slidesWindow.indexOf(idx) > -1) {
      slide.classList.add('slider__item_is-visible');
      translateX(slide);
    }
  });
}

function fillSlideList() {
  const sliderItems = Array.from(sliderList.querySelectorAll('.slider__item'));
  deactivateSlides(sliderItems);
  activateSlides(sliderItems);
}

const sliderConfig = {
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
});

function setDirection (directionIs) {
  sliderConfig.directionIs = directionIs;
}

rightArrowBtn.addEventListener('click', () => {
  setDirection('right');
  slideNext();
});

leftArrowBtn.addEventListener('click', () => {
  setDirection('left');
  slidePrevious();
});


//работа кода

countSlides();
fillSliderWindow();

fillStartSlideList();
updateSlider();
