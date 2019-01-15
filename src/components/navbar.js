class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  init() {}

  render() {
    return jsml.nav(
      {},
      jsml.ul(
        {},
        jsml.li(
          {},
          jsml.a(
            {
              href: "#/"
            },
            jsml.text("FSG")
          )
        ),
        jsml.li(
          {},
          jsml.a(
            {
              href: "#/"
            },
            jsml.text("Shirts")
          )
        ),
        jsml.li(
          {},
          jsml.a(
            {
              href: "#/quote"
            },
            jsml.text("Quote")
          )
        )
      )
    );
  }
}
