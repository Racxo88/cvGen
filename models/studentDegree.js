'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentDegree=sequelize.define('StudentDegree', {
    year:{type: DataTypes.INTEGER, validate:{min:1}}
    },
    {
      classMethods: {
        associate: function(models) { 
          models.StudentDegree.belongsTo(models.CurrentStatus)
        }
      },
      freezeTableName:true
    })
  return StudentDegree;
};