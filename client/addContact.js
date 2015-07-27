
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
      var fname = event.target.addFName.value;
      var lname = event.target.addLName.value;
      var num = event.target.addNum.value;

      var persEmail = event.target.addPersEmail.value;
      var profEmail = event.target.addProfEmail.value;
      var twit = event.target.addTwit.value;
      var insta = event.target.addInsta.value;
      var youTube = event.target.addYouTube.value;

      var occ = event.target.addOcc.value;
      var assocs = Session.get("seshAssoc");

      console.log('Inserting ' + fname + ' ' + lname + ' into database...');
      var contactId = Contacts.insert( {
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

      //insert associations into Association collection
      // Also inert nonexistent Affiliations into Affiliates collection
      for(var i=0;i<assocs.length;i++) {
        assocs[i].contact_id = contactId;
        Associations.insert(assocs[i]);
        console.log('Inserting ' + assocs[i] + 'into Associations...');

        var affExists = Affiliates.find({name: assocs[i].affiliate}, {limit: 1}).count();
        if (affExists == 0) {
          console.log(assocs[i].affiliate + ' does not exist in Affiliates. Inserting...');
          Affiliates.insert( {
            name: assocs[i].affiliate
          });
        }
      }

      console.log('Contact insertion complete!~');


      event.target.addFName.value = "";
      event.target.addLName.value = "";
      event.target.addNum.value = "";
      event.target.addOcc.value = "";
      Session.set("seshAssoc", null);

    },
    "click .reset": function() {
      Meteor.call("removeAllContacts");
    },

    //Defunct, no longer needed but useful
   /* "autocompleteselect input": function(event, template, doc) {
     if (!Session.get('seshAssoc')) { // If Session has no values
        Session.set('seshAssoc', [doc]);
      } else {
        var currAffs = Session.get('seshAssoc').slice();
        currAffs.push(doc);
        Session.set('seshAssoc', currAffs);
      }
    }*/
  });