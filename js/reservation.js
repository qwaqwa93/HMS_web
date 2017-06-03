$(document).ready(function() {
	var reserveBtn = document.getElementById('button-reserve');
	var fromd = document.getElementById('from-date');
	var tod = document.getElementById('to-date');

    reserveBtn.onclick = function() {
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
    		}
    	}
  }	
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
	
	$(window).on("beforeunload", function() { 
		firebase.auth().signOut().then(function() {
 	 	// Sign-out successful.
		}, function(error) {
  		// An error happened.
		});
	});
})