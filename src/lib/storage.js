class Storage {
  constructor() {}

  getItem(key) {
    if (localStorage) {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  setItem(key, value) {
    if (localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}
