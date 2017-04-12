'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    name: {type:DataTypes.STRING, allowNull:false},
    lastName: {type:DataTypes.STRING, allowNull:false},
    birthday: {type:DataTypes.DATE, allowNull:false},
    genre: {type:DataTypes.STRING, allowNull:false, validate:{isIn:[['male','female','trans']]}},
    money:{type:DataTypes.FLOAT,validate:{min:0},defaultValue:0},
    academicPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0},
    socialPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0},
    workPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0},
    image:{type:DataTypes.STRING, allowNull:true}
  },{
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Student.belongsTo(models.User)
      }
    },
    freezeTableName:true
  });
  return Student;
};