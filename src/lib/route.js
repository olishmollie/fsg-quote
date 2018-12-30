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
        return "([^/]+)";
      }) + "(?:/|$)"
    );
  }

  resolve(path) {
    let match = path.match(this.regex);
    if (match) {
      let params = {};
      match = match.slice(1); // get rid of matched string
      for (let i = 0; i < this.variables.length; i++) {
        params[this.variables[i]] = match[i];
      }
      return new this.component(params);
    }
    throw "could not resolve path: " + path;
  }
}
