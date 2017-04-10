'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userName: {type:DataTypes.STRING, unique:true, allowNull:false},
    password: {type:DataTypes.STRING,allowNull:false},
    email: {type:DataTypes.STRING, unique:true, allowNull:false},
    lastLogin: {type:DataTypes.DATE},
    active:{type:DataTypes.BOOLEAN, defaultValue:true, allowNull:false},
    passMark:{type:DataTypes.FLOAT, validate:{min:0, max:10} },
    waitDate:{type:DataTypes.DATE, allowNull:true}
  }, {
      classMethods: 
      {
        associate: (models)=> {
        // associations can be defined here
        models.User.hasOne(models.Student,{onDelete:'CASCADE'})
        }
      },
      freezeTableName: true
  });
  return User;
};