import {popupBuilder} from './popup-nearby.js';
import {adsFilter} from './map-filter.js';

/* global L:readonly */
//максимальное ко-во меток "похожих обьявлений на карте" согласно ТЗ
const MAX_MARKERS_COUNT = 10;
const URL = 'https://26.javascript.pages.academy/keksobooking/data';

const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

//Функция переводит страницу в нактивное состояние
const inactivateState = (boolean) => {
  if (boolean !== true) {
    adForm.classList.add('ad-form--disabled');
    for(let i = 0; i < adForm.children.length; i ++){
      adForm.children[i].setAttribute('disabled', true);
    }
    mapFilter.classList.add('ad-form--disabled');
    for(let i = 0; i < mapFilter.children.length; i ++){
      mapFilter.children[i].setAttribute('disabled', true);
    }
  }
}

let mapIsInit = false;

//Отрисовывем карту
const map = L.map('map-canvas')
  .on('load', () =>{
    mapIsInit = true;
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 17);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Активируем форму
inactivateState(mapIsInit);

//Добавляем главную метку
const mainMarkerIcon = L.icon({
  iconUrl: '/leaflet/img/main-pin.svg',
  iconSize: [32, 48],
  iconAnchor: [16, 48],
});

const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);
mainMarker.addTo(map);
//передает координаты главного маркера в поле формы "адресс"
mainMarker.on('moveend', (evt) => {
  let x = evt.target.getLatLng().lat;
  let y = evt.target.getLatLng().lng;
  const address = adForm.querySelector('#address');
  address.value = `${x.toFixed(5)}, ${y.toFixed(5)}`;
});
//функция создает макеры "похожих обьявлений на карте" принимает ссылку на сервер с данными
const nearbyMarkerMaker = (URL) =>{
  return async () => {
    let adsNearby = await fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }else {
          alert('Ошибка HTTP: ' + response.status);
        }
      });
    let filtredAds = adsFilter(adsNearby);
    const nearbyMarkerIcon = L.icon({
      iconUrl: '/leaflet/img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [52, 52],
    });
    const popupList = popupBuilder(filtredAds);
    console.log(filtredAds)
    for (let i = 0; i < MAX_MARKERS_COUNT; i++ ){
      const marker = L.marker({
        lat: filtredAds[i].location.lat,
        lng: filtredAds[i].location.lng,
      },
      {
        icon: nearbyMarkerIcon,
      });
      mapFilter.addEventListener('change', () =>{
        popupList.querySelectorAll('.popup').forEach((element) => {element.remove()})
        map.removeLayer(marker);
      })
      marker
        .addTo(map)
        .bindPopup(popupList.children[i]);
    }
  }
}

window.addEventListener('load', nearbyMarkerMaker(URL))

mapFilter.addEventListener('input', nearbyMarkerMaker(URL))
