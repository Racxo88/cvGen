'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    answerText: {type:DataTypes.STRING, allowNull:false},
    academicPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0,allowNull:false},
    socialPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0,allowNull:false},
    workPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0,allowNull:false}
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false,
    freezeTableName:true
  });
  return Answer;
};