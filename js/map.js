import {AdsNearby} from './popup-nearby.js';
import {adsNearbyList} from './popup-nearby.js'

/* global L:readonly */

const MAX_MARKERS_COUNT = 10;

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

mainMarker.on('moveend', (evt) => {
  let x = evt.target.getLatLng().lat;
  let y = evt.target.getLatLng().lng;
  const address = adForm.querySelector('#address');
  address.value = `${x.toFixed(5)}, ${y.toFixed(5)}`;
});

// Добавляем метки "похожих объявлений"
const nearbyMarkerIcon = L.icon({
  iconUrl: '/leaflet/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [52, 52],
});
for (let i = 0; i < MAX_MARKERS_COUNT; i++ ){
  const marker = L.marker({
    lat: AdsNearby[i].location.lat,
    lng: AdsNearby[i].location.lng,
  },
  {
    icon: nearbyMarkerIcon,
  });
  marker
    .addTo(map)
    .bindPopup(adsNearbyList.children[i]);
}
