/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(options.data, (err, response) => {
      if (err) console.log('User.register ошибка в запросе: ', err);
      else {
        if (response.success) {
          User.setCurrent(response.user);
          document.getElementById('register-form').reset();
          App.setState('user-logged');

          const modalRegister = new Modal(App.getModal('register').element);
          modalRegister.unregisterEvents();
          modalRegister.close();

        } else console.log('User.register response.error: ', response.error);
      }
    });
  }
}
