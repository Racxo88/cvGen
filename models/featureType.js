'use strict';
module.exports = function(sequelize, DataTypes) {
  var FeatureType = sequelize.define('FeatureType', {
    name:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
    image:{type:DataTypes.STRING, allowNull:true}
  }, {
    classMethods: {
      associate: function(models) {
        models.FeatureType.hasMany(models.Feature)
      }
    },
    timestamps: false,
    freezeTableName:true
  });
  return FeatureType;
};