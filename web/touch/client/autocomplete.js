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
