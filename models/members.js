const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema ({
name: { type: String, required: true },
title: { type: String, required: true },
img: String,
bio: String,
accomplishments: [String],
contact: {twitter:{ type: String}, instagram: {type:String}, linkedin: {type:String}, website: {type:String}},
location: String,
tags: [String]
})

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
