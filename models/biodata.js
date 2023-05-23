"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Biodata.init(
    {
      nama: DataTypes.INTEGER,
      tempatLahir: DataTypes.STRING,
      tanggalLahir: DataTypes.DATE,
      alamat: DataTypes.TEXT,
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Biodata",
    }
  );
  return Biodata;
};
