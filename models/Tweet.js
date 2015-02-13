var mongoose = require('mongoose');

// schema for out tweet data
var schema = new mongoose.Schema({
	twid: String,
	avatar: String,
	author: String,
	active: Boolean,
	date: Date,
	body: String,
	screenname: String
});

// static method for getting a batch of tweets
schema.statics.getTweets = function (page, skip, call) {
	var tweets = [],
		start = (page * 10) + skip;

	Tweet.find({}, 'twid avatar author active date body screenname', {skip: start, limit: 10})
		.sort({date:'desc'})
		.exec(function (err, data) {

			// if there is no error
			if ( !err ) {
				tweets = data;
				tweets.each(function (tweet) {
					tweet.active = true; // set them to active
				});
			}

			call(tweets);
		});
};

module.exports = Tweet = mongoose.model('Tweet', schema);