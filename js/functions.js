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
