import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor(element, options = {}) {
    super(element, options.listeners);

    this.name = options.name || '';
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }
};
