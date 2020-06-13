/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.login(options.data, (err, response) => {
      if (err) console.log('User.login ошибка в запросе: ', err);
      else {
        if (response.success) {
          console.log(response);
          User.setCurrent(response.user);
          document.getElementById('login-form').reset();
          App.setState('user-logged');

          const modalLogin = new Modal(App.getModal('login').element);
          modalLogin.unregisterEvents();
          modalLogin.close();

        } else console.log('User.login response.error: ', response.error);
      }
    });
  }
}
