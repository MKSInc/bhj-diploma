/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) console.log('TransactionsWidget error: в конструктор не передан element');
    else {
      this.element = element;
      this.registerEvents();
    }

  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener('click', event => {
      if (event.target.closest('button').classList.contains('create-income-button')) App.getModal('newIncome').open();
      else if (event.target.closest('button').classList.contains('create-expense-button')) App.getModal('newExpense').open();
    });
  }
}
