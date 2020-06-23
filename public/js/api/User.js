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
//  console.log('User.setCurrent run');
    localStorage['user'] = JSON.stringify({id: user.id, name: user.name});
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
//  console.log('User.unsetCurrent run');
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
//  console.log('User.current run');
    if (localStorage['user']) return JSON.parse(localStorage['user']);
    else return undefined;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
//  console.log('User.fetch run');
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
//  console.log('User.login run');
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
//  console.log('User.register run');
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
   * data - пустой объект.
   * */
  static logout( data, callback = f => f ) {
//  console.log('User.logout run');
    return createRequest({
      url: this.URL + '/logout',
      data: data,
      method: 'POST',
      responseType: 'json',
      callback: callback
    })
  }
}
