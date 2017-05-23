var factory = {
  count:1,
  lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
  },
  money(){
        return Math.random()*100;
  },
  build (sequelize, genre) {
    var number= factory.lpad(factory.count,3)
    if (genre === 'F') {
      genreLong= 'female'
    }
    else if (genre === 'M') {
      genreLong = 'male'
    }
    else
    {
      genreLong = 'other'
    }
    var data = {
      name: 'avatar_name_'+factory.count,
      description: 'avatar_description_' + factory.count,
      money:factory.money(),
      image: genre + '-' + number+'.png' ,
      genre: genreLong,    
      AvatarType:{
        name:'avatarType_name_student'
      }
    } 
    avatar = { model: "Avatar", data: data }; 
    factory.count++ 
    return avatar;
  },
  insert (numMale, numFemale, numOther, sequelize) {
    var avatars = [];
    for (var i = 0; i < numMale; i++) {
      avatars=avatars.concat(factory.build(sequelize,'M'));
    }
    factory.count=1;
    for (var i = 0; i < numFemale; i++) {
      avatars=avatars.concat(factory.build(sequelize, 'F'));
    }
    factory.count=1;
    for (var i = 0; i < numOther; i++) {
      avatars=avatars.concat(factory.build(sequelize, 'O'));
    }
    return avatars;
  }
}
module.exports = factory;