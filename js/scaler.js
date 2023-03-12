import { Range } from './utils/range.js';

const imageUploadPreviewContainer = document.querySelector(
  '.img-upload__preview'
);
const scaleElement = document.querySelector('.scale__control--value');
const scaleIncrease = document.querySelector('.scale__control--bigger');
const scaleDecrease = document.querySelector('.scale__control--smaller');
let scale = new Range(25, 100, 25, 100);

const updateScale = () => {
  scaleElement.value = `${scale.value}%`;
  const scaleParam = parseFloat(scale.value / 100).toFixed(2);
  imageUploadPreviewContainer.style.transform = `scale(${scaleParam})`;
};

export const resetScale = () => {
  scale = new Range(25, 100, 25, 100);
  updateScale();
};

const onScaleIncreaseClick = () => {
  scale.increase();
  updateScale();
};

const onScaleDecreaseClick = () => {
  scale.decrease();
  updateScale();
};

export const initScaler = () => {
  scaleIncrease.addEventListener('click', onScaleIncreaseClick);
  scaleDecrease.addEventListener('click', onScaleDecreaseClick);
  updateScale();
};
