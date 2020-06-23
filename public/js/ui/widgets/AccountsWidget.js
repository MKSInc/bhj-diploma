/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) console.log('AccountsWidget error: в конструктор не передан element');
    else {
      this.element = element;
      this.registerEvents();
      this.update();
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
//  console.log('AccountsWidget.registerEvents run');
    this.element.addEventListener('click', event => {
      const target = event.target.closest('li');

      if (target.classList.contains('header')) {
    //  Если нажата кнопка 'Новый счет'.
        if (event.target.closest('.pull-right')) {
          App.getModal('createAccount').open();
        }
      }
  //  Если нажато на один из аккаунтов.
      if (target.classList.contains('account')) this.onSelectAccount(target);
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
//  console.log('AccountsWidget.update run');
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (err) console.log('AccountsWidget.update ошибка в запросе: ', err);
        else {
          if (!response.success) console.log('AccountsWidget.update response.error: ', response.error);
          else {
        //  Если lastOptions пуст. Это может быть после Логина, Регистрации, Удаления счета, F5.
            if (!App.getPage('transactions').lastOptions) {
          //  Если счетов нет - нужно очистить список счетов и страницу.
              if (response.data.length === 0) {
                this.clear();
                App.getPage('transactions').clear();
                return;
              }
          //  Если счета есть - устанавливаем первый активным, обновляем список счетов и страницу.
              else {
                this.renderItem(response.data);
                this.onSelectAccount(this.element.getElementsByClassName('account')[0]);
                App.getPage('transactions').element.getElementsByClassName('remove-account')[0].disabled = false;
              }

        // Если lastOptions содержит id, значит произошло добавление счета, добавление/удаление транзакции.
            } else
            //  Если счетов нет.
                if (response.data.length === 0) {
                  console.log('Ошибка: Непредвиденная ситуация!');
                  return;
                }
            //  Если счета есть, нужно обновить список счетов и страницу.
                else {
                  this.renderItem(response.data);
                  this.onSelectAccount(this.element.querySelector(`[data-id="${App.getPage('transactions').lastOptions.account_id}"]`));
                  App.getPage('transactions').element.getElementsByClassName('remove-account')[0].disabled = false;
                }

          }
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountEl = this.element.getElementsByClassName('account');
    Array.from(accountEl).forEach(account => account.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Добавлено: запись id активного счета в lastOptions.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const activeAccountEl = this.element.getElementsByClassName('active')[0];

    if (activeAccountEl) {
      if (activeAccountEl === element) return;
      else activeAccountEl.classList.remove('active');
    }

    element.classList.add('active');
    App.getPage('transactions').lastOptions = {account_id: element.dataset.id};
    App.showPage('transactions', {account_id: element.dataset.id});

//  Для формы дохода/расхода устанавливает активный счет выбранным по умолчанию.
    let accountDefault = App.getForm('createIncome').element
       .getElementsByClassName('accounts-select')[0]
       .querySelector(`[value="${element.dataset.id}"]`);
    if (accountDefault) accountDefault.selected = true;

    accountDefault = App.getForm('createExpense').element
       .getElementsByClassName('accounts-select')[0]
       .querySelector(`[value="${element.dataset.id}"]`);
    if (accountDefault) accountDefault.selected = true;

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span>
          <span>${item.sum} руб.</span>
        </a>
      </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    let accountsHTML = '';
    for (const account of item) accountsHTML += this.getAccountHTML(account);
    this.clear();
    this.element.insertAdjacentHTML('beforeEnd', accountsHTML);
  }
}
