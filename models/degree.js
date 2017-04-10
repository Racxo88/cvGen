'use strict';
module.exports = function(sequelize, DataTypes) {
  var Degree = sequelize.define('Degree', {
    name: {type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
    numberCourses:{type:DataTypes.INTEGER,validate:{min:1,max:10},allowNull:false},
    cuttOffMark:{type:DataTypes.INTEGER, allowNull:false}
  }, {
    classMethods: {
      associate: function(models) {
        
        models.Degree.belongsToMany(models.Student, {through: models.StudentDegree})
        models.Degree.belongsToMany(models.Degree, {through: 'BlockDegree', as:'blockDegree' }) //Degrees required to be in this one.
        models.Degree.belongsToMany(models.Degree, {through: 'AtLeastDegree', as:'atLeastDegree' }) //courses required to be in this one.
      }
    },
    freezeTableName:true
  });
  return Degree;
};