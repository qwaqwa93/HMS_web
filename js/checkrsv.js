var numRoom = 0;
var rooms = [];
roomnames = ["나연방", "사나방","다현방", "쯔위방"];
$(document).ready(function() {
	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
    	// User is signed in.
    	userid = user.email.replace(/\./gi, "^");
		initRooms(userid);
  	} else {
    	// No user is signed in.
	alert("비정상적인 접근입니다");
    	window.location.href = "login.html";
  	}});

	$('#button-logout').click(function(e) {
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

	$('#rooms').on('click', '.btn', function(e){
		var result = confirm("정말 취소하시겠습니까?");
		if (result) {
    		//Logic to delete the item
			target = $(this).parents('.showroom').attr("id")
			firebase.database().ref("reservation/" + userid + "/" + target).set(null);
		}
	})

})

function initRooms(userid) {
	firebase.database().ref("reservation/" + userid).orderByChild('fromDate').on('value', function(snapshot) {
		var result = snapshot.val();
		if(snapshot.numChildren() != numRoom) {
			numRoom = snapshot.numChildren();

			clear();
			snapshot.forEach(function(roomsnap) {
				let room = roomsnap.val();
				room.id = roomsnap.key;
				rooms.push(room);
				renderRooms(room);
			})
		}
	}) 
}

function clear() {
	rooms = [];
	$('#rooms').children().remove();
}

function renderRooms(room) {
	var newRoom = $('#room-template').clone();
	newRoom.css("display", "block");
	newRoom.attr('id', room.id);
	newRoom.find('.room-image').attr('src', "../image/room" + room.roomNo + ".jpg");
	newRoom.find('.room-name').html(roomnames[room.roomNo]);
	fromDate = room.fromDate.toString();
	toDate = room.toDate.toString();
	if (toDate.localeCompare(today()) < 0) {
		newRoom.append($('<div/>', {
        	class: 'blur'
    	}));
		newRoom.find('.btn').attr('disabled', true);
	}
	var sdate = fromDate.substring(0,4) + "-" + fromDate.substring(4,6) + "-" + fromDate.substring(6);
	var edate = toDate.substring(0,4) + "-" + toDate.substring(4,6) + "-" + toDate.substring(6);
	newRoom.find('.sdate').html(sdate);
	newRoom.find('.edate').html(edate);

	$('#rooms').append(newRoom);
}

function today(){
   
    var date = new Date();
   
    var year  = date.getFullYear();
    var month = date.getMonth() + 1;
    var day   = date.getDate();
    
    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
       
	return "" + year + month + day;  
}