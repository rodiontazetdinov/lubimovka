"use strict";

import { Slider } from './Slider.js';
import { sliderConfig } from './sliderConfig.js';

export const leftArrowBtn = document.querySelector('#left-arrow');
export const rightArrowBtn = document.querySelector('#right-arrow');
export const sliderList = document.querySelector('.slider__list');

export const slide = document.querySelector('#slide');

const slider = new Slider(sliderConfig);

slider.renderSlider();
