const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const type = form.querySelector('#type');
const formAvatar = form.querySelector('#avatar');
const formAvatarPreview = form.querySelector('.ad-form-header__preview').querySelector('img');
const price = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
//Добавляем тип жилья "Отель"
const hotelOption = type.options[0].cloneNode(true);
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

formAvatar.addEventListener('input', () => {
  formAvatarPreview.src = formAvatar.value;
});

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
})

//Меняет минимальное значение и placeholder поля price
const minPriceChanger = (min) =>{
  price.placeholder = min;
  price.setAttribute('min', min);
  return price;
}
//Меняет время выезда
const timeOutChanger = (time) =>{
  for (let i = 0; i < timeOut.options.length; i ++) {
    if (timeOut.options[i].value == time){
      timeOut.options[i].selected = true;
    }
  }
  return timeOut
}
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
)
//При изменении пользователем времени заезда вызывает timeOutChanger и передает в него соответсвущее значение
timeIn.addEventListener('input', () => {
  let time = timeIn.selectedOptions[0].value;
  return timeOutChanger(time)
})
