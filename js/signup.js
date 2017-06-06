$( document ).ready(function() { 
	var signupBtn = document.getElementById('button-signup');
	var cancelBtn = document.getElementById('button-cancel');
	var theUser;

	signupBtn.onclick = function() {
		var email = document.getElementById('input-id').value;
		var password = document.getElementById('input-passwd').value;
		var name = document.getElementById('input-name').value;
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
			firebase.database().ref("security/" + email.replace(/\./gi, "^")).on('value', function(snapshot) {
				if(snapshot) {
					alert("가입되었습니다 \n확인을 누르시면 곧 로그인 페이지로 이동합니다");
					firebase.auth().signOut();
					setTimeout(function() {
						window.location.href = 'login.html';
					}, 2000);
				}
			});
			firebase.database().ref("security/" + email.replace(/\./gi, "^")).set({
				count: 0,
				uid: user.uid
			});
			//alert("성공적으로 가입되었습니다");
			//window.location.href = 'login.html';
			//theUser = user;
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
				alert("이미 사용중인 이메일 주소 입니다");
  				console.log(errorCode);
  			}
  			// ...

		});
		/*firebase.database().ref("security/" + email.replace(/\./gi, "^")).set({
				count: 0,
				uid: theUser.uid
			});
			alert("성공적으로 가입되었습니다");*/
		//window.location.href = 'login.html';
	}

	cancelBtn.onclick = function() {
		window.location.href = 'login.html';
	}

});

