Contacts = new Mongo.Collection("contacts");

if (Meteor.isClient) {

  Template.body.helpers({
    contacts: function() {
      return Contacts.find({}, {sort: {fname: 1}});
    }
  });

  Template.addContactForm.events({
    "submit form": function (event) {
      event.preventDefault();
      console.log(event);
      var fName = event.target.fName;
      var lName = event.target.lName;
      var num = event.target.num;

      Contacts.insert( {
        fname: fName,
        lname: lName,
        num: num,
        updated: new Date()
      });

      event.target.fName.value = "";
      event.target.lName.value = "";
      event.target.num.value = "";
    }
  });

  Template.contact.events({
    "click button": function(event) {

    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
