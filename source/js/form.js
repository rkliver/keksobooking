import {sendData} from './create-fetch.js';
import {mainMarker} from './map.js';
import {mapFilter, markerBuilder, map} from './map.js';
import {avatarPreview, photoPreview} from './file.js'

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const adFormReset = form.querySelector('.ad-form__reset');

const successMessageTemplate = document.querySelector('#success').content;
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessage = errorMessageTemplate.cloneNode(true);

form.appendChild(errorMessage);
form.querySelector('.error').classList.add('hidden');

form.appendChild(successMessage);
form.querySelector('.success').classList.add('hidden');

//условия валидации взяты из ТЗ:
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

//Добавляем тип жилья "Отель"
const hotelOption = type.options[0].cloneNode(true);
hotelOption.removeAttribute('selected');
hotelOption.innerText = 'Отель';
hotelOption.value = 'hotel';
type.insertBefore(hotelOption, type.options[2]);

//Валидируем поле "Заголовок" формы
title.addEventListener('input', () => {
  const valueLength = title.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
  } else if(valueLength > MAX_TITLE_LENGTH){
    title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

//Валидируем поле "Цена за ночь" в форме
price.addEventListener('input', () => {
  const priceValue = price.value
  if(priceValue > MAX_PRICE){
    price.setCustomValidity('Максимальное значение: 1000000');
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
});

//Устанавливаем зависимость полей количества комнат и количества гостей
capacity.addEventListener('input', () => {
  const roomInputNumber = roomNumber.selectedOptions[0].value;
  const capacityNumber = capacity.value;
  if(roomInputNumber < capacityNumber && roomInputNumber !== '100'){
    capacity.setCustomValidity('Количество гостей должно быть равным или меньшим, чем количество комнат');
  } else if(roomInputNumber === '100' && capacityNumber !== '0') {
    capacity.setCustomValidity('В 100 комнат не войдет ни одного гостя =(');
  }else if(roomInputNumber !== '100' && capacityNumber === '0') {
    capacity.setCustomValidity('Совсем без гостей будет грустно');
  }else {
    capacity.setCustomValidity('');
  }
  capacity.reportValidity();
});

//Меняет минимальное значение и placeholder поля price
const minPriceChanger = (min) =>{
  price.placeholder = min;
  price.setAttribute('min', min);
  return price;
};

//Меняет время въезда
const timeInChanger = (time) =>{
  for (let i = 0; i < timeIn.options.length; i ++) {
    if (timeIn.options[i].value == time){
      timeIn.options[i].selected = true;
    }
  }
  return timeIn
};

//Меняет время выезда
const timeOutChanger = (time) =>{
  for (let i = 0; i < timeOut.options.length; i ++) {
    if (timeOut.options[i].value == time){
      timeOut.options[i].selected = true;
    }
  }
  return timeOut
};

//Вызывает minPriceChanger и передает в него минимум стоимости, соответсвующий типу жилья
type.addEventListener('input', () => {
  const typeSelected = type.selectedOptions[0].value;
  let min = 0;
  switch (typeSelected) {
    case 'flat':
      min = 1000;
      break

    case 'hotel':
      min = 3000;
      break

    case 'house':
      min = 5000;
      break

    case 'palace':
      min = 10000;
      break
  }
  return minPriceChanger(min);
},
);

//При изменении пользователем времени заезда вызывает timeOutChanger и передает в него соответсвущее значение и наоборот
timeIn.addEventListener('input', () => {
  let time = timeIn.selectedOptions[0].value;
  return timeOutChanger(time)
})
timeOut.addEventListener('input', () => {
  let time = timeOut.selectedOptions[0].value;
  return timeInChanger(time)
})

const classListToggler = (selector, className) =>{
  form.querySelector(`.${selector}`).classList.toggle(`${className}`);
};

//обрабатыеваем полученные от пользователя данные и отправляем на сервер
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    //удачно
    () => {
      classListToggler('success', 'hidden');
      window.addEventListener('click', () => {
        form.querySelector('.success').classList.add('hidden');
      })
      window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc'){
          form.querySelector('.success').classList.add('hidden');
        }
      })
      form.reset();
      avatarPreview.src = 'img/muffin-grey.svg';
      photoPreview.textContent = '';
      mapFilter.reset();
      mainMarker._latlng.lat = 35.68950;
      mainMarker._latlng.lng = 139.6920;
      mainMarker.update();
      map.setView({
        lat: 35.6895,
        lng: 139.692,
      }, 14);
      markerBuilder();
    },
    //с ошибкой
    (err) => {
      if(err === 'Failed to fetch'){
        err = 'Сервис временно недоступен. Пожалуйста попробуйте ещё раз позже.';
      }
      form.querySelector('.error__message').append(`. ${err}`);
      classListToggler('error', 'hidden');
      form.querySelector('.error__button').addEventListener('click', () => {
        classListToggler('error', 'hidden');
      });
      window.addEventListener('click', () => {
        form.querySelector('.error__message').innerText = 'Ошибка размещения объявления';
        form.querySelector('.error').classList.add('hidden');
      })
      window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc'){
          form.querySelector('.error__message').innerText = 'Ошибка размещения объявления';
          form.querySelector('.error').classList.add('hidden');
        }
      });

    },
    new FormData(evt.target),
  );
});

//возвращаем метку и значения адреса в начльное положение при нажатии кнокпи очистить
adFormReset.addEventListener('click', (evt) =>{
  evt.preventDefault();
  form.reset();
  mapFilter.reset();
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.textContent = '';
  mainMarker._latlng.lat = 35.68950;
  mainMarker._latlng.lng = 139.6920;
  mainMarker.update();
  map.setView({
    lat: 35.6895,
    lng: 139.692,
  }, 14);
  markerBuilder();
})
