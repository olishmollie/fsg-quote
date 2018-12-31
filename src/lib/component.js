class Component {
  constructor() {
    this.container = jsml.div({
      id: util.idName(this)
    });
  }

  render() {
    this.container.innerHTML = "";
    this.container.appendChild(this.render());
    return this.container;
  }
}
