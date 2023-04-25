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

export {ADS_NEARBY_COUNT, TITLES, TYPES, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOS, avatarParths};
