class Root {
  constructor() {
    this.container = jsml.div({
      id: "app",
      className: "container"
    });

    document.body.appendChild(this.node());
  }

  node() {
    return jsml.div({}, new Navbar().node(), this.container);
  }

  mount(component) {
    this.container.innerHTML = "";
    this.container.appendChild(component.node());
  }
}
