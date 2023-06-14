const AdsNearbyTemplate = document.querySelector('#card').content.querySelector('.popup');

//функция принимает данные объявления и возвращает HTML элемент для отображения в качестве popup
const createPopup = (adNearby) => {
  const adsNearbyListElement = AdsNearbyTemplate.cloneNode(true);

  adsNearbyListElement.querySelector('.popup__title').textContent = adNearby.offer.title;

  adsNearbyListElement.querySelector('.popup__text--address').textContent = adNearby.offer.address;

  adsNearbyListElement.querySelector('.popup__text--price').textContent = adNearby.offer.price + ' ₽/ночь';

  switch(adNearby.offer.type){
    case 'flat':
      adsNearbyListElement.querySelector('.popup__type').textContent = 'Квартира';
      break
    case 'bungalow':
      adsNearbyListElement.querySelector('.popup__type').textContent = 'Бунгало';
      break
    case 'house':
      adsNearbyListElement.querySelector('.popup__type').textContent = 'Дом';
      break
    case 'palace':
      adsNearbyListElement.querySelector('.popup__type').textContent = 'Дворец';
      break
  }
  adsNearbyListElement.querySelector('.popup__text--capacity').textContent = 'Количество комнат: ' + adNearby.offer.rooms  + ' для ' + adNearby.offer.guests + ' гостей';

  adsNearbyListElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adNearby.offer.checkin + ', выезд до ' + adNearby.offer.checkout;

  adsNearbyListElement.querySelector('.popup__features').querySelectorAll('.popup__feature').forEach((element) => {element.remove()});
  if (adNearby.offer.features !== undefined){
    for (let i = 0; i < adNearby.offer.features.length; i++){
      let featureOne = document.createElement('li');
      featureOne.textContent = adNearby.offer.features[i];
      featureOne.classList.add('popup__feature','popup__feature--' + adNearby.offer.features[i]);
      adsNearbyListElement.querySelector('.popup__features').appendChild(featureOne);}
  }

  adsNearbyListElement.querySelector('.popup__description').textContent = adNearby.offer.description;

  adsNearbyListElement.querySelector('.popup__photos').querySelectorAll('.popup__photo').forEach((element) => {element.remove()});
  if (adNearby.offer.photos !== undefined){
    for (let i = 0; i < adNearby.offer.photos.length; i++){
      let photoOne = document.createElement('img');
      photoOne.src = adNearby.offer.photos[i];
      photoOne.classList.add('popup__photo');
      photoOne.width = '45';
      photoOne.height = '40';
      photoOne.alt = 'Фотография жилья';
      adsNearbyListElement.querySelector('.popup__photos').appendChild(photoOne);}
  }

  adsNearbyListElement.querySelector('.popup__avatar').src = adNearby.author.avatar;

  for (let i = 1; i < adsNearbyListElement.children.length; i++){
    if (adsNearbyListElement.children[i].textContent === ''){
      adsNearbyListElement.children[i].classList.add('hidden');
    }
  }

  return adsNearbyListElement;
}
export {createPopup};
