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
    if (element) this.element = element;
    else console.log('Modal error: в конструктор не передан element');
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
//  Как вызвать эти методы?
//  Если в обработчике событий метод onClose вызвать через стрелочную функцию, то методы будут видны,
//  но тогда эти события нельзя удалить.
    this.unregisterEvents(); // Не стработает, так как контекстом onClose будет нажатый элемент.
    this.close(); // Не сработает
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
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.removeProperty('display');
  }
}

