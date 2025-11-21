const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Import all models here
// Example models structure - adjust based on your needs
const models = {};

// Initialize models
// models.User = require('./User')(sequelize, DataTypes);
// models.Note = require('./Note')(sequelize, DataTypes);
// models.AudioFile = require('./AudioFile')(sequelize, DataTypes);

// Define associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = require('sequelize');

module.exports = models;

