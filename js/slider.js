//This document contains code only for the sliders
var seconds = 'linear';
var ease = 'linear';
var overlay = 1;

$(document).ready(function(){
	
	//show female default
	$('#blue-body').show();
	
	
	//slider one -- skin color
	$('#slider').slider({
		value: 0,   //starting point of slider
		min: 0,
		max: 20,   //ending amount
		step: 10,   //snap to grid amount
		animate: 'slow',
		slide: function( event, ui ) { //put text at label
		//$( ".label1" ).text(ui.value );
		},
		change: function(event, ui){
		if (ui.value == 0){
			$("#green-body").hide();
			$("#blue-green-body").hide();
			$("#blue-body").fadeIn(seconds).show();
   			return false;
		}else if(ui.value == 10){
			$("#blue-body").hide();
			$("#green-body").hide();
			$("#blue-green-body").fadeIn(seconds).show();
   			return false;
		}else if(ui.value == 20){
			$("#blue-body").hide();
			$("#blue-green-body").hide();
			$("#green-body").fadeIn(seconds).show();
   			return false;
		}
	}
	});
	
/*		$('#slider').slider({
		value: 0,   //starting point of slider
		min: 0,
		max: 20,   //ending amount
		step: 10,   //snap to grid amount
		animate: 'slow',
		slide: function( event, ui ) { //put text at label
		//$( ".label1" ).text(ui.value );
		},
		change: function(event, ui){
		if (ui.value == 0){
			$("#femalemonster img").fadeIn(seconds,ease).attr('src',"images/FemaleMonster/female_b_body.png");
   			return false;
		}else if(ui.value == 10){
			$("#femalemonster img").fadeIn(seconds, ease).attr('src',"images/FemaleMonster/female_bg_body.png");
   			return false;
		}else if(ui.value == 20){
			$("#femalemonster img").fadeIn(seconds, ease).attr('src',"images/FemaleMonster/female_g_body.png");
   			return false;
		}
	}
	});*/
	
	//slider two -- tail
	$('#slider2').slider({
		value: 0,   //starting point of slider
		min: 0,
		max: 20,   //ending amount
		step: 10,   //snap to grid amount
		animate: 'slow',
		slide: function( event, ui ) { //put text at label
		//$( ".label1" ).text(ui.value );
		},
		change: function(event, ui){
		
		$('.tail').css('z-index','1');	
		
		if (ui.value == 0){
			$("#p_straight_tail").hide();
			$("#o_straight_tail").hide();
			$("#p_curled_tail").fadeIn(seconds).show();
   			return false;
		}else if(ui.value == 10){
			$("#p_curled_tail").hide();
			$("#o_straight_tail").hide();
			$("#p_straight_tail").fadeIn(seconds).show();
   			return false;
		}else if(ui.value == 20){
			$("#p_curled_tail").hide();
			$("#p_straight_tail").hide();
			$("#o_straight_tail").fadeIn(seconds).show();
   			return false;
		}
	}
	});
	
	
/*	//slider two -- tail
	$('#slider2').slider({
		value: 0,   //starting point of slider
		min: 0,
		max: 20,   //ending amount
		step: 10,   //snap to grid amount
		animate: 'slow',
		slide: function( event, ui ) { //put text at label
		//$( ".label1" ).text(ui.value );
		},
		change: function(event, ui){
		
		if (ui.value == 0){
			$('#femalemonster img').css('z-index', 'overlay');
			$("#femalemonster img").html('<img src="images/FemaleMonster/female_p_curled_tail.png"/>');
   			return false;
		}else if(ui.value == 10){
			$('#femalemonster img').css('z-index', 'overlay');
			$("#femalemonster img").html('<img src="images/FemaleMonster/female_p_straight_tail.png"/>');
   			return false;
		}else if(ui.value == 20){
			$('#femalemonster img').css('z-index', 'overlay');
			$("#femalemonster img").html('<img src="images/FemaleMonster/female_o_straight_tail.png"/>');
   			return false;
		}
	}
	});
*/
	
});