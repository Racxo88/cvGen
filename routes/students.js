var express = require('express');
var router = express.Router();
var models = require('../models');
var tokenMiddle= require('../services/tokenMiddle')


/**
 * Get all students
 */
router.get('/',tokenMiddle.ensureAuthenticated,(req, res, next) => {
  models.Student.findAll( )
  .then((users) => {
    res.status(200).json(users);
  });
});
/**
 * Get student by id
 */
router.get('/:id',tokenMiddle.ensureAuthenticated, (req, res, next) => {
  models.Student.findById(req.params.id)
  .then((user) => {
    res.status(200).json(user);
  });
});
/**
 * Add new student from a specific user 
 */
router.post ('/user/:id',tokenMiddle.ensureAuthenticated, (req,res,next) => {
  models.User.findById(req.params.id) //Look if there are an user with this id.
  .then((user) => {
    if (user)
    {
      user.getStudent()
      .then((student) => {
        if (!student)
        {
          console.log("Creating new student...")
          models.Student.create({
            name:req.body.name,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            genre:req.body.genre,
          })
          .then((student)=>{
            user.setStudent(student)
            .then(() => {
              res.status(200).json(student)
            })
            .catch(() => {
              res.status(400).end()
            })
          })
          .catch((error)=>{
            res.status(400).end()
          })
        }
        else
        {
          console.log("This user already has an student.")
          res.status(409).end()
        }
      })

    }
    else
    {
      res.status(404).end()
    }
  })
  .catch((error) => {
    res.status(404).end()
  })
 
});

/**
 * Delete the student from a specific user 
 */
router.delete('/user/:id',tokenMiddle.ensureAuthenticated,(req,res,next) => {
  models.User.findById(req.params.id)
  .then((user)=>{
    if (user)
    {
     user.getStudent()
       .then((student)=>{
         if (student)
         {
            student.destroy()
            .then((user)=>{
              res.status(200).json({msg:'Removed successfully'}) 
            })
            .catch((error)=>{
              res.status(400).end()  
            })
          }
          else
          {
            console.log('User does not have student.')
            res.status(404).end()
          }
      })
      .catch((error)=>{
        console.log('Imposible to remove it.')
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
 * Update an user
 */
router.put('/:id',tokenMiddle.ensureAuthenticated,(req,res,next) => {
  models.User.findById(req.params.id)
  .then((user)=>{
    if (user) {
      user.userName = req.body.userName ? req.body.userName : user.userName;
      user.password = req.body.password ? req.body.password : user.password;
      user.email = req.body.email ? req.body.email : user.email;
      user.save()
      .then((user)=>{
        res.status(200).json({msg:"Success"}) 
      })
      .catch((error)=>{
        res.status(400).end()        
      })
    }
    else {
      res.status(404).end()          
    }
  })
});



module.exports = router;
