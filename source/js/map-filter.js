const defaultValue = 'any';
const MAX_MARKERS_COUNT = 10;

const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElement = document.querySelector('#housing-features');

//фильтр типа жилья
const checkHousingType = (ad) => {
  if (housingTypeElement.value === defaultValue) {
    return true;
  }
  return ad.offer.type === housingTypeElement.value;
};

//фильтр цены за ночь
const checkHousingPrice = (ad) => {
  const priceFilterOptions = {
    'any': ad.offer.price,
    'middle': ad.offer.price > 10000 && ad.offer.price < 50000,
    'low': ad.offer.price < 10000,
    'high': ad.offer.price > 50000,
  };
  return priceFilterOptions[housingPriceElement.value];
};

//фильтр кол-ва комнат
const checkHousingRooms = (ad) => {
  if (housingRoomsElement.value === defaultValue) {
    return true;
  }
  return String(ad.offer.rooms) === housingRoomsElement.value;
};

// фильтр кол-ва гостей
const checkHousingGuests = (ad) => {
  if (housingGuestsElement.value === defaultValue) {
    return true;
  }
  return String(ad.offer.guests) === housingGuestsElement.value;
};

//фильтр доступных удобств
const checkHousingFeatures = (ad) => {
  const checkedFeatures = housingFeaturesElement.querySelectorAll('input:checked');
  const checkedList = [];
  checkedFeatures.forEach((input) => checkedList.push(input.value));
  if (checkedList.length === 0) {
    return true;
  }
  const offer = ad.offer;
  if (Object.keys(offer).includes('features')) {
    const offerFeatures = offer.features;
    return checkedList.every((feature) => offerFeatures.includes(feature));
  }
};

// функция, принимает объявление и фильтрует согласно выбранным параметрам. Возвращает массив отфильтрованных объявлений
const filterAds = (ads) => {
  const filteredAds = [];
  for (const ad of ads) {
    if (filteredAds.length >= MAX_MARKERS_COUNT) {
      break;
    }
    if (
      checkHousingType(ad)
      && checkHousingPrice(ad)
      && checkHousingRooms(ad)
      && checkHousingGuests(ad)
      && checkHousingFeatures(ad)
    ) {
      filteredAds.push(ad);
    }
  }
  return filteredAds;
};

export {filterAds};
