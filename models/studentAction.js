'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentAction = sequelize.define('StudentAction', {
    academicPoints:{type:DataTypes.INTEGER, validate:{min:0},allowNull:false},
    socialPoints:{type:DataTypes.INTEGER, validate:{min:0},allowNull:false},
    workPoints:{type:DataTypes.INTEGER, validate:{min:0},allowNull:false},
    year:{type:DataTypes.INTEGER, validate:{min:1}, allowNull:false},

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.StudentAction.belongsTo(models.Subject)
      }
    },
    freezeTableName:true
  });
  return StudentAction;
};