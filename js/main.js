$(document).ready(function() {
	removeEvent = firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
    	// User is signed in.
    	firebase.database().ref("security/" + user.email.replace(/\./gi, "^")).once('value').then( function(snapshot) {
    		if (snapshot.val().count > 4) {
    			firebase.auth().signOut().then(function() {
 	 				// Sign-out successful.
    				alert("비밀번호 입력 횟수를 초과했습니다\n관리자에게 문의하세요");
					window.location.href = 'login.html'
				})
    		}
    		else {
    			var updates = {};
                updates["security/" + email.replace(/\./gi, "^") + "/count"] = 0;
                firebase.database().ref().update(updates);
    		}
    	})
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
		removeEvent();
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
