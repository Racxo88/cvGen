var express = require('express');
var router = express.Router();
var models = require('../models');
var tokenMiddle= require('../services/tokenMiddle')
const sequelize = require('../models').sequelize;
const constants = require('../config/constants')


/**
 * Get all actions
 */
router.get('/',tokenMiddle.ensureAuthenticated,(req, res, next) => {
  models.Action.findAll()
  .then((actions) => {
    res.status(200).json(actions);
  });
});
/**
 * Get action by id
 */
router.get('/:id',tokenMiddle.ensureAuthenticated, (req, res, next) => {
  models.Action.find({where:{id:req.params.id},include:[{model:models.Question,include:[models.Answer]}]}).then((actions)=>{
                if (actions)
                {
                  res.status(200).json(actions)
                }
                else
                {
                  res.status(404).json({msg:'Action not found'})
                }
              })     
});

/**
 * Create a random action of typeaction id. //1. Academic, 2. Social, 3.Work.
 */
router.post('/random/type/:id/:subId?',tokenMiddle.ensureAuthenticated,(req,res,next)=>{
        var subId=req.params.subId
        if ((req.params.id==='1' && subId!==undefined)||(req.params.id!=='1' && subId===undefined))
        {
          models.Question.findAll({
          order:
          [
            sequelize.fn('RAND')
          ],
          where:{ActionTypeId:req.params.id,SubjectId:subId===undefined?null:subId},
          limit:constants.numQuestions
        })
        .then((questions)=>{
          if (questions.length===constants.numQuestions)
          {
            var socialPoints=0;
            var workPoints=0;
            var academicPoints=0;
            questions.forEach((element)=> {
              socialPoints+=element.socialPoints
              workPoints+=element.workPoints
              academicPoints+=element.academicPoints
            }); 
            var money=Math.random()*50//TODO check type
            models.Action.create({
              description:'action_description'+req.params.id,
              academicPoints: academicPoints,
              workPoints: workPoints,
              socialPoints: socialPoints,
              money:money,
              ActionTypeId:req.params.id,
              SubjectId:subId? subId : undefined          
            }).then((action)=>{
              action.addQuestions(questions)
              console.log('Social='+socialPoints+'.Work='+workPoints+'.Academic='+academicPoints)
              res.status(200).json(action)
            })
            .catch((error)=>{
              console.log(error)
              res.status(400).end()
            })
            
          }
          else
          {
            res.status(404).json({msg:'Questions not found'})
          }
        })
        .catch((error)=>{
          res.status(400).json(error)
        })
      }
      else
      {
        res.status(400).json({msg:'Invalid combination.'})
      }
});
/**
 * Delete action by id
 */
router.delete('/:id',tokenMiddle.ensureAuthenticated,(req,res,next) => {
  models.Action.findById(req.params.id)
  .then((action)=>{
    if (action)
    {
      action.destroy()
      .then((action)=>{
        res.status(200).json({msg:'Removed successfully'}) 
      })
      .catch((error)=>{
        res.status(400).end()  
      })
    }
    else
    {
      res.status(404).end()
    }
  })
  .catch((error)=>{
    console.log('Imposible to remove it.')
    res.status(400).end()  
  })
})

module.exports=router