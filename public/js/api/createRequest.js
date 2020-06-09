/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
   let url = new URL(options.url, 'http://localhost:8000');
   let requestBody = null;

// При методе GET добавляем данные в адрес запроса.
   if (options.method === 'GET' && options.hasOwnProperty('data'))
       for (const key in options.data) url.searchParams.set(key, options.data[key]);
// При методе отличном от GET формируем тело запроса на основе FormData.
   else {
      const formData = new FormData();
      for (const key in options.data) formData.append(key, options.data[key]);
      requestBody = formData;
   }

   const xhr = new XMLHttpRequest();
   xhr.withCredentials = true;
   xhr.open(options.method, url);

// Устанавливаем заголовки, если есть.
   if (options.hasOwnProperty('headers'))
      for (const header in options.headers) xhr.setRequestHeader(header, options.headers[header]);

// Устанавливаем тип ответа запроса.
   if (options.hasOwnProperty('responseType')) xhr.responseType = options.responseType;

   xhr.addEventListener('readystatechange', () => {
      if (xhr.status !== 200) options.callback(new Error(`${xhr.status} ${xhr.statusText}`));
      if (xhr.readyState === xhr.DONE && xhr.status === 200) options.callback('', xhr.response);
   });

   xhr.send(requestBody);

};

createRequest({
   url: 'user/login',
//   headers: { // произвольные заголовки, могут отсутствовать
//      'Content-type': 'application/json'
//   },
   data: {
      mail: 'ivan@biz.pro',
      password: 'odinodin'
   },
   responseType: 'json',
   method: 'POST',
   callback: (err, response) => {
      if (err) console.log( 'Ошибка, если есть', err );
      else console.log( 'Данные, если нет ошибки', response );
   }
});

