$( document ).ready(function() { 

	var signinBtn = document.getElementById('button-login');
	
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
        else if(errorCode) {
          alert("Invalid email or password")
        }
  			// ...
		});
		
	}

  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        window.location.href = 'main.html';

      } else {
        // No user is signed in.
      }
  });
})
	