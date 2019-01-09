class PickAShirt extends Component {
  constructor() {
    super();
    this.shirtViews = APP.shirts.map(shirt => {
      return new ShirtView({
        shirt: shirt
      });
    });
  }

  render() {
    return super.render(
      jsml.div(
        {
          className: "d-flex justify-content-center text-center"
        },
        jsml.div({}, ...this.shirtViews.map(x => x.render()))
      )
    );
  }
}
