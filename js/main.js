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

//Данные из ДЗ.//
const ADS_NEARBY_COUNT = 10;

const TITLES = [
  'Лучшее предложение в вашей жизни!',
  'Только сегодня и только для Вас!',
  'Быстрым скидки!',
  'Только кошачьим! С людьми нельзя',
  'Вы не пожалеете!',
];

const TYPES = [
  'palace',
  'flat',
  'house ',
  'bungalow',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Уютное жильё',
  'Лучший дом в вашей жизни',
  'Вы почувствуете себя как дома',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

//массив "ссылок" на avatar//
let avatarParths = [];
for (let i = 0; i < ADS_NEARBY_COUNT; i ++) {
  if (i < ADS_NEARBY_COUNT - 1){
    avatarParths[i] ='img/avatars/user' + '0' + (i +1) + '.png';
  } else {
    avatarParths[i] = 'img/avatars/user10.png';
  }
}

//создает массив строк "photos"//
const getPhotos = () => {
  const photos = [];
  for (let i = 0; i < getRandomInt(1,ADS_NEARBY_COUNT); i ++) {
    photos.push(getRandomArrayElement(PHOTOS));
  }
  return photos;
};

//создает массив строк "features"//
const getFeatures = () => {
  const features = [];
  for (let i = 0; i < getRandomInt(1,ADS_NEARBY_COUNT); i ++) {
    features.push(getRandomArrayElement(FEATURES));
  }
  const uniqueFeatures = features.filter((feature, index) => {
    return features.indexOf(feature) == index;
  });
  return uniqueFeatures;
};

//Создаёт "Объявление неподалёку"//
const createAdNearby = () => {
  const x = getRandonFloat(35.65000, 35.70000, 5);
  const y = getRandonFloat(139.70000 , 139.80000, 5);
  return {
    author : {
      avatar: avatarParths.shift(),
    },
    offer : {
      title : getRandomArrayElement(TITLES),
      address : x + ', ' + y,
      price : getRandomInt(100,999),
      type : getRandomArrayElement(TYPES),
      rooms : getRandomInt(1,10),
      guests : getRandomInt(1,30),
      checkin : getRandomArrayElement (CHECKINS),
      checkout : getRandomArrayElement(CHECKOUTS),
      features : getFeatures(),
      description : getRandomArrayElement(DESCRIPTIONS),
      photos : getPhotos(),

    },
    location : {
      x : x,
      y : y,
    },
  };
};

const AdsNearby = new Array(ADS_NEARBY_COUNT).fill(null).map( () => createAdNearby());
