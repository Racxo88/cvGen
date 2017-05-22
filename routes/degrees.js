var express = require('express');
var router = express.Router();
var models = require('../models');
var tokenMiddle= require('../services/tokenMiddle')


/**
 * Get all degrees
 */
router.get('/',tokenMiddle.ensureAuthenticated,(req, res, next) => {
  models.Degree.findAll()
  .then((degrees) => {
    res.status(200).json(degrees);
  });
});
/**
 * Get degree by id
 */
router.get('/:id',tokenMiddle.ensureAuthenticated, (req, res, next) => {
  models.Degree.findById(req.params.id)
  .then((degree) => {
    res.status(200).json(degree);
  });
})

/**
* Add new degree 
*/
router.post ('/',tokenMiddle.ensureAuthenticated, (req,res,next) => {
  models.Degree.findById(req.params.id) //Look if there are an degree with this id.
  .then((degree) => {
    if (!degree)
    {
      console.log("Creating new degree...")
      models.Degree.create({
        name:req.body.name,
        description: req.body.description,
        numberCourses: req.body.numberCourses,
        cuttOffMark:req.body.cuttOffMark,
        image: req.body.image ? req.body.image : null
      })
      .then((degree) => {
        res.status(200).json(degree)

      })
    }
    else
    {
      console.log("This user already has an student.")
      res.status(409).end()
    }
  })
  .catch((error) => {
    res.status(404).end()
  })
})

/**
 * Delete the degree from a specific id
 */
router.delete('/:id',tokenMiddle.ensureAuthenticated,(req,res,next) => {
 models.Degree.findById(req.params.id)
  .then((degree)=>{
    if (degree)
    {
      degree.destroy()
       .then((degree)=>{
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
 * Get all degrees by student
 */
router.get('/student/:id',tokenMiddle.ensureAuthenticated,(req, res, next) => {
  models.Degree.findAll({include:[{model: models.Student, where:{id: req.params.id}}]})
  .then((degrees) => {
    res.status(200).json(degrees);
  });
});

/**
 * Get all degrees not buy by student
 */
//router.get('/student/:id',tokenMiddle.ensureAuthenticated,(req,res,next) => {
//})

module.exports = router;
