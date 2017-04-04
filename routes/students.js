var express = require('express');
var router = express.Router();
var models = require('../models');

/**
 * Get all students
 */
router.get('/', (req, res, next) => {
  models.Student.findAll( )
  .then((users) => {
    res.status(200).json(users);
  });
});
/**
 * Get student by id
 */
router.get('/:id', (req, res, next) => {
  models.Student.findById(req.params.id)
  .then((user) => {
    res.status(200).json(user);
  });
});
/**
 * Add new student. 
 */
router.post ('/user/:id', (req,res,next) => {
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
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email,
          })
          .then((user)=>{
            res.status(200).json(user)
          })
          .catch((error)=>{
            res.status(400).end()
          })
        }
        else
        {
          console.log("This user already has an student.")
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
 * Delete an user 
 */
router.delete('/:id',(req,res,next) => {
  models.User.findById(req.params.id)
  .then((user)=>{
    if (user)
    {
      user.destroy()
       .then((user)=>{
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
 * Update an user
 */
router.put('/:id',(req,res,next) => {
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
