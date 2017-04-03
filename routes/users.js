var express = require('express');
var router = express.Router();
var models = require('../models');

/**
 * Get all users
 */
router.get('/', (req, res, next)=> {
  models.User.findAll({
    attributes:{
      exclude:['password']
    }
  })
  .then((users)=>{
    res.status(200).json(users);
  });
});
/**
 * Get user by id
 */
router.get('/:id', (req, res, next)=> {
  models.User.findById(req.params.id ,{
    attributes:{
      exclude:['password']
    }
  })
  .then((user)=>{
    res.status(200).json(user);
  });
});
/**
 * Add new user.
 */
router.post ('/', (req,res,next)=>{
  models.User.create({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  })
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch((error)=>{
    res.status(400).end
  })
});
/**
 * Update an user
 */
router.put('/:id',(req,res,next)=>{
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
})

module.exports = router;
