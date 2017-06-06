$(document).ready(function() {
  var userid = "!";
  removeEvent = firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userid = user.email;
      firebase.database().ref("security/" + user.email.replace(/\./gi, "^")).once('value').then( function(snapshot) {
        if (snapshot.val().count > 4) {
        removeEvent();
          firebase.auth().signOut().then(function() {
          // Sign-out successful.
            alert("비밀번호 입력 횟수를 초과했습니다\n관리자에게 문의하세요");
          window.location.href = 'login.html'
        })
        }
        else {
          var updates = {};
          updates["security/" + user.email.replace(/\./gi, "^") + "/count"] = 0;
          firebase.database().ref().update(updates);
        }
      })
  } else {
    // No user is signed in.
    alert("비정상적인 접근입니다");
    window.location.href = "login.html";
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
        alert("체크인 / 체크아웃 날짜를 선택하세요")
      }
      else{
      	  if(confirm("결제 하시겠습니까?")){
      	  	var result = checkValid();
      	  	  if(result[roomNum*1]){
		          var new_data_type = changeDateForm(fromd.value,tod.value);
		          var newkey = firebase.database().ref("reservation/" + userid.replace(/\./gi, "^")).push().key;
		          firebase.database().ref("reservation/" + userid.replace(/\./gi, "^") + "/" + newkey).set({
		            roomNo:roomNum,
		            fromDate:new_data_type[0],
		            toDate:new_data_type[1]
		          })
		          alert("예약이 완료되었습니다"); 
					window.location.href = 'checkrsv.html'
      	  	  }
      	  	  else{
      	  	  	alert("이미 예약이 완료되었습니다. 아쉽지만 다음 기회에~");
      	  	  }

      	  }
      	  else{

      	  }
      }
  }

  firebase.database().ref("reservation").on('value', function(snapshot) {
    checkValid();
  })

    reserveBtn0.onclick = function() {
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

    var f_date = "";
    var t_date = "";





    function checkValid(){
      if((f_date != "") && (t_date != "")){
          var from_parts = f_date.split("/");
          var to_parts = t_date.split("/");
          var f_dat = new Date(from_parts[2],from_parts[0]-1,from_parts[1]);
          var t_dat = new Date(to_parts[2],to_parts[0]-1,to_parts[1]);

          var from_date_picked = from_parts[2] + from_parts[0] + from_parts[1];
          var to_date_picked = to_parts[2] + to_parts[0] + to_parts[1]

          if(f_dat > t_dat){
            alert("체크아웃 날짜가 체크인 날짜보다 빠를수는 없습니다.");
            return false;
          }
          else{
          	var room_state = [true, true, true, true];

          	firebase.database().ref("reservation").once("value",function(snap){
          		snap.forEach(function(userSnap){
          			userSnap.forEach(function(roomSnap){
          				let room = roomSnap.val();

          				var from_date_db = room.fromDate;
          				var to_date_db = room.toDate;
          				var roomNum = room.roomNo*1;

          				if( (from_date_db.localeCompare(to_date_picked) <= 0) && (from_date_picked.localeCompare(to_date_db) <= 0) ){
          					room_state[roomNum] = false;
          				}
          			});
          		});
			  $('#button-reserve0').attr("disabled",!room_state[0]);
			  $('#button-reserve1').attr("disabled",!room_state[1]);
			  $('#button-reserve2').attr("disabled",!room_state[2]);
			  $('#button-reserve3').attr("disabled",!room_state[3]);
          	});


          }
      }
      return room_state;
    }

  $('#from-date').datepicker('setStartDate', new Date());

   $('#from-date').datepicker({ 
      language : 'ko', 
      pickTime : false,
      defalutDate : new Date()
    }).on('changeDate', function (selected) {
    	f_date = this.value;

    	checkValid();
        var minDate = new Date(selected.date.valueOf());
        $('#to-date').datepicker('setStartDate', minDate);
    });

   $('#to-date').datepicker({ 
      language : 'ko', 
      pickTime : false, 
      defalutDate : new Date() 
   }).on('changeDate', function (selected) {
    	t_date = this.value;
    	checkValid();
        var maxDate = new Date(selected.date.valueOf());
        $('#from-date').datepicker('setEndDate', maxDate);
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
})
