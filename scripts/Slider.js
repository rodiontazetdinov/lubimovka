//импортируем нужные переменные
import {slide, leftArrowBtn, rightArrowBtn, sliderList} from './index.js';
export class Slider {
    //собираем слайдер
    constructor(sliderConfig) {
    this._sliderConfig = sliderConfig;
    }
    //из темплейта собираем карточку слайдера
    _createSlide(author, text) {
      const element = slide.content.querySelector('.slider__item').cloneNode(true);
      element.querySelector('.slider__signature').textContent = author;
      element.querySelector('.slider__text').textContent = text;

      return element;
    }
    //отображение начальных слайдов
    _fillStartSlideList() {
      this._sliderConfig.slides.forEach((item, idx) => {
        const element = this._createSlide(item.author,item.text);
        if (idx < this._sliderConfig.slidesCount) {
          element.classList.add('slider__item_is-visible');
        }
        sliderList.append(element);
      });
    }
    //анимация прокрутки
    _translateX(active) {
      switch (this._sliderConfig.directionIs) {
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
    //обратная анимация прокрутки
    _deTranslateX(item) {
      item.style.left = "";
      item.style.right = "";
      item.style.transform = "";
      item.style.transition = "";
    }

    _slideNext () {
      this._setFirstSlidePosition('forward');
      this._fillSliderWindow();
      this._fillSlideList();
      this._handleArrowsState();
    }

    _slidePrevious () {
      this._setFirstSlidePosition('back');
      this._fillSliderWindow();
      this._fillSlideList();
      this._handleArrowsState();
    }
    // проверка от какого слайда начинать рендерить карточки
    _setFirstSlidePosition (scenario) {
      switch (scenario) {
        case 'forward':
          if (this._stepForward() > this._sliderConfig.lastSlidePosition) {
            this._sliderConfig.firstSlidePosition = this._sliderConfig.lastSlidePosition + 1 - this._sliderConfig.slidesCount;
          } else {
            this._sliderConfig.firstSlidePosition += this._sliderConfig.slidesCount;
          }

          break;
        case 'back':
          if (this._stepBack() < 0) {
            this._sliderConfig.firstSlidePosition = 0;
          } else {
            this._sliderConfig.firstSlidePosition -= this._sliderConfig.slidesCount;
          }

          break;
        case 'update':
          if (this._sliderConfig.slidesCount > this._sliderConfig.slidesWindow.length) {
            this._setFirstSlidePosition('forward');
          } else if (this._sliderConfig.slidesCount < this._sliderConfig.slidesWindow.length) {
            this._setFirstSlidePosition('forward');
          }

          break;
        default:
          this._sliderConfig.firstSlidePosition = 0;
      }
    }
    //шорткат для шага вперед
    _stepForward() {
      return this._sliderConfig.firstSlidePosition + this._sliderConfig.slidesCount;
    }
    //шорткат для шага назад
    _stepBack() {
      return this._sliderConfig.firstSlidePosition - this._sliderConfig.slidesCount;
    }
    //проверка на необходимость деактивации кнопки
    _handleArrowsState() {
      if (this._sliderConfig.slidesWindow.indexOf(0) > -1) {
        this._disableBtn(leftArrowBtn);
        this._activateBtn(rightArrowBtn);
      } else if (this._sliderConfig.slidesWindow.indexOf(this._sliderConfig.lastSlidePosition) > -1) {
        this._disableBtn(rightArrowBtn);
        this._activateBtn(leftArrowBtn);
      } else {
        this._activateBtn(leftArrowBtn);
        this._activateBtn(rightArrowBtn);
      }
    }

    _disableBtn(btn) {
      btn.classList.add('slider__button_inactive');
      btn.setAttribute('disabled', 'disabled');
    }

    _activateBtn(btn) {
      btn.classList.remove('slider__button_inactive');
      btn.removeAttribute('disabled');
    }

    //обновление в конфиге индексов отображаемых слайдов
    _fillSliderWindow () {
      this._sliderConfig.slidesWindow = [];
      for (let i = this._sliderConfig.firstSlidePosition; i < (this._sliderConfig.firstSlidePosition + this._sliderConfig.slidesCount); i++) {
        this._sliderConfig.slidesWindow.push(i);
      }
    }

    _updateSliderWindow () {
      this._countSlides();
      this._fillSliderWindow();
      this._handleArrowsState();
    }

    //обновить кол-во слайдов при изменении разрешения
    _updateSlider () {
      this._handleArrowsState();
      this._updateSliderWindow();
      this._fillSlideList();
    }
    // обновление в конфиге кол-ва слайдов
    _countSlides() {
      if (window.innerWidth < 830) {
        this._sliderConfig.slidesCount = 1;
      } else if (window.innerWidth > 1260) {
        this._sliderConfig.slidesCount = 3;
      } else {
        this._sliderConfig.slidesCount = 2;
      }
    }
    // убрать со слайдов классы видимости
    _deactivateSlides(sliderItems) {
      sliderItems.forEach((slide, idx) => {
        if (slide.classList.contains('slider__item_is-visible')) {
          slide.classList.remove('slider__item_is-visible');
          this._deTranslateX(slide);
        }
      });
    }
    // добавить актуальным слайдам классы видимости
    _activateSlides(sliderItems) {
      sliderItems.forEach((slide, idx) => {
        if (this._sliderConfig.slidesWindow.indexOf(idx) > -1) {
          slide.classList.add('slider__item_is-visible');
          this._translateX(slide);
        }
      });
    }
    //заполнить слайдер слайдами
    _fillSlideList() {
      const sliderItems = Array.from(sliderList.querySelectorAll('.slider__item'));
      this._deactivateSlides(sliderItems);
      this._activateSlides(sliderItems);
    }
    //установить направление анимации
    _setDirection (directionIs) {
      this._sliderConfig.directionIs = directionIs;
    }

    _setEventListeners() {
      window.addEventListener('resize',(evt) => {
        this._updateSlider();
      });

      rightArrowBtn.addEventListener('click', () => {
        this._setDirection('right');
        this._slideNext();
      });

      leftArrowBtn.addEventListener('click', () => {
        this._setDirection('left');
        this._slidePrevious();
      });
    }
    // запустить работу слайдера
    renderSlider() {
      this._setEventListeners();
      this._countSlides();
      this._fillSliderWindow();
      this._fillStartSlideList();
      this._updateSlider();
    }
}
