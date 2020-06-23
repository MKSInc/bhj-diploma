/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (err) console.log('CreateTransactionForm.renderAccountsList ошибка в запросе: ', err);
        else {
          if (!response.success) console.log('CreateTransactionForm.renderAccountsList response.error: ', response.error);
          else {
            if (response.data.length === 0)
              this.element.getElementsByClassName('accounts-select')[0].innerHTML = '';
            else {
              let accountsSelectHTML = '';
              response.data.forEach(account => accountsSelectHTML += `<option value="${account.id}">${account.name}</option>`);
              this.element.getElementsByClassName('accounts-select')[0].innerHTML = accountsSelectHTML;
          //  Устанавливает счет по умолчанию.
              if (App.getPage('transactions').lastOptions) {
                this.element.getElementsByClassName('accounts-select')[0]
                   .querySelector(`[value="${App.getPage('transactions').lastOptions.account_id}"]`)
                   .selected = true;
              } else this.element.getElementsByClassName('accounts-select')[0][0].selected = true;
            }
          }
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      if (err) console.log('Transaction.create ошибка в запросе: ', err);
      else {
        if (!response.success) console.log('CreateTransactionForm response.error: ', response.error);
        else {
          this.element.reset();
          if (this.element.id === 'new-income-form') App.getModal('newIncome').close();
          else if (this.element.id === 'new-expense-form') App.getModal('newExpense').close();
          App.update();
        }
      }
    });
  }
}
