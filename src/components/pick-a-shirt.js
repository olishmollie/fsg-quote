class PickAShirt extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return jsml.div(
      {
        className: "d-flex justify-content-center text-center"
      },
      ...this.props.shirts.map(shirt => {
        return jsml.component(
          {},
          new ShirtView({
            shirt: shirt
          })
        );
      })
    );
  }
}
