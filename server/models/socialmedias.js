'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SocialMedias.init({
    nama_aplikasi: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    jumlah_pengguna: DataTypes.STRING,
    pendiri: DataTypes.STRING,
    tanggal_didirikan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SocialMedias',
  });
  return SocialMedias;
};