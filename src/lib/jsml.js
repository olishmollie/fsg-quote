var jsml = (function() {
  // creates a standard HTML dom element
  function makeElement(tag, attributes, ...children) {
    let element = document.createElement(tag);

    for (let attr in attributes) {
      element[attr] = attributes[attr];
    }

    for (let i = 0; i < children.length; i++) {
      element.appendChild(children[i]);
    }

    return element;
  }

  // renders a component or a custom made node
  function component(component, attributes, ...children) {
    if (component instanceof Component) {
      component = Object.assign(component, attributes);
      return component.render();
    } else {
      // it's not a component, so it's a pure HTML node
      for (let attr in attributes) {
        component[attr] = attributes[attr];
      }
      for (let i = 0; i < children.length; i++) {
        component.appendChild(children[i]);
      }
      return component;
    }
  }

  return {
    makeElement: makeElement,
    component: component,
    h1: (attributes, ...children) => {
      return makeElement("h1", attributes, ...children);
    },
    h2: (attributes, ...children) => {
      return makeElement("h2", attributes, ...children);
    },
    h3: (attributes, ...children) => {
      return makeElement("h3", attributes, ...children);
    },
    h4: (attributes, ...children) => {
      return makeElement("h4", attributes, ...children);
    },
    h5: (attributes, ...children) => {
      return makeElement("h5", attributes, ...children);
    },
    h6: (attributes, ...children) => {
      return makeElement("h6", attributes, ...children);
    },
    a: (attributes, ...children) => {
      return makeElement("a", attributes, ...children);
    },
    div: (attributes, ...children) => {
      return makeElement("div", attributes, ...children);
    },
    nav: (attributes, ...children) => {
      return makeElement("nav", attributes, ...children);
    },
    p: (attributes, ...children) => {
      return makeElement("p", attributes, ...children);
    },
    strong: (attributes, ...children) => {
      return makeElement("strong", attributes, ...children);
    },
    span: (attributes, ...children) => {
      return makeElement("span", attributes, ...children);
    },
    figure: (attributes, ...children) => {
      return makeElement("figure", attributes, ...children);
    },
    figcaption: (attributes = {}) => {
      return makeElement("figcaption", attributes);
    },
    img: (attributes = {}) => {
      return makeElement("img", attributes);
    },
    button: (attributes = {}) => {
      return makeElement("button", attributes);
    },
    label: (attributes, ...children) => {
      return makeElement("label", attributes, ...children);
    },
    input: (attributes = {}) => {
      return makeElement("input", attributes);
    },
    ul: (attributes, ...children) => {
      return makeElement("ul", attributes, ...children);
    },
    li: (attributes, ...children) => {
      return makeElement("li", attributes, ...children);
    },
    text: text => {
      return document.createTextNode(text);
    },
    select: (selections, selected, attributes, ...children) => {
      let select = makeElement("select", attributes, ...children);
      for (let i = 0; i < selections.length; i++) {
        let option = jsml.option({
          innerText: selections[i],
          value: selections[i],
          selected: i === selected
        });
        select.appendChild(option);
      }
      return select;
    },
    option: (attributes, ...children) => {
      return makeElement("option", attributes, ...children);
    },
    canvas: (attributes = {}) => {
      return makeElement("canvas", attributes);
    }
  };
})();
