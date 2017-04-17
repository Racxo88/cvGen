'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentAvatar = sequelize.define('StudentAvatar', {
    active: {type:DataTypes.BOOLEAN, allowNull:false} 
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
   freezeTableName:true

  });
  return StudentAvatar;
};