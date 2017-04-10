'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    questionText: {type:DataTypes.STRING, allowNull:false},
    academicPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0,allowNull:false},
    socialPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0,allowNull:false},
    workPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0,allowNull:false}
  }, {
    classMethods: {
      associate: function(models) {
        models.Question.belongsTo(models.ActionType)
        models.Question.belongsTo(models.QuestionType)
        models.Question.belongsTo(models.Subject)
        models.Question.hasMany(models.Answer)
        models.Question.belongsToMany(models.Action, {through: 'ActionQuestion'})
        // associations can be defined here
      }
    },
    timestamps: false,
    freezeTableName:true
  });
  return Question;
};