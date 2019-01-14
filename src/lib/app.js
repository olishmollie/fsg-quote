class App {
  constructor(props) {
    this.root = props.root;
    this.shirts = props.shirts;
    this.localStorage = props.localStorage;

    let quoteParams = this.localStorage.getItem("quote") || {};
    this.quote = new Quote(quoteParams);
  }

  start() {
    Component.mount(this.root, document.body);
    this.router.load(window.location.hash);
  }
}
