$( document ).ready(function() { 

	var signupBtn = document.getElementById('button-signup');
	var cancelBtn = document.getElementById('button-cancel');

	signupBtn.onclick = function() {
		var email = document.getElementById('input-id').value;
		var password = document.getElementById('input-passwd').value;
		var name = document.getElementById('input-name').value;
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
			alert("성공적으로 가입되었습니다");
			window.location.href = 'login.html';
		}).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			if (errorCode == 'auth/invalid-email') {
  				alert("이메일이 형식에 맞지 않습니다");
  			}
  			else if(errorCode == 'auth/weak-password') {
  				alert("6자리보다 긴 비밀번호를 입력해 주세요")
  			}
  			else {
  				console.log(errorCode);
  			}
  			// ...
		});

	}

	cancelBtn.onclick = function() {
		window.location.href = 'login.html';
	}

});

