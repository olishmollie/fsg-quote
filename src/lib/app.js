class App {
  constructor(opts) {
    this.root = opts.root;
    this.quote = opts.quote;
    this.shirts = opts.shirts;
    this.router = opts.router;

    window.APP = this;
    this.router.load(window.location.hash);
  }
}
