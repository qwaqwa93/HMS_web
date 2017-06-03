$(document).ready(function() {
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
})