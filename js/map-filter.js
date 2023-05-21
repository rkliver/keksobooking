const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
// console.log(housingRooms.value)
const adsFilter = (adsNearby) => {
  let filtredAds = [];
  for (let i = 0; i < adsNearby.length; i ++){
    //фильтрация по типу жилья
    if (housingType.value === 'palace'){
      return filtredAds = adsNearby.filter(adNearby => adNearby.offer.type === 'palace');
    }
    if (housingType.value === 'flat'){
      return filtredAds = adsNearby.filter(adNearby => adNearby.offer.type === 'flat');
    }
    if (housingType.value === 'house'){
      return filtredAds = adsNearby.filter(adNearby => adNearby.offer.type === 'house');
    }
    if (housingType.value === 'bungalow'){
      return filtredAds = adsNearby.filter(adNearby => adNearby.offer.type === 'bungalow');
    }
    if (housingType.value === 'any') {
      return filtredAds = adsNearby;
    }
    // //фильтрация по цене
    // if (housingPrice.value === 'low'){
    //   return filtredAds = adsNearby.filter(adNearby => adNearby.offer.price < 10000);
    // }
    // if (housingPrice.value === 'middle'){
    //   return filtredAds = adsNearby.filter(adNearby => adNearby.offer.price < 50000 && adNearby.offer.price > 10000);
    // }
    // if (housingPrice.value === 'high'){
    //   return filtredAds = adsNearby.filter(adNearby => adNearby.offer.price > 50000);
    // }
    // if (housingPrice.value === 'any'){
    //   return filtredAds = adsNearby;
    // }
    // //фильтра кол-во комнат
    // if (housingRooms.value === '1'){
    //   return filtredAds = adsNearby.filter(adNearby => adNearby.offer.rooms === 1);
    // }
    // if (housingRooms.value === '2'){
    //   return filtredAds = adsNearby.filter(adNearby => adNearby.offer.rooms === 2);
    // }
    // if (housingRooms.value === '3'){
    //   return filtredAds = adsNearby.filter(adNearby => adNearby.offer.rooms === 3);
    // }
    // if (housingRooms.value === 'any'){
    //   return filtredAds = adsNearby;
    // }
  }
}
export {adsFilter};
