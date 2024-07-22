'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      userName: {
        type: Sequelize.DataTypes.STRING(32),
        allowNull: false,
        unique: true,
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });

    await queryInterface.createTable('guilds', {
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      guildName: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });

    await queryInterface.createTable('channels', {
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      channelName: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      guildId: {
        type: Sequelize.DataTypes.STRING,
        references: { model: 'guilds', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });

    await queryInterface.createTable('voiceEvents', {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      eventType: {
        type: Sequelize.DataTypes.ENUM('JOIN', 'LEAVE'),
        allowNull: false,
      },
      userId: {
        type: Sequelize.DataTypes.STRING,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      channelId: {
        type: Sequelize.DataTypes.STRING,
        references: { model: 'channels', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      guildId: {
        type: Sequelize.DataTypes.STRING,
        references: { model: 'guilds', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('voiceEvents');
    await queryInterface.dropTable('channels');
    await queryInterface.dropTable('guilds');
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_voiceEvents_eventType"');
  },
};
