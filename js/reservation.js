$(document).ready(function() {
  var userid = "!";
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userid = user.email;
  } else {
    // No user is signed in.
  }
});
	var fromd = document.getElementById('from-date');
	var tod = document.getElementById('to-date');

  var reserveBtn0 = document.getElementById('button-reserve0');
  var reserveBtn1 = document.getElementById('button-reserve1');
  var reserveBtn2 = document.getElementById('button-reserve2');
  var reserveBtn3 = document.getElementById('button-reserve3');
  function changeDateForm(from,to){
    var from_split = from.split("/");
    var to_split = to.split("/");
    var new_from = from_split[2] + from_split[0] + from_split[1];
    var new_to = to_split[2] + to_split[0] + to_split[1];
    return [new_from, new_to]
  }

  function makeReserve(roomNum){
      if((fromd.value == "") || (tod.value == "")){
        alert("체크인 / 체크아웃 날짜를 선택하셈")
      }
      else{
        var from_parts = fromd.value.split("/");
        var to_parts = tod.value.split("/");
        var f_date = new Date(from_parts[2],from_parts[0]-1,from_parts[1]);
        var t_date = new Date(to_parts[2],to_parts[0]-1,to_parts[1]);

        if(f_date > t_date){
          alert("체크아웃 날짜가 체크인 날짜보다는 뒤여야지 않겠니?");
        }
        else{
          alert(fromd.value + " ~ " + tod.value);
          var new_data_type = changeDateForm(fromd.value,tod.value);
          var newkey = firebase.database().ref("reservation/" + userid.replace(/\./gi, "^")).push().key;
          firebase.database().ref("reservation/" + userid.replace(/\./gi, "^") + "/" + newkey).set({
            roomNo:roomNum,
            fromDate:new_data_type[0],
            toDate:new_data_type[1]
          });
        }
      }
  }

    reserveBtn0.onclick = function() {
      alert("ho");
      makeReserve("0");
    }
    reserveBtn1.onclick = function() {
      makeReserve("1");
    }
    reserveBtn2.onclick = function() {
      makeReserve("2");
    }
    reserveBtn3.onclick = function() {
      makeReserve("3");
    }

    
	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
    	// User is signed in.
  	} else {
    	// No user is signed in.
    	window.location.href = "login.html";
  	}});

	$('#from-date').datepicker({ 
		language : 'ko', 
		pickTime : false,
		defalutDate : new Date()
	 });
	$('#to-date').datepicker({ 
		language : 'ko', 
		pickTime : false, 
		defalutDate : new Date() 
	});
	
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
