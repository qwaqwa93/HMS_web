$(document).ready(function() {
	$(window).on("beforeunload", function() { 
		firebase.auth().signOut().then(function() {
 	 	// Sign-out successful.
		}, function(error) {
  		// An error happened.
		});
	});
})