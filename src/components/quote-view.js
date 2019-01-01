class QuoteView extends Component {
  constructor() {
    super();
    this.quote = new Quote(APP.localStorage.getItem("quote"));
  }

  render() {
    return super.render(
      "div",
      {},
      new QuoteItems({
        quote: this.quote,
        onchange: () => {
          console.log("something changed");
        }
      }).render()
    );
  }
}
