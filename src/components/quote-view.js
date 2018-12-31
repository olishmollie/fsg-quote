class QuoteView extends Component {
  constructor() {
    super();
    this.quote = APP.quote;
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
