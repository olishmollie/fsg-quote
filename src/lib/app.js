class App {
  constructor(opts) {
    this.root = opts.root;
    this.shirts = opts.shirts;
    this.router = opts.router;
    this.localStorage = opts.localStorage;

    this.quote = this.localStorage.getItem("quote")
      ? new Quote(this.localStorage.getItem("quote"))
      : new Quote();

    window.APP = this;
    this.router.load(window.location.hash);
  }
}
