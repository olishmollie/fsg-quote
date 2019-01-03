class App {
  constructor(opts) {
    this.root = opts.root;
    this.shirts = opts.shirts;
    this.router = opts.router;
    this.localStorage = opts.localStorage;

    this.flashContainer = new Flash();

    let quoteParams = this.localStorage.getItem("quote") || {};
    this.quote = new Quote(quoteParams);

    // make APP a global
    window.APP = this;

    // mount the root
    document.body.appendChild(this.root.render());

    this.router.load(window.location.hash);
  }

  flash(type, msg) {
    this.flashContainer.show(type, msg);
  }
}
