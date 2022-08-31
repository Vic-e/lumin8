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

//SEED
router.get('/seed', (req, res) =>{
	Member.create([{
		"name": "Victoria Vice Coker",
		"title": "Founder, Black Web Fest",
		"img":"https://miro.medium.com/fit/c/176/176/2*qvKZi-2uTBLEj1EEyc_7fg.jpeg",
		"bio": "Victoria Coker is a multi-disciplinary artist and entrepreneur. She graduated from St. John’s University with a Bachelor’s in communication arts. Ms. Coker has more than ten years of design and marketing experience and has worked for organizations such as Carnegie Hall, Bric Arts Media, and Oxford University Press. In 2017, she launched the Black Web Fest, an organization dedicated to celebrating Black creatives and digital content. Her goal is to build a legacy to empower her community.",
		"accomplishments":["Founder of Black Web Fest", "Creator of the Lumin8 Platform :)", "Certified Software Engineer"],
		"contact": {
			"twitter": "https://twitter.com/addvic_e" ,
			"instagram": "https://instagram.com/addvic_e/?hl=en",
			"linkedin": "https://www.linkedin.com/in/victoria-coker-2149611b/",
			"website": "https://blackwebfest.org/"
		},
			"location": "Brooklyn, NY",
			"tags":["Black", "Woman", "Artist", "Web Developer", "Speaker", "Partnerships"]
		},
{
		"name": "Michelle Cadore",
		"title": "CEO, Da Spot NYC and YES I AM, Inc",
		"img":"https://boldculturehub.com/wp-content/uploads/2021/04/Michelle-Cadore-headshot.jpeg",
		"bio": "Michelle Cadore is the Designer, CEO, and visionary behind YES I AM, Inc, which she established in 2016.A true renaissance woman, Michelle is also the Co-Owner of DA SPOT NYC, a unique fashion boutique located in Downtown Brooklyn. DA SPOT features 25+ independent creative brands by people of color including YES I AM and the C.A.N.V.A.S Art Gallery. ",
		"accomplishments":["Mastercard Strivers Initiative", "She Can Thrive 2020 Recipien", "1010 WINS Dime Community Bank Challenge 10K grant winner"],
		"contact": {
			"twitter": "https://twitter.com/YESIAMINC" ,
			"instagram": "https://www.instagram.com/yesiam_michellec/?hl=en",
		},
		"location": "Brooklyn, NY",
		"tags":["Black", "Woman", "Consulting", "Speaker", "Partnerships"]
},

{
		"name": "Michelle Obama",
		"title": "Founder, Obama Foundation & Award-Winning Author",
		"img":"https://www.biography.com/.image/t_share/MTczNjEwODI2NTg5MDg3MTI0/michelle-obama-gettyimages-85246899.jpg",
		"bio": "Michelle LaVaughn Robinson Obama is an American attorney and author who served as first lady of the United States from 2009 to 2017. She was the first African-American woman to serve in this position. She is married to former President Barack Obama.",
		"accomplishments":["Harvard Law School", "Grammy Award for Best Spoken Word Album", "Shorty Award for Literature"],
		"contact": {
			"twitter": "https://twitter.com/MichelleObama" ,
			"instagram": "https://www.instagram.com/michelleobama/?hl=en",
			"website": "https://michelleobamabooks.com/"
	},
		"location": "Washington, DC",
		"tags":["Black", "Woman", "Writer", "Speaker", "Partnerships"]
}])
})

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
	req.body.tags = (typeof(req.body.tags)===Array?req.body.tags.join(', '):req.body.tags).split(', ');
	req.body.accomplishments = (typeof(req.body.accomplishments)===Array?req.body.accomplishments.join(', '):req.body.accomplishments).split(', ');
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
		req.body.tags = (typeof(req.body.tags)===Array?req.body.tags.join(', '):req.body.tags).split(', ');
		req.body.accomplishments = (typeof(req.body.accomplishments)===Array?req.body.accomplishments.join(', '):req.body.accomplishments).split(', ');
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
