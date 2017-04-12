'use strict';
module.exports = function(sequelize, DataTypes) {
  var Feature = sequelize.define('Feature', {
    name:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
    socialPoints:{type:DataTypes.INTEGER, allowNull:false, validate:{min:0}},
    academicPoints:{type:DataTypes.INTEGER, allowNull:false, validate:{min:0}},
    workPoints:{type:DataTypes.INTEGER, allowNull:false, validate:{min:0}},
    professorPoints:{type:DataTypes.INTEGER, allowNull:false, validate:{min:0}},
    money:{type:DataTypes.FLOAT, allowNull:false, validate:{min:0}},
    image:{type:DataTypes.STRING, allowNull:true}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Feature.belongsToMany(models.Professor,{through:'ProfessorFeature', as:'ProfessorFeature'})
        models.Feature.belongsToMany(models.Student,{through:'StudentFeature', as:'StudentFeature'})
        models.Feature.belongsTo(models.FeatureType)
        models.Feature.belongsToMany(models.Feature, {through: 'BlockFeature', as:'blockFeature' }) //Features required to be in this one.

      }
    },
    timestamps: false,
    freezeTableName:true
  });
  return Feature;
};