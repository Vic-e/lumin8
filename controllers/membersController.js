const express = require('express')
const router = express.Router()
const Member = require('../models/members.js')

//INDEX
router.get('/', (req, res) => {
	const perPage = 20
	const page = req.params.page || 1

	Member
	.find({})
	.skip((perPage * page) - perPage)
	.limit(perPage)
	.exec((error, members) => {
		Member.count().exec((error, count) => {
				res.render('index.ejs', {
					members: members,
					current: page,
					pages:Math.ceil(count/ perPage)
				})
		})
	})
});

// router.get('/', (req, res) => {
// 	Member.find({}, (error, members) => {
// 			res.render('index.ejs', { members: members });
// 	})
// });

  //NEW
  router.get('/new', (req, res) =>{
    res.render('new.ejs');
  });

//SHOW
router.get('/:id', (req, res) =>{
	Member.findById(req.params.id, (error, member) =>{
		res.render('show.ejs', {
			member: member
		})
	})
});


//CREATE
router.post('/', (req, res) => {
Member.create(req.body, (error, addedMember) => {
	if(error){
		console.log("error", error)
		res.send(error)
	} else{
		res.redirect('/members');
	}
})
});

//DESTROY
router.delete('/:id', (req, res) => {
		Member.findByIdAndRemove(req.params.id, (error, data) => {
			res.redirect('/members')
		})
})

//EDIT
router.get('/:id/edit', (req, res) => {
	Member.findById(req.params.id, (error, foundMember) => {
		res.render('edit.ejs', {member: foundMember})
	})
})

//UPDATE
router.put('/:id', (req, res) => {
	Member.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedModel) => {
		res.redirect(`/members/${req.params.id}`)
	})
})

//PAGINATION
router.get('/page/:page/', (req, res) => {
	const perPage = 20
	const page = req.params.page || 1

	Member
	.find({})
	.skip((perPage * page) - perPage)
	.limit(perPage)
	.exec((error, members) => {
		Member.count().exec((error, count) => {
				res.render('index.ejs', {
					members: members,
					current: page,
					pages:Math.ceil(count/ perPage)
				})
		})
	})
})


//SEARCH
// router.get('/search', (req, res) => {
// 	Member.find( {}, {tag} => {
// 		res.render('search.ejs')
// 	)}
// })

//FILTER BY  QUERY STRING ?

module.exports = router
