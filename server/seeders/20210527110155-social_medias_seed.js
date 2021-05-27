'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rawData = require('../data/socialmedias.json')
    for (let i = 0; i < rawData.length; i++) {
      rawData[i].createdAt = new Date()
      rawData[i].updatedAt = new Date()
    }
    await queryInterface.bulkInsert('SocialMedias', rawData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SocialMedias', null, {});
  }
};
