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
          			alert("Wrong password")
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
	
