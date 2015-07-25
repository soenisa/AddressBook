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
      console.log(Session.get("seshAff"));
      return Session.get("seshAff");
    },
   settings: function() {
      return {
        position: "bottom",
        limit: 5,
        rules: [
          {
            collection: Affiliates,
            field: "name",
            noMatchTemplate: Template.noMatchAffiliate,
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
      var aff = Session.get("seshAff");

      Contacts.insert( {
        fname: fName,
        lname: lName,
        num: num,
        affiliates: aff,
        updated: new Date()
      });


      for(var i=0;i<aff.length;i++) {
        var affExist = Affiliates.find({name: aff[i]}, {limit: 1}).count();
        if (affExist == 0) {
          console.log(aff[i].name);
          Affiliates.insert( {
            name: aff[i].name
          });
        }
      }


      event.target.fName.value = "";
      event.target.lName.value = "";
      event.target.num.value = "";
      event.target.aff.value = "";
      Session.set("seshAff", null);
    },
    "click .reset": function() {
      Meteor.call("removeAllContacts");
      Meteor.call("removeAllAffiliates");
    },
    "autocompleteselect input": function(event, template, doc) {
      if (!Session.get('seshAff')) { // If Session has no values
        Session.set('seshAff', [doc]);
      } else {
        var currAffs = Session.get('seshAff').slice();
        currAffs.push(doc);
        Session.set('seshAff', currAffs);
      }
  }
  });

  Template.addAffListItem.events({
    "click button": function() {
      console.log('hey you clicked it!!!');
      console.log(this);
      var currAffs = Session.get('seshAff').slice(indexOf(this));
      Session.set('seshAff', currAffs);
    }
  })

  Template.contact.events({
    "click button": function() {
      Session.set("activeContact", this._id);
    }
  });

  Template.noMatchAffiliate.events({
    // When unmatched item is clicked
    click: function(event, template, doc) {
      var aff = {name: this.filter};
      console.log('Filter is: ' + aff);      

      if (!Session.get('seshAff')) { // If Session has no values
          Session.set('seshAff', [aff]);
        } else {
          var currAffs = Session.get('seshAff').slice();
          currAffs.push(aff);
          Session.set('seshAff', currAffs);
        }
      } 
  });

  Template.contactPanel.helpers({
    allAffiliates: function() {
      return this.affiliates;
    }
  });

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    Meteor.methods({
      removeAllContacts: function() {
        Contacts.remove({});
        Affiliates.remove({});
      }
  });
});
}