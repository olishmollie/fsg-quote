class Component {
  constructor(tag, attributes, ...args) {
    this.element = document.createElement(tag);
    for (let attr in attributes) {
      this.element[attr] = attributes[attr];
    }
    for (let i = 0; i < args.length; i++) {
      if (args[i] instanceof Component) {
        this.element.appendChild(args[i].element);
      } else if (args[i] instanceof HTMLElement) {
        this.element.appendChild(args[i]);
      }
    }
  }

  render(base) {
    base.appendChild(this.element);
  }

  get style() {
    return this.element.style;
  }

  static span(opts) {
    return new Component("span", opts);
  }

  static button(opts) {
    return new Component("button", opts);
  }

  static input(opts) {
    return new Component("input", opts);
  }

  static select(selections, selected, opts) {
    let select = new Component("select", opts);
    for (let i = 0; i < selections.length; i++) {
      let option = new Component("option", {
        innerText: selections[i],
        value: selections[i],
        selected: i === selected
      });
      select.element.appendChild(option.element);
    }
    return select;
  }

  static mount(component, mountPoint) {
    mountPoint.appendChild(component.render());
  }
}
