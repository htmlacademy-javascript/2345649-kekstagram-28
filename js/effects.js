const imageUploadPreview = document.querySelector('.img-upload__preview > img');
const effectsContainer = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

const slider = document.querySelector('.effect-level__slider');
const sliderConfig = {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
  connect: 'lower',
};

const getEffectPreviewClass = (it) => `effects__preview--${it}`;
const effectNames = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];
const classNames = effectNames.map(getEffectPreviewClass);

const defaulEffect = new Effect('none');
defaulEffect.apply = () => {
  effectLevelContainer.hidden = true;
  imageUploadPreview.style = '';
  imageUploadPreview.classList.remove(...classNames);
};
defaulEffect.updateLevel = () => {};

const effects = {
  none: defaulEffect,
  chrome: new Effect('chrome', 0, 1, 0.1, 'grayscale'),
  sepia: new Effect('sepia', 0, 1, 0.1, 'sepia'),
  marvin: new Effect('marvin', 0, 100, 1, 'invert', '%'),
  phobos: new Effect('phobos', 0, 3, 0.1, 'blur', 'px'),
  heat: new Effect('heat', 1, 3, 0.1, 'brightness'),
};

let currentEffect = defaulEffect;
const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const effectName = evt.target.getAttribute('id').split('-')[1];
    currentEffect = effects[effectName];
    currentEffect.apply();
  }
};

function Effect(name, min, max, step, filter, filterUnit = '') {
  this.className = `effects__preview--${name}`;
  this.filter = filter;
  this.filterUnit = filterUnit;
  this.sliderOptions = {
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: max,
  };
}
Effect.prototype.apply = function () {
  effectLevelContainer.hidden = false;
  imageUploadPreview.style = '';
  imageUploadPreview.classList.remove(...classNames);
  imageUploadPreview.classList.add(this.className);
  slider.noUiSlider.updateOptions(this.sliderOptions);
};
Effect.prototype.updateLevel = function (level) {
  imageUploadPreview.style.filter = `${this.filter}(${level}${this.filterUnit})`;
};

export const resetEffects = () => {
  currentEffect = defaulEffect;
  currentEffect.apply();
};

export const initEffects = () => {
  currentEffect.apply();
  noUiSlider.create(slider, sliderConfig);
  slider.noUiSlider.on('update', () => {
    const currentEffectLevel = slider.noUiSlider.get();
    effectLevel.value = currentEffectLevel;
    currentEffect.updateLevel(currentEffectLevel);
  });
  effectsContainer.addEventListener('click', onEffectChange);
};
