var JSX = require('node-jsx').install(),
	React = require('react'),
	TwitterApp = require('./components/TwitterApp'),
	Tweet = require('./models/Tweet');

module.exports = {
	index: function (req, res) {

		// get initial tweets
		Tweet.getTweets(0, 0, function (tweets) {
			
			var markup = React.renderComponentToString(
				TwitterApp(tweets);
			);

			// render the tweets into the home template
			res.render('home', {
				markup: markup,
				state: JSON.stringify(tweets)
			});

		});

	},
	page: function (req, res) {

		// fetch the tweets from params
		Tweet.getTweets(req.params.page, req.params.skip, function (tweets) {
			// pass the tweets back as json
			res.send(tweets);
		});

	}
}