'use strict';
module.exports = function(sequelize, DataTypes) {
  var QuestionType = sequelize.define('QuestionType', {
    name:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName:true
  });
  return QuestionType;
};