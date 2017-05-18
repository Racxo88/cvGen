'use strict';
module.exports = function(sequelize, DataTypes) {
  var Avatar = sequelize.define('Avatar', {
    name: {type:DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING, allowNull:false},
    image: {type:DataTypes.STRING, allowNull:false},
    genre:  {type:DataTypes.STRING, allowNull:false},
    money: {type:DataTypes.FLOAT, allowNull:false},    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Avatar.belongsTo(models.AvatarType)
        models.Avatar.belongsToMany(models.Student, {through: 'StudentAvatar'})
      }
    },
    timestamps:false,
    freezeTableName:true
  });
  return Avatar;
};