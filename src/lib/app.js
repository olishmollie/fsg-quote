class App {
  constructor(props) {
    this.root = props.root;
    this.shirts = props.shirts;
    this.localStorage = props.localStorage;

    let quoteParams = this.localStorage.getItem("quote") || {};
    this.quote = new Quote(quoteParams);
  }

  start() {
    // mount the root
    document.body.appendChild(this.root.render());
    this.router.load(window.location.hash);
  }
}
