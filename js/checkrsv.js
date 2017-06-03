$(document).ready(function() {
	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
    	// User is signed in.
  	} else {
    	// No user is signed in.
    	window.location.href("login.html");
  	}});

	$('#button-logout').click(function(e) {
		firebase.auth().signOut().then(function() {
 	 	// Sign-out successful.
		window.location.href = 'login.html'
		}, function(error) {
  		// An error happened.
			window.location.href = 'login.html'
  			alert("이미 로그아웃 되어있습니다")
		});
	})
})