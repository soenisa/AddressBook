Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('contactView', {path: '/'});
	this.route('addContact', {path: '/addContact'});
});