'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    name: {type:DataTypes.STRING, allowNull:false},
    lastName: {type:DataTypes.STRING, allowNull:false},
    birthday: {type:DataTypes.DATE, allowNull:false},
    genre: {type:DataTypes.STRING, allowNull:false, validate:{isIn:[['male','female','other']]}},
    money:{type:DataTypes.FLOAT,validate:{min:0},defaultValue:0},
    academicPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0},
    socialPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0},
    workPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0},
    country: {type:DataTypes.STRING,
     allowNull:false}
  },{
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Student.belongsTo(models.User)
        models.Student.belongsTo(models.Avatar)
        models.Student.belongsToMany(models.Avatar, {through: 'StudentAvatar'})
      }
    },
    freezeTableName:true
  });
  return Student;
};