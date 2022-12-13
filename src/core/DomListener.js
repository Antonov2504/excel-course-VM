import { capitalize } from './utils';

function getMethodName(listener) {
  return 'on' + capitalize(listener);
};

class DomElement {
  constructor(selector) {
    this.$element = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  append(node) {
    let content = node;

    if (node instanceof DomElement) {
      content = node.$element;
    }

    if (Element.prototype.append) {
      this.$element.append(content);
    } else {
      this.$element.appendChild(content);
    }

    return this;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$element.insertAdjacentHTML('beforeend', html);
      return this;
    } else {
      return this.$element.outerHTML.trim();
    }
  }

  clear() {
    this.$element.innerHTML = '';
    return this;
  }

  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback);
  }
}

export class DomListener {
  static createElement(tagName, classList) {
    const $element = document.createElement(tagName);
    $element.classList.add(classList);

    return new DomElement($element);
  }

  static createDomInstance(selector) {
    return new DomElement(selector);
  }

  constructor(element, listeners = []) {
    if (!element) {
      throw new Error('No element provided to DomListener');
    }

    this.$element = element;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name}`);
      }

      this[method] = this[method].bind(this);

      this.$element.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      this.$element.off(listener, this[method]);
    });
  }
};
