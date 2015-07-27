Meteor.startup(function () {
    // code to run on server at startup

    Meteor.methods({
      removeAllContacts: function() {
        Contacts.remove({});
        Affiliates.remove({});
        Associations.remove({});
      }
  });
});