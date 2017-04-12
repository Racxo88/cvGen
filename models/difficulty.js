'use strict';
module.exports = function(sequelize, DataTypes) {
  var Difficulty = sequelize.define('Difficulty', {
    name:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
    image:{type:DataTypes.STRING, allowNull:true}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
      timestamps: false,
      freezeTableName:true
  });
  return Difficulty;
};