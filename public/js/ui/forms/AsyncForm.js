/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) console.log('AsyncForm error: в конструктор не передан element');
    else {
      this.element = element;
      this.submit = this.submit.bind(this);
    }

  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * Добавлен сразу вызов метода submit() (без стрелочной функции), чтобы потом можно было удалить событие.
   * */
  registerEvents() {
    this.element.addEventListener('submit', this.submit);
  }

  /**
   * Добавлен метод unregisterEvents
   * Удаляет событие 'submit' формы после запроса или закрытия модального окна с этой формой.
   * */
  unregisterEvents() {
    this.element.removeEventListener('submit', this.submit);
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const formData = new FormData(this.element);
    const result = {};
    for (const [key, value] of formData) {
      result[key] = value;
    }

    return result;
  }

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit( e ) {
    e.preventDefault();
    this.onSubmit({data: this.getData()});
  }
}
