//import controller biodata.controller.js
const biodata = require("../controllers/biodata.controller");

//express
const express = require("express");
const route = express.Router();

//membuat biodata baru route
route.post(
  "/biodata", //route
  biodata.store //controller
);

//mendapatkan semua data biodata route
route.get(
  "/biodata", //route
  biodata.index
); //controller

//melihat data biodata berdasarkan id route
route.get(
  "/biodata/:id", //route
  biodata.show //controller
);

//mengupdate biodata berdasarkan id route
route.put(
  "/biodata/:id", //route
  biodata.update //controller
);

// //menghapus biodata berdasarkan id route
route.delete(
  "/biodata/:id", //route
  biodata.destroy
); //controller

module.exports = route;
