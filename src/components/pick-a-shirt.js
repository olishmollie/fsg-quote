class PickAShirt {
  constructor() {
    this.shirtViews = app.shirts.map(shirt => {
      return new ShirtView({
        shirt: shirt
      });
    });
  }

  render() {
    return jsml.div(
      {
        className: "pick-a-shirt d-flex justify-content-center text-center"
      },
      jsml.div({}, ...this.shirtViews.map(x => x.render()))
    );
  }
}
