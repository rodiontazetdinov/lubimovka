'use strict';

const sliderConfig = {
  firstSlidePosition: 5,
  slidesCount: 3,
  slides: {a:1, b:2, c:3, d:4, e:5, f:6},
  lastSlidePosition: 5,
  slidesWindow: []
};

function testSlider() {
  setFirstSlidePosition('back');



  console.log(sliderConfig.firstSlidePosition);
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

testSlider();
