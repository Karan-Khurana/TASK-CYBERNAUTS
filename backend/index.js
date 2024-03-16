const express = require('express');
const userRoutes = require("./Routes/userRoutes");


const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/user", userRoutes);

app.listen(port, () => {
    console.log("Connected Successfully");
  });

module.exports = app;