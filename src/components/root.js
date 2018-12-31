class Root {
  constructor() {
    this.container = jsml.div({
      id: "app",
      className: "container"
    });

    document.body.appendChild(this.render());
  }

  render() {
    return jsml.div({}, new Navbar().render(), this.container);
  }

  mount(component) {
    this.container.innerHTML = "";
    this.container.appendChild(component.render());
  }
}
