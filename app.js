const express = require("express");
const app = express();
const path = require("path");

// Use ejs as renderer
app.set("view engine", "ejs");

// Serve static files from public
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("EXPRESS");
});
