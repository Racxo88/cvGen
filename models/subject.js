'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    name: {type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
    price:{type:DataTypes.FLOAT, validate:{min:0}, allowNull:false},
    studentPoints:{type:DataTypes.INTEGER, validate:{min:1},allowNull:false} //Max of studentPoints for the highest mark.
  }, {
    classMethods: {
      associate: function(models) {   
        // associations can be defined here
        
      var ProfessorSubject=sequelize.define('ProfessorSubject', {
          year:{type:DataTypes.INTEGER, validate:{min:1}, allowNull:false},
        },
        {
          freezeTableName:true
        })
        models.Subject.belongsToMany(models.Professor,{through:ProfessorSubject})
        models.Subject.belongsToMany(models.Student,{through:models.StudentSubject})
        models.Subject.belongsTo(models.Course)
        models.Subject.belongsToMany(models.Subject, {through: 'BlockSubject', as:'blockSubject' }) //Subjects required to be in this one.
        models.Subject.belongsToMany(models.Subject, {through: 'AtLeastSubject', as:'atLeastSubject' }) //courses required to be in this one. 
      }
    },
    timestamps: false,
    freezeTableName:true
  });
  return Subject;
};