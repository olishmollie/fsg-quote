class Route {
  constructor(opts) {
    this.href = opts.href;
    this.path = this.href
      .replace(":", "")
      .split("/")
      .slice(1);
    this.variables = [];
    this.regex = this.parse(this.href);
    this.component = opts.component;
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
