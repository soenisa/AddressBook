Contacts = new Mongo.Collection("contacts");

if (Meteor.isClient) {

  Template.body.helpers({
    contacts: function() {
      return Contacts.find({}, {sort: {fname: 1}});
    },
   
  });

  Template.contactPanel.helpers({
     activeContact: function() {
      return Contacts.find(Session.get("activeContact"));
    }
  })

  Template.addContactForm.events({
    "submit form": function (event) {
      event.preventDefault();
      var fName = event.target.fName.value;
      var lName = event.target.lName.value;
      var num = event.target.num.value;

      Contacts.insert( {
        fname: fName,
        lname: lName,
        num: num,
        updated: new Date()
      });

      event.target.fName.value = "";
      event.target.lName.value = "";
      event.target.num.value = "";
    },
    "click .reset": function() {
      Meteor.call("removeAllPosts");
    }
  });

  Template.contact.events({
    "click button": function() {
      Session.set("activeContact", this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    Meteor.methods({
      removeAllPosts: function() {
        Contacts.remove({});
      }
    });
  });
}
