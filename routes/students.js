var express = require('express');
var router = express.Router();
var models = require('../models');
var tokenMiddle= require('../services/tokenMiddle')


/**
 * Get all students
 */
router.get('/',tokenMiddle.ensureAuthenticated,(req, res, next) => {
  models.Student.findAll({include: [
    {model: Avatar, required:true}
  ]
} )
  .then((students) => {
    res.status(200).json(students);
  });
});
/**
 * Get student by id
 */
router.get('/:id',tokenMiddle.ensureAuthenticated, (req, res, next) => {
  models.Student.findById(req.params.id,{include: [
    {model: Avatar, required:true}
  ]
})
  .then((student) => {
    res.status(200).json(student);
  });
});

/**
 * Get student by user id
 */
router.get('/user/:id',tokenMiddle.ensureAuthenticated, (req, res, next) => {
  models.User.findById(req.params.id)
  .then((user) => {
    if(user)
    {
      user.getStudent({include: [
    {model: models.Avatar}
  ]
})
      .then((student) =>{
        if (student)
        {
          res.status(200).json(student);
        }
        else
        {
          res.status(404).json({msg:'student not found'})
        }
      })
      .catch((error)=>{
        res.status(400).json(error);
      })
    }
    else
    {
      res.status(404).json({msg:'user not found'})
    }
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
            country:req.body.country,
            money: req.body.money ? req.body.money : 0
          })
          .then((student)=>{
          student.setAvatar(20)  
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
 * Update an student by user id
 */
router.put('/user/:id',tokenMiddle.ensureAuthenticated,(req,res,next) => {
  models.User.findById(req.params.id)
  .then((user)=>{
    if (user)
    {
     user.getStudent()
      .then((student)=>{
        if (student) 
        {
          student.name = req.body.name ? req.body.name : student.name;
          student.lastName = req.body.lastName ? req.body.lastName : student.lastName;
          student.birthday = req.body.birthday ? req.body.birthday : student.birthday;
          student.genre = req.body.genre ? req.body.genre : student.genre;
          student.money = req.body.money ? req.body.money : student.money;
          student.academicPoints = req.body.academicPoints ? req.body.academicPoints : student.academicPoints;
          student.socialPoints = req.body.socialPoints ? req.body.socialPoints : student.socialPoints;
          student.workPoints = req.body.workPoints ? req.body.workPoints : student.workPoints;
          student.country = req.body.country ? req.body.country : student.country;
          student.save()
          .then((student)=>{
            res.status(200).json(student) 
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
        console.log('Imposible to update it.')
        res.status(400).end()  
      })
    }
    else
    {
      res.status(404).end()  
    }
  })
});



module.exports = router;
