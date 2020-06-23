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
    const sidebarMenuEl = document.getElementsByClassName('menu-item_login')[0].closest('.sidebar-menu');

    sidebarMenuEl.addEventListener('click', event => {
      const target = event.target.closest('li');
  //  Нажатие на кнопку "Выйти".
      if (target.classList.contains('menu-item_logout')) {
        User.logout({}, (err, response) => {
          if (err) console.log('User.logout ошибка в запросе: ', err);
          else {
            if (response.success) {
              User.unsetCurrent();
              App.setState('init');
          //  Убираем информацию о последнем активном (выбранном) счете.
              App.getPage('transactions').lastOptions = undefined;
            }
            else console.log('User.logout response.error: ', response.error);
          }
        });
        return;

      } else if (target.classList.contains('menu-item')) {

    //  Если нажата кнопка "Войти".
        if (target.classList.contains('menu-item_login')) {
          App.getModal('login').open();

      //  Если нажата кнопка "Регистрация".
        } else if (target.classList.contains('menu-item_register')) {
          App.getModal('register').open();
        }
      }
    })
  }
}
