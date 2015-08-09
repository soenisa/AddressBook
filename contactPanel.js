Template.contactPanel.helpers({
	populateSingles: function() {
		console.log(this._id);
		return getSingles(this._id);
	}
});