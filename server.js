const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/route"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "Page Not Found!" });
  } else {
    res.type("txt").send("404 Not Found!");
  }
});
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});