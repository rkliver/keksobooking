//Функция, возвращающая случайное целое число из переданного диапазона включительно. //
const getRandomInt = (min,max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max < 0){
    return -1;
  }
  if (max < min){
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.//
const getRandonFloat = (min, max, decimals) => {
  if (min < 0 || max < 0){
    return -1;
  }
  if (max < min){
    [min, max] = [max, min];
  }
  const i = (Math.random() * (max - min) + min).toFixed(decimals)
  return Number(i);
};

//Функция, возвращающая случайный элемент массива.//
const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

export {getRandomInt, getRandonFloat, getRandomArrayElement}