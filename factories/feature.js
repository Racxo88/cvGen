
var factory = {
  types: ['social', 'work', 'student', 'professor'],
  type () {
    return factory.types[Math.floor(Math.random() * factory.types.length)];
  },
 points(){
    return Math.floor(Math.random()*100);
 },
 money(){
  return Math.random()*100;
 },
build (sequelize) {
    var type = factory.type();
    var data = {
      name: 'feature_name_'+type,
      description: 'feature_name_' + type,
      socialPoints: factory.points(),
      academicPoints:factory.points(),
      workPoints:factory.points(),
      professorPoints:factory.points(),
      money:factory.money(),
      FeatureType:{
        name:'featureType_name_'+type
      }
    } 
    feature = { model: "Feature", data: data };  
    return feature;
  },
  bulk (quantity, sequelize) {
    var features = [];
    for (var i = 0; i < quantity; i++) {
      features.push(factory.build(sequelize));
    }
    return features;
  }
}
module.exports = factory;