function firstLetterToUppercase(inputString) {
  return inputString[0].toUpperCase() + inputString.slice(1);
}

function fromLispToCamelCase(inputString) {
  const words = inputString.split('-');
  let result = words.splice(0, 1)[0];
  for (let word of words) {
    result += firstLetterToUppercase(word);
  }
  return result;
}

function fromLispToUpperCamelCase(inputString) {
  return firstLetterToUppercase(fromLispToCamelCase(inputString));
}

function fromLispToUpperCase(inputString) {
  return inputString.replace('-', '_').toUpperCase();
}

function fromLispToWords(inputString) {
  return inputString.replace('-', ' ');
}

function fromLispToFirstLetterUppercaseWords(inputString) {
  if (inputString === undefined || inputString === '') {
    return [];
  }
  return inputString.split('-').map(word => firstLetterToUppercase(word)).join(' ');
}

module.exports = {
  firstLetterToUppercase,
  fromLispToCamelCase,
  fromLispToUpperCamelCase,
  fromLispToUpperCase,
  fromLispToWords,
  fromLispToFirstLetterUppercaseWords
};
