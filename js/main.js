const LIKES_MIN = 5;
const LIKES_MAX = 50;
const COMMENTS_MAX_COUNT = 5;
const PHOTOS_COUNT = 2; //25

const NAMES = [
  "Иван",
  "Хуан Себастьян",
  "Мария",
  "Кристоф",
  "Виктор",
  "Юлия",
  "Люпита",
  "Вашингтон",
];

const MESSAGES = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

const createIdGenerator = () => {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdGenerator (min, max) {
  const generatedValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (generatedValues.length >= (max - min + 1)) {
      console.log(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (generatedValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    generatedValues.push(currentValue);
    return currentValue;
  };
}

const getRandomCommentId = createRandomIdGenerator(1, 1000);
const getAvatarPath = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;
const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

const generateComment = () => {
  const id = getRandomCommentId();
  const avatar = getAvatarPath();
  const message = getRandomElement(MESSAGES);
  const name = getRandomElement(NAMES);
  return {
    id,
    avatar,
    message,
    name,
  };
};

const generatePhoto = () => {
  const comments = Array.from({ length: getRandomInteger(0, COMMENTS_MAX_COUNT) }, generateComment);
  console.dir(comments);
  return {
    comments,
  };
};

const generatePhotos = function () {
  return Array.from({ length: PHOTOS_COUNT }, generatePhoto);
};

console.dir(generatePhotos());

/*
В файле main.js напишите необходимые функции для создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.

Структура каждого объекта должна быть следующей:
id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
description, строка — описание фотографии. Описание придумайте самостоятельно.
likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}
У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.
Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
*/
