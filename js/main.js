$(document).ready(function() {
	$('#main-image').mouseover(function(e) {
		$(".hover-effect").removeClass("hov");     
    	$(e.target).addClass("hov");
    	$("#main-image").css('opacity', 0.5);
  		return false;
	}).mouseout(function(e) {
    	$(this).removeClass("hov");
    	$("#main-image").css('opacity', 1);
	});
	$('#button-logout').click(function(e) {
		window.location.href = 'login.html'
		firebase.auth().signOut().then(function() {
 	 	// Sign-out successful.
		}, function(error) {
  		// An error happened.
		});
	})
})
