/** @jsx React.DOM */

var React = require('react');
var TwitterApp = require('./components/TwitterApp');

var tweets = JSON.parse(document.getElementById('initial-state').innerHTML);

React.renderComponent(
	<TwitterApp tweets={tweets}\>,
	document.getElementById('react-app')
);