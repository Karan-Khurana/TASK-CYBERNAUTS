const express = require("express");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
const whitelist = ["http://127.0.0.1:5500/"];
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log("Connected Successfully");
});

module.exports = app;