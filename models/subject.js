'use strict';
module.exports = function(sequelize, DataTypes) {
  var subject = sequelize.define('subject', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return subject;
};