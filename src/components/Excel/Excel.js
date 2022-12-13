import { DomListener } from '@src/core/DomListener';

export class Excel {
  constructor(selector, options) {
    this.$container = DomListener.createDomInstance(selector);
    this.components = options.components || [];
  }

  getContent() {
    const $content = DomListener.createElement('div', 'excel');

    this.components = this.components.map((Component) => {
      const $componentContainer =
        DomListener.createElement('div', Component.className);

      const component = new Component($componentContainer);
      $componentContainer.html(component.toHTML());

      $content.append($componentContainer);

      return component;
    });

    return $content;
  }

  render() {
    this.$container.append(this.getContent());
    this.components.forEach((component) => component.init());
  }
};
