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
        if (!response.success) console.log('User.login response.error: ', response.error);
        else {
          User.setCurrent(response.user);
          this.element.reset();
          App.setState('user-logged');
          App.getModal('login').close();
        }
      }
    });
  }
}
