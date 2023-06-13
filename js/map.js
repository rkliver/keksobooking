import {getData} from './create-fetch.js';
import {createPopup} from './create-popup.js';
import {showAlert} from './util.js';
import {filterAds} from './map-filter.js';

/* global L:readonly */
/* global _:readonly */

const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

//Функция переводит страницу в нактивное состояние, если передать в нее что-то кроме true
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

//Отрисовывем карту
const map = L.map('map-canvas')
  .on('load', () =>{
    //при успешной загрузке карты активируем форму и фильтр карты
    inactivateState(true);
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Добавляем главную метку
const mainMarkerIcon = L.icon({
  iconUrl: '/leaflet/img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.68950,
    lng: 139.6920,
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
const markerBuilder = _.debounce(getData((adsNearby) => {
  let filtredAds = filterAds(adsNearby);
  const nearbyMarkerIcon = L.icon({
    iconUrl: '/leaflet/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [52, 52],
  });
  filtredAds.forEach((ad) => {
    {
      const marker = L.marker({
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        icon: nearbyMarkerIcon,
      });
      marker
        .addTo(map)
        .bindPopup(createPopup(ad));

      mapFilter.addEventListener('change', () =>{
        marker.remove();
      })
    }

  })
}, () => showAlert('Произошла ошибка при загрузке данных с сервера')), 500)

//отрисовывваем метки если все успешно загрузилось
window.addEventListener('load', () => {
  markerBuilder();
})
//меняем метки согласно значений фильтра
mapFilter.addEventListener('change', () =>{
  markerBuilder();
})


export {map, mainMarker, mapFilter, markerBuilder};
