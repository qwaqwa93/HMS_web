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
          var new_data_type = changeDateForm(fromd.value,tod.value);
          var newkey = firebase.database().ref("reservation/" + userid.replace(/\./gi, "^")).push().key;
          firebase.database().ref("reservation/" + userid.replace(/\./gi, "^") + "/" + newkey).set({
            roomNo:roomNum,
            fromDate:new_data_type[0],
            toDate:new_data_type[1]
          })
      }
  }

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

    
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
      window.location.href = "login.html";
    }});

    var f_date = "";
    var t_date = "";

    function checkValid(){
      if((f_date != "") && (t_date != "")){
          var from_parts = f_date.split("/");
          var to_parts = t_date.split("/");
          var f_dat = new Date(from_parts[2],from_parts[0]-1,from_parts[1]);
          var t_dat = new Date(to_parts[2],to_parts[0]-1,to_parts[1]);

          if(f_dat > t_dat){
            alert("체크아웃 날짜가 체크인 날짜보다는 뒤여야지 않겠니?");
            return false;
          return true;
          }
      }
      return true;
    }

  $('#from-date').datepicker('setStartDate', new Date());

   $('#from-date').datepicker({ 
      language : 'ko', 
      pickTime : false,
      defalutDate : new Date()
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#to-date').datepicker('setStartDate', minDate);
    });

   $('#to-date').datepicker({ 
      language : 'ko', 
      pickTime : false, 
      defalutDate : new Date() 
   }).on('changeDate', function (selected) {
        var maxDate = new Date(selected.date.valueOf());
        $('#from-date').datepicker('setEndDate', maxDate);
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
