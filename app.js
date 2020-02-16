const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const mongoos = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/timeline", require("./routes/timeline.routes"));
app.use("/api/period", require("./routes/period.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port");

async function start() {
  try {
    await mongoos.connect(config.get("mongo_uri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`Server started. Port: ${PORT}`));
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();
