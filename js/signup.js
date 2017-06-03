$( document ).ready(function() { 

	var signupBtn = document.getElementById('button-signup');
	var 

	signupBtn.onclick = function() {
		var email = document.getElementById('input-id').value;
		var password = document.getElementById('input-passwd').value;
		
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
			alert("성공적으로 가입되었습니다")
			window.location.href = 'login.html';
		}).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			if (errorCode == 'auth/invalid-email') {
  				alert("Enter a valid email");
  			}
  			// ...
		});
	}
});

