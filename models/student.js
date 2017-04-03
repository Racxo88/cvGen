'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    name: {type:DataTypes.STRING, allowNull:false},
    lastName: {type:DataTypes.STRING, allowNull:false},
    birthday: {type:DataTypes.DATE, allowNull:false},
    genre: {type:DataTypes.STRING, allowNull:false, validate:{isIn:[['male','female','trans']]}}
  },{
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Student.belongsTo(models.User);
      }
    }
  });
  return Student;
};