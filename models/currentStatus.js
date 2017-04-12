'use strict';
module.exports = function(sequelize, DataTypes) {
  var CurrentStatus = sequelize.define('CurrentStatus', {
    name: {type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
        image:{type:DataTypes.STRING, allowNull:true}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here


      }
    },
    timestamps: false,
    freezeTableName:true
  });
  return CurrentStatus;
};