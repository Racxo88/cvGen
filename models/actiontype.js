'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActionType = sequelize.define('ActionType', {
    name:{type:DataTypes.STRING, allowNull:false,validate:{isIn:[['academic','social','work']]}},
    description:{type:DataTypes.STRING, allowNull:false},
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName:true
  });
  return ActionType;
};