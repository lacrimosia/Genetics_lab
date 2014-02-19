//This document contains code only for the sliders


$(document).ready(function(){
	//slider 

	$('#slider').slider({
		value: 0,   //starting point of slider
		min: 0,
		max: 20,   //ending amount
		step: 10,   //snap to grid amount
		animate: 'slow',
		slide: function( event, ui ) { //put text at label
		$( ".label1" ).text(ui.value );
		},
		change: function(event, ui){
		if (ui.value == 10){
			$("#femalemonster img").fadeIn(2000).attr('src',"images/FemaleMonster/female_g_body.png");
   			return false;
		}else if(ui.value == 0){
			$("#femalemonster img").fadeIn(2000).attr('src',"images/FemaleMonster/female_b_body.png");
   			return false;
		}
	}
	});
	
});