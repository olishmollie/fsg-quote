const express = require("express");
const app = express();

const path = require("path");

app.use(express.static(__dirname));

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("fsg-quote listening on port 3000");
});
