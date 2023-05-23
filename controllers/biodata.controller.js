//kode dari file biodata.controller.js

//import helper response formatter
const { response } = require("../helpers/response.formatter");

//import model admin
const { Biodata } = require("../models");

//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  //membuat biodata
  store: async (req, res) => {
    try {
      //membuat schema untuk validasi request
      const schema = {
        nama: {
          type: "string",
        },
        tempatLahir: {
          type: "string",
          min: 1,
        },
        tanggalLahir: {
          type: "string",
        },
        alamat: {
          type: "string",
        },
      };

      //buat object biodata
      let itemCreateObj = {
        nama: req.body.nama,
        tempatLahir: req.body.tempat_lahir,
        tanggalLahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
      };

      //validasi menggunakan module fastest-validator
      const validate = v.validate(itemCreateObj, schema);
      if (validate.length > 0) {
        res.status(400).json(response(400, "validasi gagal", validate));
        return;
      }

      //buat biodata
      let itemCreate = await Biodata.create(itemCreateObj);

      //response menggunakan helper response.formatter
      res
        .status(201)
        .json(response(201, "berhasil menyimpan data", itemCreate));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  },

  //mendapatkan semua data biodata
  index: async (req, res) => {
    try {
      //mendapatkan data semua biodata
      let itemGets = await Biodata.findAll();

      const result = itemGets.map((data, i) => {
        return {
          id: data.id,
          nama: data.nama,
          tempatLahir: data.tempatLahir,
          tanggalLahir: data.tanggalLahir,
          alamat: data.alamat,
        };
      });

      //response menggunakan helper response.formatter
      res.status(200).json(response(200, "success get biodata", result));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  },

  // //mendapatkan data biodata berdasarkan id
  show: async (req, res) => {
    try {
      //mendapatkan data biodata berdasarkan id
      let itemGet = await Biodata.findOne({
        where: {
          id: req.params.id,
        },
        //menampilkan admin yang membuat biodata, karena kita sudah membuat relasi
      });

      //cek jika biodata tidak ada
      if (!itemGet) {
        res.status(404).json(response(404, "biodata not found"));
        return;
      }

      //response menggunakan helper response.formatter
      res.status(200).json(response(200, "success get biodata by id", itemGet));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  },

  // //mengupdate biodata berdasarkan id
  update: async (req, res) => {
    try {
      //mendapatkan data biodata untuk pengecekan
      let itemGet = await Biodata.findOne({
        where: {
          id: req.params.id,
        },
      });

      //cek apakah data biodata ada
      if (!itemGet) {
        res.status(404).json(response(404, "biodata not found"));
        return;
      }

      //membuat schema untuk validasi
      const schema = {
        nama: {
          type: "string",
        },
        tempatLahir: {
          type: "string",
          min: 1,
        },
        tanggalLahir: {
          type: "string",
        },
        alamat: {
          type: "string",
        },
      };

      //buat object biodata
      let itemUpdateObj = {
        nama: req.body.nama,
        tempatLahir: req.body.tempat_lahir,
        tanggalLahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
      };

      //validasi menggunakan module fastest-validator
      const validate = v.validate(itemUpdateObj, schema);
      if (validate.length > 0) {
        res.status(400).json(response(400, "validation failed", validate));
        return;
      }

      //update biodata
      await Biodata.update(itemUpdateObj, {
        where: {
          id: req.params.id,
        },
      });

      //mendapatkan data biodata setelah update
      let itemAfterUpdate = await Biodata.findOne({
        where: {
          id: req.params.id,
        },
      });

      //response menggunakan helper response.formatter
      res
        .status(200)
        .json(response(200, "success update biodata", itemAfterUpdate));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  },

  // //menghapus biodata berdasarkan id
  destroy: async (req, res) => {
    try {
      //mendapatkan data biodata untuk pengecekan
      let itemGet = await Biodata.findOne({
        where: {
          id: req.params.id,
        },
      });

      //cek apakah data biodata ada
      if (!itemGet) {
        res.status(404).json(response(404, "biodata not found"));
        return;
      }

      await Biodata.destroy({
        where: {
          id: req.params.id,
        },
      });

      //response menggunakan helper response.formatter
      res.status(200).json(response(200, "success delete biodata"));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  },
};
