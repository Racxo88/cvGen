'use strict';
module.exports = function(sequelize, DataTypes) {
  var Action = sequelize.define('Action', {
    description: {type:DataTypes.STRING, allowNull:false},
        academicPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0,allowNull:false},
    socialPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0,allowNull:false},
    workPoints:{type:DataTypes.INTEGER, validate:{min:0},defaultValue:0,allowNull:false},
    money :{type:DataTypes.FLOAT, allowNull:true,validate:{min:0}}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Action.belongsTo(models.ActionType)
        models.Action.belongsTo(models.Subject)
        models.Action.belongsToMany(models.Student,{through: models.StudentAction})
      }
    },
    timestamps: false,
    freezeTableName:true
    
  });
  return Action;
};