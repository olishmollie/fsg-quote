class Route {
  constructor(props) {
    this.variables = [];
    this.regex = this.parse(props.href);
    this.component = props.component;
    this.params = props.params;
  }

  parse(href) {
    return new RegExp(
      href.replace(/:(\w+)/g, (_, name) => {
        this.variables.push(name);
        return "([^/?]+)";
      }) + "(?:\\?.*$|/$|$)"
    );
  }
}
