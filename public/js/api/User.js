/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */

  static URL = 'user';

  static setCurrent(user) {
    console.log('User.setCurrent run');
    localStorage['user'] = JSON.stringify({id: user.id, name: user.name});
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    console.log('User.unsetCurrent run');
    localStorage.removeItem('user');

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    console.log('User.current run');
    if (localStorage['user']) return JSON.parse(localStorage['user']);
    else return undefined;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    console.log('User.fetch run');
    return createRequest({
      url: this.URL + '/current',
      data: data,
      method: 'GET',
      responseType: 'json',
      callback: callback
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    console.log('User.login run');
    return createRequest({
      url: this.URL + '/login',
      data: data,
      method: 'POST',
      responseType: 'json',
      callback: callback
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    console.log('User.register run');
    return createRequest({
      url: this.URL + '/register',
      data: data,
      method: 'POST',
      responseType: 'json',
      callback: callback
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    console.log('User.logout run');
    return createRequest({
      url: this.URL + '/logout',
      data: data, // <------------------------------------------- Зачем data?
      method: 'POST',
      responseType: 'json',
      callback: callback
    })
  }
}

/*
User.register({
  name: 'MKS',
  email: 'demo3@demo3',
  password: 'demo3'
}, (err, response) => {
  if (err) console.log('User.register ошибка в запросе: ', err);
  else if (response.success) {User.setCurrent({id: response.user.id, name: response.user.name})}
    else console.log('User.register response.error: ', response.error);
});
*/
/*
User.login({
  email: 'demo2@demo2',
  password: 'demo2'
}, (err, response) => {
  if (err) console.log('User.login ошибка в запросе: ', err);
  else {
    console.log('User.login response:', response);
    if (response.success) User.setCurrent(response.user);
    else console.log('User.login response.error: ', response.error);
  }
});
*/
/*
User.fetch(JSON.parse(User.current()), (err, response) => {
  if (err) console.log('User.fetch ошибка в запросе: ', err);
  else {
    console.log('User.fetch response:', response);
    if (response.success) User.setCurrent(response.user);
    else {
      console.log('User.fetch response.error: ', response.error);
      User.unsetCurrent();
    }
  }
});
*/

/*
User.logout({
  email: 'demo2@demo2',
  password: 'demo2'
}, (err, response) => {
  if (err) console.log('User.logout ошибка в запросе: ', err);
  else if (response.success) { // <---------------------------------- Зачем нужен запрос?
    console.log(response);
    User.unsetCurrent();
  }
  else console.log('User.logout response.error: ', response.error);
});*/


