const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENTS_MAX_COUNT = 5;
const PHOTOS_COUNT = 25;

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Портрет человека в черно-белой гамме. На этой фотографии запечатлен неповторимый взгляд человека, который говорит о множестве переживаний и эмоций. Черно-белая гамма придает фото особую стилистику и глубину.',
  'Городской пейзаж с высоты птичьего полета. Вид на город сверху - это удивительное зрелище. В этой фотографии можно разглядеть все детали городского пейзажа и насладиться его красотой.',
  'Фото еды с топпингом и красивой подачей. Изысканное блюдо на этой фотографии выглядит как настоящее произведение искусства. Каждая деталь и способ подачи продуманы до мелочей, чтобы удовольствие от блюда началось еще до его пробования.',
  'Макро-снимок цветов в прекрасной россыпи. На этой фотографии запечатлены цветы в максимальном приближении, что позволяет насладиться их красотой и уникальными деталями. Яркие цвета и красивая композиция делают эту фотографию настоящим произведением искусства.',
  'Фотография дикой природы в далеком уголке мира. Эта фотография позволяет увидеть красоту дикой природы в ее первозданном виде. На ней запечатлены животные, птицы и пейзажи, которые не оставят никого равнодушным.',
  'Архитектурная композиция с использованием линий и форм. Эта фотография позволяет насладиться красотой и геометрией архитектурных форм. Линии, углы и пропорции в этой композиции создают уникальную эстетику и атмосферу.',
  'Пейзаж с закатом солнца и яркими красками. На этой фотографии запечатлены яркие цвета заката и красивый пейзаж. Это уникальное зрелище позволяет насладиться красотой природы и заката, который дарит нам незабываемые впечатления.',
  'Снимок животного в естественной среде обитания. На этой фотографии запечатлено животное в его естественной среде обитания. Это позволяет увидеть животных в их естественном поведении и насладиться их красотой и грацией.',
  'Фото интерьера с дизайном в скандинавском стиле. Эта фотография позволяет насладиться стилем и дизайном интерьера в скандинавском стиле. Яркие цвета, удобные формы и минимализм делают этот интерьер уютным и современным.',
  'Черно-белое фото с уличным граффити в качестве фона. На этой фотографии запечатлено уличное граффити в качестве фона. Черно-белая гамма делает фото особенным и запоминающимся, а граффити добавляет динамики и стиля.',
];

const createIdGenerator = () => {
  let lastId = 0;

  return function () {
    lastId += 1;
    return lastId;
  };
};

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
      throw(`Перебраны все числа из диапазона от ${min} до ${max}`);
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
const generateMessage = () => {
  const getRandomUniqueMessageId = createRandomIdGenerator(0, MESSAGES.length - 1);
  let message = '';
  for (let i = 1; i <= getRandomInteger(1, 2); i++){
    message = message.concat(MESSAGES[getRandomUniqueMessageId()], ' ');
  }
  return message.trimEnd();
};

const generateComment = () => {
  const id = getRandomCommentId();
  const avatar = getAvatarPath();
  const message = generateMessage();
  const name = getRandomElement(NAMES);
  return {
    id,
    avatar,
    message,
    name,
  };
};

const getPhotoId = createIdGenerator();
const getPhotoUrl = () => {
  const getRandomPhotoId = createRandomIdGenerator(1, 25);
  return `photos/${getRandomPhotoId()}.jpg`;
};

const generatePhoto = () => {
  const id = getPhotoId();
  const url = getPhotoUrl();
  const description = getRandomElement(DESCRIPTIONS);
  const likes = getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT);
  const comments = Array.from({ length: getRandomInteger(0, COMMENTS_MAX_COUNT) }, generateComment);
  return {
    id,
    url,
    description,
    likes,
    comments,
  };
};

const generatePhotos = function () {
  return Array.from({ length: PHOTOS_COUNT }, generatePhoto);
};

generatePhotos();
