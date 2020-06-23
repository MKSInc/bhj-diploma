/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    Account.create(options.data, (err, response) => {
      if (err) console.log('Account.create ошибка в запросе: ', err);
      else {
        if (!response.success) console.log('CreateAccountForm response.error: ', response.error);
        else {
          this.element.reset();
          App.getModal('createAccount').close();
      //  Устанавливаем созданный счет активным (выбранным).
          App.getPage('transactions').lastOptions = {account_id: response.account.id};
          App.update();
        }
      }
    })
  }
}
