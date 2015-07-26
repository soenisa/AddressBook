Contacts = new Mongo.Collection('contacts');
Affiliates = new Mongo.Collection('affiliates');
Associations = new Mongo.Collection('associations');

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
    seshAssociations: function() {
      return Session.get("seshAssoc");
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
    "click #add_assoc": function(event) {
      var aff = document.getElementById('addAff').value; // This seems hacky TODO: be smarter?
      var occ = document.getElementById('addOcc').value;
      console.log(aff);
      console.log(occ);

      var assoc = { occupation: occ,
                    affiliate: aff};
      //add association to Session
      if (!Session.get('seshAssoc')) { // If Session has no values
        Session.set('seshAssoc', [assoc]);
      } else {
        var currAffs = Session.get('seshAssoc').slice();
        currAffs.push(assoc);
        Session.set('seshAssoc', currAffs);
      }

      document.getElementById('addAff').value = "";
      document.getElementById('addOcc').value = "";
    },
    "submit form": function (event) {
      event.preventDefault();
      console.log('this is working now');
      var fname = event.target.addFName.value;
      var lname = event.target.addLName.value;
      var num = event.target.addNum.value;
      var occ = event.target.addOcc.value;
      var assocs = Session.get("seshAssoc");

      Contacts.insert( {
        fname: fname,
        lname: lname,
        num: num,
        associations: assocs,
        updated: new Date()
      });


      for(var i=0;i<assocs.length;i++) {
        Associations.insert(assocs[i]);

        var affExists = Affiliates.find({name: assocs[i].affiliate}, {limit: 1}).count();
        if (affExists == 0) {
          console.log(assocs[i].affiliate);
          Affiliates.insert( {
            name: assocs[i].affiliate
          });
        }
      }


      event.target.addFName.value = "";
      event.target.addLName.value = "";
      event.target.addNum.value = "";
      event.target.addOcc.value = "";
      Session.set("seshAssoc", null);
    },
    "click .reset": function() {
      Meteor.call("removeAllContacts");
    },
    "autocompleteselect input": function(event, template, doc) {
     if (!Session.get('seshAssoc')) { // If Session has no values
        Session.set('seshAssoc', [doc]);
      } else {
        var currAffs = Session.get('seshAssoc').slice();
        currAffs.push(doc);
        Session.set('seshAssoc', currAffs);
      }
  }
  });

  Template.addAffListItem.events({
    "click button": function() {
      console.log('hey you clicked it!!!');
      console.log(this);
      var currAffs = Session.get('seshAssoc').slice(indexOf(this));
      Session.set('seshAssoc', currAffs);
    }
  })

  Template.contact.events({
    "click button": function() {
      Session.set("activeContact", this._id);
    }
  });

  Template.noMatchAffiliate.events({
    // When unmatched item is clicked
    click: function(event) {
      var aff = {name: this.filter};
      console.log('Filter is: ' + aff);      

      if (!Session.get('seshAssoc')) { // If Session has no values
          Session.set('seshAssoc', [aff]);
        } else {
          var currAffs = Session.get('seshAssoc').slice();
          currAffs.push(aff);
          Session.set('seshAssoc', currAffs);
        }
      } 
  });

  Template.contactPanel.helpers({
    allAssociations: function() {
      return this.associations;
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