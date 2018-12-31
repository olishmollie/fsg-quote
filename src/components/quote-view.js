class QuoteView extends Component {
  constructor() {
    super();
    this.quote = APP.quote;
  }

  render() {
    return super.container(
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
