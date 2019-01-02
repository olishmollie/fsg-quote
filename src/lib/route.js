class Route {
  constructor(opts) {
    this.href = opts.href;
    this.path = this.href
      .replace(":", "")
      .split("/")
      .slice(1);
    this.variables = [];
    this.params = {};
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

  resolve(path) {
    this.parseQuery(path);
    this.parseParams(path);
    return new this.component(this.params);
  }

  parseQuery(path) {
    let query = path.split("?")[1];
    if (query && query.length > 0) {
      query = query.split("=");
      for (let i = 0; i < query.length; i += 2) {
        this.params[query[i]] = query[i + 1];
      }
    }
  }

  parseParams(path) {
    // parse :params
    let match = path.match(this.regex);
    if (match) {
      match = match.slice(1); // get rid of matched string
      for (let i = 0; i < this.variables.length; i++) {
        this.params[this.variables[i]] = match[i];
      }
    }
  }
}
