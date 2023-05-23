//kode dari file api.route.js

//import route biodata pada routes\biodata.route.js
const biodataRoute = require("./biodata.route");

module.exports = function (app, urlApi) {
  //route biodata
  app.use(urlApi, biodataRoute);
};
