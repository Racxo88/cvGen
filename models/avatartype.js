'use strict';
module.exports = function(sequelize, DataTypes) {
  var AvatarType = sequelize.define('AvatarType', {
    name: {type:DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING, allowNull:false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps:false,
    freezeTableName:true
  });
  return AvatarType;
};