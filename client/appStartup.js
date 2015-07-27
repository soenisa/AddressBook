Template.contactView.helpers({
  contacts: function() {
    return Contacts.find({}, {sort: {fname: 1}});
  },
 activeContact: function() {
    return Contacts.find(Session.get("activeContact"));
  }
});


Template.contact.events({
  "click button": function() {
    Session.set("activeContact", this._id);
  }
});


Template.contactPanel.helpers({
  allAssociations: function() {
    console.log(this._id);
    return Associations.find({contact_id: this._id}, {sort: {affiliate: 1}});
  }
});
