class PickAShirt extends Component {
  constructor(props) {
    super(props);
  }

  init() {
    this.shirtViews = this.props.shirts.map(shirt => {
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
        ...this.shirtViews.map(x => x.render())
      )
    );
  }
}
