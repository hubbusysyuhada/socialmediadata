'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SocialMedias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_aplikasi: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      jumlah_pengguna: {
        type: Sequelize.STRING
      },
      pendiri: {
        type: Sequelize.STRING
      },
      tanggal_didirikan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SocialMedias');
  }
};