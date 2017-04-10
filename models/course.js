'use strict';
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define('Course', {
    name: {type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
    numYear:{type:DataTypes.INTEGER, validate:{min:1, max:10}, defaultValue:1, allowNull:false},

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Course.belongsTo(models.Degree)
        models.Course.belongsToMany(models.Course, {through: 'BlockCourse', as:'blockCourse' }) //courses required to be in this one.
        models.Course.belongsToMany(models.Course, {through: 'AtLeastCourse', as:'atLeastCourse' }) //courses required to be in this one.

      }
    },
    freezeTableName:true
  });
  return Course;
};