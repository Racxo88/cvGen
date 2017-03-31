'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userName: DataTypes.STRING
  }, {
      classMethods: 
      {
        associate: (models)=> {
        // associations can be defined here
        }
      },
      freezeTableName: true
  });
  return User;
};