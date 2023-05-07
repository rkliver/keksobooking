const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
//Добавляем тип жилья "Отель"
const hotelOption = type.options[0].cloneNode(true);
hotelOption.innerText = 'Отель';
hotelOption.value = 'hotel';
type.insertBefore(hotelOption, type.options[2]);
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
