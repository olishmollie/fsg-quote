let util = (function() {
  // converts a style object to an inline style string
  function styleObjectToString(styleObject) {
    let result = "";
    for (let key in styleObject) {
      result += camelToDashed(key) + ": " + styleObject[key] + "; ";
    }
    return result;
  }

  // takes a camel cased string and returns dashed equivalent
  // e.g. ClassName -> class-name
  function camelToDashed(name) {
    // first letter goes regardless
    var result = [name[0].toLowerCase()];
    for (let i = 1; i < name.length; i++) {
      if (isUpper(name[i])) {
        result.push("-");
      }
      result.push(name[i].toLowerCase());
    }
    return result.join("");
  }

  function frontImageUrl(color) {
    return (
      "public/assets/" +
      color.name.replace(/ /, "-").toLowerCase() +
      "-front.jpg"
    );
  }

  function backImageUrl(color) {
    return (
      "public/assets/" +
      color.name.replace(/ /, "-").toLowerCase() +
      "-back.jpg"
    );
  }

  function isUpper(c) {
    return c === c.toUpperCase();
  }

  function randomString(length) {
    var result = "";
    var alphabet =
      "01234567890!@#$%^&**()+abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < length; i++) {
      result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return result;
  }

  return {
    styleObjectToString,
    camelToDashed,
    frontImageUrl,
    backImageUrl,
    randomString
  };
})();
