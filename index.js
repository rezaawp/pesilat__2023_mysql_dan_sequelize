//kode dari file index.js

//import config
const baseConfig = require("./config/base.config");

//import express
const express = require("express");

const app = express();
const port = 3000;
const urlApi = "/api";

//memanggil route pada routes\api.route.js
app.use(express.json());
require("./routes/api.route")(app, urlApi);

app.listen(port, () => {
  console.log(
    `server is running on port ${port} and url ${baseConfig.base_url}`
  );
});
