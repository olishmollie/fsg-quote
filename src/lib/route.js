class Route {
  constructor(opts) {
    this.variables = [];
    this.regex = this.parse(opts.href);
    this.component = opts.component;
    this.params = opts.params;
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
