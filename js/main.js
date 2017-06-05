$(document).ready(function() {
	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
    	// User is signed in.
  	} else {
    	// No user is signed in.
	alert("비정상적인 접근입니다");
    	window.location.href = "login.html";
  	}});

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
		firebase.auth().signOut().then(function() {
 	 	// Sign-out successful.
		alert("로그아웃 되었습니다");
		window.location.href = 'login.html'
		}, function(error) {
  		// An error happened.
			window.location.href = 'login.html'
  			alert("이미 로그아웃 되어있습니다")
		});
	})
/*
	$(window).on("beforeunload", function() { 
		firebase.auth().signOut().then(function() {
 	 	// Sign-out successful.
		}, function(error) {
  		// An error happened.
		});
	});
	*/
})
