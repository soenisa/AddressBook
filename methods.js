Meteor.methods({
  addContact: function(fname, lname, num, persEmail, profEmail, twit, insta, youTube) {
	  if (! Meteor.userId()) // Make sure user is logged in
    	throw new Meteor.Error("not-authorized");
    
	  return Contacts.insert( {
			first_name: fname,
			last_name: lname,
			num: num,
			personal_email: persEmail,
			professional_email: profEmail,
			twitter_handle: twit,
			instagram_handle: insta,
			youtube_handle: youTube,
			updated: new Date()
	  });
  },
  addAffiliate: function(name) {
		if (! Meteor.userId()) // Make sure user is logged in
			throw new Meteor.Error("not-authorized");

  	return Affiliates.insert({
  		name: name
  	});
  },
  addAssociation: function(assoc) {
		if (! Meteor.userId()) // Make sure user is logged in
			throw new Meteor.Error("not-authorized");

  	return Associations.insert(assoc);
  }
});