$( document ).ready(function() { 

	var signinBtn = document.getElementById('button-login');
	var signupBtn = document.getElementById('button-signup');

  	signupBtn.onclick = function() {
    		window.location.href = 'signup.html';
  	}

	signinBtn.onclick = function() {
		//alert('signin')
		var email = document.getElementById('input-id').value;
		var password = document.getElementById('input-passwd').value;

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			if (errorCode == 'auth/invalid-email') {
  				alert("Enter a valid email");
  			}
       			else if(errorCode == 'auth/wrong-password') {
          			//alert("Wrong password")
                firebase.database().ref("security/" + email.replace(/\./gi, "^")).once('value').then(function(snapshot) {
                  theUser = snapshot.val();
                  if (theUser.count > 4) {
                    // Ban user
                    alert("관리자에게 문의하세요");
                  }
                  else {
                    var updates = {};
                    updates["security/" + email.replace(/\./gi, "^") + "/count"] = theUser.count + 1;
                    firebase.database().ref().update(updates);
                    if (theUser.count == 4) { alert("비밀번호 입력 횟수를 초과했습니다\n관리자에게 문의하세요")}
                    else {alert("비밀번호가 잘못되었습니다 \n남은 시도 횟수: " + (4 - theUser.count));}
                  }
                })
        		}
			else{
				console.log(errorCode);
			}

  			// ...
		});
  	firebase.auth().onAuthStateChanged(function(user) {
      		if (user) {
        		// User is signed in.
        		window.location.href = 'main.html';
      		} else {
        		// No user is signed in.
      		}
  	});
	}

  $('#input-passwd').keyup(function(e) {
    if(e.keyCode == 13) {
      $('#button-login').click();
    }
  })
  
  $('#input-id').keyup(function(e) {
    if(e.keyCode == 13) {
      $('#button-login').click();
    }
  })
})
	
