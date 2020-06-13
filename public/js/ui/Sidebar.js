/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    document.getElementsByClassName('sidebar-toggle')[0].addEventListener('click', () => {
      const bodyEl = document.getElementsByTagName('body')[0];
      bodyEl.classList.toggle('sidebar-open');
      bodyEl.classList.toggle('sidebar-collapse');
    });

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
//  Нажатие на кнопку "Регистрация".
    document.getElementsByClassName('menu-item_register')[0].addEventListener('click', () => {
      const modalRegister = new Modal(App.getModal('register').element);
      modalRegister.open();
      modalRegister.registerEvents();

      const registerForm = new RegisterForm(document.getElementById('register-form'));
      registerForm.registerEvents();
    });

//  Нажатие на кнопку "Войти".
    document.getElementsByClassName('menu-item_login')[0].addEventListener('click', () => {
      const modalLogin = new Modal(App.getModal('login').element);
      modalLogin.open();
      modalLogin.registerEvents();

      const loginForm = new LoginForm(document.getElementById('login-form'));
      loginForm.registerEvents();
    });

//  Нажатие на кнопку "Выйти".
    document.getElementsByClassName('menu-item_logout')[0].addEventListener('click', () => {
      User.logout({}, (err, response) => {
        if (err) console.log('User.logout ошибка в запросе: ', err);
        else {
          if (response.success) { // <---------------------------------- Зачем нужен запрос?
            console.log(response);
            User.unsetCurrent();
            App.setState('init');
          }
          else console.log('User.logout response.error: ', response.error);
        }
      })
    });
  }

}
