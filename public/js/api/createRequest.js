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

// Устанавливаем заголовки, если есть.
   if (options.hasOwnProperty('headers'))
      for (const header in options.headers) xhr.setRequestHeader(header, options.headers[header]);

// Устанавливаем тип ответа запроса.
   if (options.hasOwnProperty('responseType')) xhr.responseType = options.responseType;

   xhr.addEventListener('readystatechange', () => {
   // console.log(xhr.readyState, xhr.status, xhr.statusText);
   // До завершения запроса xhr.status выдает 0. Поэтому при xhr.readyState === 1 за ошибку это не учитывать.
      if (xhr.status !== 200 && xhr.readyState !== 1) {
         options.callback(new Error(`${xhr.status} ${xhr.statusText}`));
         return xhr;
      }
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
         options.callback('', xhr.response);
         return xhr;
      }
   });

   try {
      xhr.open(options.method, url);
      xhr.send(requestBody);
   } catch (err) {
      console.log('Ошибка запроса');
      options.callback(new Error(err));
   }
};
