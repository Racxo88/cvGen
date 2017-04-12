
var factory = {
  types: ['social', 'work', 'academic'],
  questionTypes:['multiple','truefalse'],
  subjectIds:[1,2,3,4],
  num:0,
  type () {
    return factory.types[Math.floor(Math.random() * factory.types.length)];
  },
  questionType () {
    return factory.questionTypes[Math.floor(Math.random() * factory.questionTypes.length)];
  },
  subjectId () {
    return factory.subjectIds[Math.floor(Math.random() * factory.subjectIds.length)];
  },
 points(){
    return Math.floor(Math.random()*100)
 },
 number(){
  return factory.num++
 },
build (sequelize) {
    var type = factory.type()
    var number=factory.number()
    if (type==='academic')
    {
      var subjectId = factory.subjectId();
    }
    var questionType = factory.questionType();
    var questionData = {
      questionText: 'question_text_'+type+'_'+questionType+(subjectId!==undefined?'_'+subjectId:'')+"_"+number,
      socialPoints: factory.points(),
      academicPoints:factory.points(),
      workPoints:factory.points(),
      ActionType:{
        name:'actionType_name_'+type
      },
      QuestionType:{
        name:'questionType_name_'+questionType
        
      }   
    }
    if (subjectId!==undefined)
    {
      questionData["Subject"]={id:subjectId}
    }
    var objects=[]

  question = { model: "Question", data: questionData };
  objects.push(question)
  if (questionType==='multiple')
  {
    var numAnswer=4
  }
  else if (questionType==='truefalse')
  {
  var  numAnswer=2
}
    for (var i = 0; i <numAnswer ; i++) {    
      answerData= {
        answerText:'answer_text_'+type+'_'+questionType+(subjectId!==undefined?'_'+subjectId:'')+"_"+i,
        socialPoints: factory.points(),
        academicPoints:factory.points(),
        workPoints:factory.points(),
        QuestionType:{
          name:'questionType_name_'+questionType   
        },
        Question:
        {
          questionText: 'question_text_'+type+'_'+questionType+(subjectId!==undefined?'_'+subjectId:'')+"_"+number
        }  
      }
    answer={model:"Answer",data : answerData}
    objects.push(answer)
  }
    return objects;
  },
  bulk (quantity, sequelize) {
    var questions = [];
    for (var i = 0; i < quantity; i++) {
      questions=questions.concat(factory.build(sequelize));
    }
    return questions;
  }
}
module.exports = factory;