'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentSubject=sequelize.define('StudentSubject', {
          year:{type:DataTypes.INTEGER, validate:{min:1}, allowNull:false},
          mark:{type:DataTypes.FLOAT,validate:{min:0, max:10}, allowNull:true},
          attendance:{type:DataTypes.FLOAT,validate:{min:0, max:100}, allowNull:true},
          attitude:{type:DataTypes.FLOAT,validate:{min:0, max:10}, allowNull:true}
        },
        {
          classMethods: {
            associate: function(models) { 
                models.StudentSubject.belongsTo(models.CurrentStatus)

            }
          },
        freezeTableName:true
      })
  return StudentSubject;
};