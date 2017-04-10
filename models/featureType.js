'use strict';
module.exports = function(sequelize, DataTypes) {
  var FeatureType = sequelize.define('FeatureType', {
    name:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
  }, {
    classMethods: {
      associate: function(models) {
        models.FeatureType.hasMany(models.Feature)
      }
    },
    freezeTableName:true
  });
  return FeatureType;
};