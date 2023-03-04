function compareLength(string, length) {
  return string?.length <= length;
}

function isPalindrome(string) {
  const trimmedString = String(string).toLocaleLowerCase().replaceAll(' ', '');
  const reverseString = trimmedString.split('').reverse().join('');
  return trimmedString === reverseString;
}

function extractNumbers(string) {
  const trueString = String(string);
  let result = '';

  for(let i = 0; i < trueString.length; i++) {
    const char = parseInt(trueString.at(i), 10);
    if(!isNaN(char)) {
      result += char;
    }
  }

  if (!result) {
    result = Number.NaN;
  }

  return parseInt(result, 10);
}

function padStart(string, length, addedString) {
  const addCount = length - string.length;
  if (addCount <= 0) {
    return string;
  }

  const repeatCount = Math.floor(addCount / addedString.length);
  const endLength = addCount % addedString.length;
  return addedString.slice(0, endLength) + addedString.repeat(repeatCount) + string;
}

// Cтрока короче 20 символов
compareLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
compareLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
compareLength('проверяемая строка', 10); // false

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true

extractNumbers('2023 год'); // 2023
extractNumbers('ECMAScript 2022'); // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007'); // 7
extractNumbers('а я томат'); // NaN
extractNumbers(2023); // 2023
extractNumbers(-1); // 1
extractNumbers(1.5); // 15

// Добавочный символ использован один раз
padStart('1', 2, '0'); // '01'
// Добавочный символ использован три раза
padStart('1', 4, '0'); // '0001'
// Добавочные символы обрезаны с конца
padStart('q', 4, 'werty'); // 'werq'
// Добавочные символы использованы полтора раза
padStart('q', 4, 'we'); // 'wweq'
// Добавочные символы не использованы, исходная строка не изменена
padStart('qwerty', 4, '0'); // 'qwerty'
