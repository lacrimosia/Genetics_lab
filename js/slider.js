//This document contains code only for the sliders
var seconds = 2000;
var ease = 'linear';
var overlay = 1;

$(document).ready(function(){
	//preload images 	
	
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
			$('#femalemonster').find($('span.monsterbody')).html('<img src="images/FemaleMonster/female_b_body.png" />');
			
		}else if(ui.value == 10){
			//$('span.monsterbody').prepend('<img src="images/FemaleMonster/female_bg_body.png"/>');
			$('#femalemonster').find($('span.monsterbody')).html('<img src="images/FemaleMonster/female_bg_body.png"/>');
	
   			return false;
			
		}else if(ui.value == 20){
			$('#femalemonster').find($('span.monsterbody')).html('<img src="images/FemaleMonster/female_g_body.png"/>');
		
   			return false;
		}
	}
	});
	
	//slider two - tail
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
			$('#femalemonster').find($('span.tail')).html('<img src="images/FemaleMonster/female_o_curled_tail.png" />');
			
		}else if(ui.value == 10){
			//$('span.monsterbody').prepend('<img src="images/FemaleMonster/female_bg_body.png"/>');
			$('#femalemonster').find($('span.tail')).html('<img src="images/FemaleMonster/female_o_straight_tail.png"/>');
	
   			return false;
			
		}else if(ui.value == 20){
			$('#femalemonster').find($('span.tail')).html('<img src="images/FemaleMonster/female_p_curled_tail.png"/>');
		
   			return false;
		}
	}
	});
	
	
	//slider three - Horn Color
	//only two phase changes
		$('#slider3').slider({
		value: 0,   //starting point of slider
		min: 0,
		max: 20,   //ending amount
		step: 20,   //snap to grid amount
		animate: 'slow',
		slide: function( event, ui ) { //put text at label
		//$( ".label1" ).text(ui.value );
		},
		change: function(event, ui){
		if (ui.value == 0){
			$('#femalemonster').find($('span.horn')).html('<img src="images/FemaleMonster/female_white_horn.png" />');
			
		}else if(ui.value == 20){
			$('#femalemonster').find($('span.horn')).html('');
	
   			return false;
			
		}
	}
	});
	
	//slider 4 - Toes
$('#slider4').slider({
		value: 0,   //starting point of slider
		min: 0,
		max: 20,   //ending amount
		step: 10,   //snap to grid amount
		animate: 'slow',
		slide: function( event, ui ) { //put text at label
		//$( ".label1" ).text(ui.value );
		},
		change: function(event, ui){//four toes
		if (ui.value == 0){
			$('#femalemonster').find($('span.toes')).html('<img src="images/FemaleMonster/female_o_curled_tail.png" />');
			
		}else if(ui.value == 10){ //four toes
			//$('span.monsterbody').prepend('<img src="images/FemaleMonster/female_bg_body.png"/>');
			$('#femalemonster').find($('span.toes')).html('<img src="images/FemaleMonster/female_o_straight_tail.png"/>');
	
   			return false;
			
		}else if(ui.value == 20){ //two toes
			$('#femalemonster').find($('span.toes')).html('<img src="images/FemaleMonster/female_p_curled_tail.png"/>');
		
   			return false;
		}
	}
	});
	
});