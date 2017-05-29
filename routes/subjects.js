var express = require('express');
var router = express.Router();
var models = require('../models');
var tokenMiddle= require('../services/tokenMiddle')
var sequelize = require('sequelize')
/**
 * Get all subjects
 */
router.get('/',tokenMiddle.ensureAuthenticated,(req, res, next) => {
  models.Subject.findAll()
  .then((subjects) => {
    res.status(200).json(subjects);
  });
});
/**
 * Get subject by id
 */
router.get('/:id',tokenMiddle.ensureAuthenticated, (req, res, next) => {
  models.Subject.findById(req.params.id)
  .then((subject) => {
    res.status(200).json(subject);
  });
})

/**
* Add new degree 
*/
router.post ('/',tokenMiddle.ensureAuthenticated, (req,res,next) => {
  models.Subject.findById(req.params.id) //Look if there are an degree with this id.
  .then((subject) => {
    if (!subject)
    {
      console.log("Creating new subject...")
      models.Subject.create({
        name:req.body.name,
        description: req.body.description,
        studentPoints: req.body.studentPoints,
        money:req.body.money,
        image: req.body.image ? req.body.image : null
      })
      .then((subject) => {
        res.status(200).json(subject)

      })
    }
    else
    {
      console.log("This degree already exists.")
      res.status(409).end()
    }
  })
  .catch((error) => {
    res.status(404).end()
  })
})

/**
 * Delete the subject from a specific id
 */
router.delete('/:id',tokenMiddle.ensureAuthenticated,(req,res,next) => {
 models.Subject.findById(req.params.id)
  .then((subject)=>{
    if (subject)
    {
      subject.destroy()
       .then((subject)=>{
        res.status(200).json({msg:"Removed successfully"}) 
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
})
/**
 * Update a degree by id
 */
//router.put('/:id',tokenMiddle.ensureAuthenticated,(req,res,next) => {
 
//})


/**
 * Get all degrees by student and degree
 */
router.get('/student/:id/degree/:degreeId',tokenMiddle.ensureAuthenticated,(req, res, next) => {
  models.Subject.findAll({where:{DegreeId: req.params.degreeId}, include:[{model: models.Student, where:{id: req.params.id}}]})
  .then((subjects) => {
    res.status(200).json(subjects);
  });
});

/**
 * Get all subjects not buy by student on a Degree
 */
router.get('/nostudent/:id/degree/:degreeId',tokenMiddle.ensureAuthenticated,(req,res,next) => {
 models.StudentSubject.findAll({attributes:['SubjectId'], where: {StudentId:req.params.id}})
.then((subjects) => {
  var ids=subjects.map((subject)=>subject.SubjectId)
  if (ids.length>0)
  {
    models.Subject.findAll({where: {id: {$notIn:ids}, DegreeId: req.params.degreeId}})
    .then((nosubjects) =>{
      res.status(200).json(nosubjects);
    })
  }
  else
  {
     models.Degree.findAll()
    .then((nodegrees) =>{
      res.status(200).json(nodegrees);
    })
  }
});
})

/**
 * Get all subjects by degree
 */
router.get('/degree/:degreeId',tokenMiddle.ensureAuthenticated,(req, res, next) => {
  models.Subject.findAll({where:{DegreeId: req.params.degreeId}})
  .then((subjects) => {
    res.status(200).json(subjects);
  });
});

/**
 * buy a subject
 */
router.post('/student/:id',tokenMiddle.ensureAuthenticated,(req, res, next) => {
  models.Student.findById(req.params.id)
  .then((student) => {
    models.Subject.findById(req.body.id)
    .then((subject) => {
      student.addSubject(subject, {
          CurrentStatusId:1,
          year: new Date().getFullYear()
      })
      res.status(200).end()
    })
  })
})

module.exports = router;
