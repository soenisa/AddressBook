Contacts = new Mongo.Collection('contacts');
Affiliates = new Mongo.Collection('affiliates');

if (Meteor.isClient) {

  Template.contactView.helpers({
    contacts: function() {
      return Contacts.find({}, {sort: {fname: 1}});
    },
   activeContact: function() {
      return Contacts.find(Session.get("activeContact"));
    }
  });

  Template.addContact.helpers({
    seshAffiliate: function() {
      Session.get("inputAffiliates");
    },
   settings: function() {
      return {
        position: "bottom",
        limit: 5,
        rules: [
          {
            collection: Affiliates,
            field: "name",
            matchAll: false,
            template: Template.pill
          }
        ]
      };
    }
  });

  Template.addContact.events({
    "submit form": function (event) {
      event.preventDefault();
      var fName = event.target.fName.value;
      var lName = event.target.lName.value;
      var num = event.target.num.value;
      var aff = event.target.aff.value;

      Contacts.insert( {
        fname: fName,
        lname: lName,
        num: num,
        affiliate: aff,
        updated: new Date()
      });

      var affExist = Affiliates.find({name: aff}, {limit: 1}).count();

      if (affExist == 0) {
        Affiliates.insert( {
          name: aff
        });
      }

      event.target.fName.value = "";
      event.target.lName.value = "";
      event.target.num.value = "";
      event.target.aff.value = "";
    },
    "click .reset": function() {
      Meteor.call("removeAllPosts");
    },
    "autocompleteselect input": function(event, template, doc) {
      console.log("selected ", doc);
      Session.set()
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
