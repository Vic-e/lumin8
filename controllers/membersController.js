const express = require('express')
const router = express.Router()
const Member = require('../models/members.js')

//INDEX
router.get('/', (req, res) => {
	Member.find({}, (error, members) => {
			res.render('index.ejs', { members: members });
	})
});

  //new
  router.get('/new', (req, res) =>{
    res.render('new.ejs');
  });

module.exports = router
