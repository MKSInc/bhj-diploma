/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) console.log('Modal error: в конструктор не передан element');
    else {
      this.element = element;
  //  Чтобы реализовать удаление событий а так же вызов методов close и unregisterEvents в методе onClose
  //  приходиться использовать еще не пройденный встроенный метод bind.
      this.onClose = this.onClose.bind(this);
    }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const closeModalEls = this.element.querySelectorAll('[data-dismiss=modal]');
    for (const closeModalEl of closeModalEls) closeModalEl.addEventListener('click', this.onClose);
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    e.preventDefault();
    this.close();
  }

  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    const closeModalEls = this.element.querySelectorAll('[data-dismiss=modal]');
    for (const closeModalEl of closeModalEls) closeModalEl.removeEventListener('click', this.onClose);
  }

  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * Добавлена регистрация событий для модального окна.
   * Добавлена регистрация событий для формы модального окна.
   * */
  open() {
    this.element.style.display = 'block';
    this.registerEvents();
    App.getForm(this.getFormName()).registerEvents();
  }

  /**
   * Закрывает окно: удаляет CSS-свойство display
   * Добавлено удаление событий модального окна.
   * Добавлено удаление событий формы модального окна.
   * */
  close() {
    App.getForm(this.getFormName()).unregisterEvents();

    this.unregisterEvents();
    this.element.style.removeProperty('display');
  }

  /**
   * Добавлен метод getFormName()
   * Возвращает имя формы модального окна.
   * */
  getFormName() {
    switch (this.element.dataset.modalId) {
      case 'login': return 'login';
      case 'register': return 'register';
      case 'newAccount': return 'createAccount';
      case 'newIncome': return 'createIncome';
      case 'newExpense': return 'createExpense';
    }
  }
}
