$(document).ready(function() {
	$('#from-date').datepicker({ 
		language : 'ko', 
		pickTime : false,
		defalutDate : new Date()
	 });
	$('#to-date').datepicker({ 
		language : 'ko', 
		pickTime : false, 
		defalutDate : new Date() 
	});
	
	$(window).on("beforeunload", function() { 
		firebase.auth().signOut().then(function() {
 	 	// Sign-out successful.
		}, function(error) {
  		// An error happened.
		});
	});
})