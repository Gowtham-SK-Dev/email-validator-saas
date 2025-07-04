'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'company', {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: 'api_secret' 
    });
    await queryInterface.addColumn('users', 'address', {
      type: Sequelize.STRING(255),
      allowNull: true,
      after: 'company'
    });
    await queryInterface.addColumn('users', 'state', {
      type: Sequelize.STRING(100),
      allowNull: true,
      after: 'address'
    });
    await queryInterface.addColumn('users', 'country', {
      type: Sequelize.STRING(100),
      allowNull: true,
      after: 'state'
    });
    await queryInterface.addColumn('users', 'zip_code', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: 'country'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'company');
    await queryInterface.removeColumn('users', 'address');
    await queryInterface.removeColumn('users', 'state');
    await queryInterface.removeColumn('users', 'country');
    await queryInterface.removeColumn('users', 'zip_code');
  }

};
