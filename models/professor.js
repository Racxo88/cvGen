'use strict';
module.exports = function(sequelize, DataTypes) {
  var Professor = sequelize.define('Professor', {
    name: {type:DataTypes.STRING, allowNull:false},
    lastName: {type:DataTypes.STRING, allowNull:false},
    genre: {type:DataTypes.STRING, allowNull:false, validate:{isIn:[['male','female','trans']]}},
    professorPoints: {type: DataTypes.INTEGER, allowNull:false, validate:{min:0}}
  },{
    classMethods: {
      associate: function(models) {
        models.Professor.belongsTo(models.Avatar)
        // associations can be defined here

      }
    },
    timestamps: false,
    freezeTableName:true
  });
  return Professor;
};