// AJAX запрос данных об объявлениях неподалеку
const getData = (onSuccess, onError) => () => {
  return fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch(() => {
      onError();
    });
};
// отправляет данные объявления пользователя из формы на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        // Вы можете раскомментировать соедующие строки, чтобы увидеть отправленные данные:
        // for (let [key, value] of body) {
        //   console.log(`${key} - ${value}`)
        // }
      } else {
        onFail('Проверьте введённые данные.');
      }
    },

    )
    .catch((err) => {
      onFail(err.message);
    })
}
export{getData, sendData};
