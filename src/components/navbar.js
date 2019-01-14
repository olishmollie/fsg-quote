class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  init() {}

  render() {
    return jsml.nav(
      {
        className: "navbar navbar-light bg-light"
      },
      jsml.a({
        className: "navbar-brand",
        href: "#/",
        innerText: "FSG"
      }),
      jsml.ul(
        {
          className: "navbar-nav list-inline"
        },
        jsml.li(
          {
            className: "nav-item list-inline-item"
          },
          jsml.a({
            className: "nav-link",
            href: "#/",
            innerText: "Shirts"
          })
        ),
        jsml.li(
          {
            className: "nav-item list-inline-item"
          },
          jsml.a({
            className: "nav-link",
            href: "#/quote",
            innerText: "Quote"
          })
        )
      )
    );
  }
}
