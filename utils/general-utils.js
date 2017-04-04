function firstLetterToUppercase(inputString) {
  return inputString[0].toUpperCase() + inputString.slice(1);
}

function fromLispToCamelCase(inputString) {
  const words = inputString.split('-');
  let result = words.splice(0, 1);
  for (let word of words) {
    result += firstLetterToUppercase(word);
  }
  return result;
}

function fromLispToUpperCamelCase(inputString) {
  return firstLetterToUppercase(fromLispToCamelCase(inputString));
}

module.exports = {
  firstLetterToUppercase,
  fromLispToCamelCase,
  fromLispToUpperCamelCase
};
