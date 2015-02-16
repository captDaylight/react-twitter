var React = require('react');

module.exports = TwitterApp = React.createClass({
	
	showNewTweets: function () {
		// get the current state
		var updated = this.state.tweets;

		// set all tweets to active
		updated.forEach(function (tweet) {
			tweet.active = true;
		});

		// set the state with the new active tweets and make the count zero
		this.setState({tweets: updated, count: 0});

	},

	// when a new tweet is sent from the serve
	addTweet: function (tweet) {

		// get the current state of tweets
		var updated = this.state.tweets;

		// increment the count of unread tweets
		var count = this.state.count++;

		// increment the skip count
		var skip = this.state.skip++;

		// add the tweet to the current state
		updated.unshift(tweet);

		// set the state
		this.setstate({tweets:updated, count:count, skip:skip});
	},

	getInitialState: function (props) {

		// set props to either the parameter, else set it to the props (which are set on load)
		var props = props || this.props;

		return {
			tweets: props.tweets,
			count: 0,
			page: 0,
			paging: false,
			skip: 0,
			done: false
		}
	},

	componentWillReceiveProps: function (newProps, oldProps) {
		this.setState(getInitialState(newProps));
	},

	// called after the component is mounted for the first time on the client side
	componentDidMount: function () {

		// preserve self
		var self = this;

		// connect to socket
		var socket = io.connect();

		socket.on('tweet', function (tweet) {
			self.addTweet(tweet);
		});

		window.addEventListener('scroll', this.handleScroll);
	},

	render: function () {
		return (
			<Tweets tweets={this.state.tweets}/>
			<Loading page={this.state.page}/>
			<NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets}/>
		);
	}
});