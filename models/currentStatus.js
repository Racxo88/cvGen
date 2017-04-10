'use strict';
module.exports = function(sequelize, DataTypes) {
  var CurrentStatus = sequelize.define('CurrentStatus', {
    name: {type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here


      }
    },
    freezeTableName:true
  });
  return CurrentStatus;
};