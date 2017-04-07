'use strict';
module.exports = function(sequelize, DataTypes) {
  var degree = sequelize.define('degree', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return degree;
};