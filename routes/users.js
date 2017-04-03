var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
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
    res.status(400).json(error)
  })
});

module.exports = router;
