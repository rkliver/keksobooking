import {ADS_NEARBY_COUNT, TITLES, TYPES, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOS} from './data.js';
import {getRandomInt, getRandonFloat, getRandomArrayElement} from './util.js';

//создает массив строк "photos"//
const getPhotos = () => {
  const photos = [];
  for (let i = 0; i < getRandomInt(1,ADS_NEARBY_COUNT); i ++) {
    photos.push(getRandomArrayElement(PHOTOS));
  }
  const uniquePhotos = photos.filter((photo, index) => {
    return photos.indexOf(photo) == index;})
  return uniquePhotos;
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


//Массив "ссылок" на avatar//
let avatarParths = [];
for (let i = 0; i < ADS_NEARBY_COUNT; i ++) {
  if (i < ADS_NEARBY_COUNT - 1){
    avatarParths[i] ='img/avatars/user' + '0' + (i +1) + '.png';
  } else {
    avatarParths[i] = 'img/avatars/user10.png';
  }
}


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

export {AdsNearby};
