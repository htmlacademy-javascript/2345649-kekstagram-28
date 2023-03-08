export const createIdGenerator = () => {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
};

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const createUniqueRandomIdGenerator = function (min, max) {
  const generatedValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (generatedValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }
    while (generatedValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    generatedValues.push(currentValue);
    return currentValue;
  };
};

export const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';
