
var defaultPx = 1;
var picZoomScale = 1.10;

Mousetrap.bind('h', function(e){
    myPreventDefault(e);

    $('#welcomediv').dialog('open');
});


// pick up an item
// drop an item
// move an item with left and right
// tab through?


Mousetrap.bind('right', function(e){
    myPreventDefault(e);

    //var draggable = $(':focus').parent();
	var draggable = $(':focus');
	console.log($(':focus').parent().children());
    // if draggable.data('dropped') == false, the object
    // is in the air and can move
    if (draggable.data('dropped') == false ) {
        var container = $('#scaleSurface');
        var distance = defaultPx;
	// Distance in pixels the draggable should be moved
	
        position = draggable.offset();
	var x = parseInt(position.left) + parseInt(distance);
	position.left = x;
	$(draggable).offset({
	    'left':x
	}); 
   }
});

Mousetrap.bind('left', function(e){
    myPreventDefault(e);

    var draggable = $(':focus').parent();
    // if draggable.data('dropped') == false, the object
    // is in the air and can move
    if (draggable.data('dropped') == false ) {
        var container = $('#scaleSurface');
        var distance = defaultPx;
	// Distance in pixels the draggable should be moved
	
        position = draggable.offset();
	var x = parseInt(position.left) - parseInt(distance);
	position.left = x;
	$(draggable).offset({
	    'left':x
        }); 
    }
});

Mousetrap.bind('up', function(e){
    myPreventDefault(e);

    draggable = $(':focus').parent();

    // if draggable.data('dropped') == false, the object
    // is in the air and can move
    if (draggable.data('dropped') == false ) {
        var container = $('#scaleSurface');
        // Distance in pixels the draggable should be moved
        var distance = defaultPx;
        
        position = draggable.offset();
        var y = parseInt(position.top) - parseInt(distance);
        position.top = y;
        $(draggable).offset({
	    'top':y
        }); 
    }
});

Mousetrap.bind('down', function(e){
    myPreventDefault(e);

    var draggable = $(':focus').parent();
    // if draggable.data('dropped') == false, the object
    // is in the air and can move
    if (draggable.data('dropped') == false ) {
        var container = $('#scaleSurface');
        var distance = defaultPx;
        // Distance in pixels the draggable should be moved

        position = draggable.offset();
        var y = parseInt(position.top) + parseInt(distance);
        position.top = y;
        $(draggable).offset({
	    'top':y
        }); 	
    }
});

Mousetrap.bind('return', function(e){
    myPreventDefault(e);

    var container = $('scaleSurface');
    var draggable = $(':focus').parent();
    var draggableId = draggable.attr('id');

    // if on div modeoff, we toggle the scale on/off
    if (draggableId == 'modeoff') {
        // we toggle display on and off
        toggleUnits();
    } else if (draggableId == 'zeroon') {
        // we zero out the display
        setDisplayToZero();
    }
    // if draggable.data('dropped') == undefined, or == true, then the obj is on ground
    // otherwise, the object is in the air
    if (draggable.data('dropped') == undefined) {
        draggable.data('dropped', false);
        // set item as not on the scale by default
        draggable.data('onscale', false);
    } else if (draggable.data('dropped') == false){
        draggable.data('dropped', true);
    } else {
        draggable.data('dropped', false);
    }

    var one = $(':focus').children();
    offset = draggable.offset();

    // set our boundaries for the scaleSurface (to test if we drop something on the scaleSurface)
    var scaleTopLeft = parseInt($('#scaleSurface').css('top'));
    var scaleBottomLeft =  parseInt($('#scaleSurface').css('top')) +  parseInt($('#scaleSurface').css('height'));
    var scaleBorderLeft = parseInt($('#scaleSurface').css('left'));
    var scaleBorderRight = parseInt($('#scaleSurface').css('left')) +  parseInt($('#scaleSurface').css('width'));
    // console.log('tl:'+ scaleTopLeft+' bl:'+scaleBottomLeft+' borderleft: '+scaleBorderLeft+' borderRight: '+scaleBorderRight);
    // console.log('offset.top: '+offset.top+' offset.left: '+offset.left);

    if (draggable.attr('class') != 'btnHelp'){
        if (draggable.data('dropped') == true) {
            // check to see if we landed on the scale
            if(parseInt(offset.top) < parseInt(scaleBottomLeft) 
               && parseInt(offset.top) > parseInt(scaleTopLeft) 
               && parseInt(offset.left) > parseInt(scaleBorderLeft) 
               && parseInt(offset.left) < parseInt(scaleBorderRight)) {
	        addItemToScale({draggable:draggable});
                draggable.data('onscale', true);
            }
            $(one).width($(one).data('width'));
            $(one).height($(one).data('height'));
        } else {
            // we enlarge the image to mimic lifting the object
            if ($(one).data('width') == undefined ) {
                $(one).data('width', $(one).width());
                $(one).data('height', $(one).height());
            }
            $(one).width($(one).width()*picZoomScale);
            $(one).height($(one).height()*picZoomScale);
            if (draggable.data('onscale') == true) {
                removeItemFromScale({helper:draggable});
                draggable.data('onscale', false);
            }

        }
    } else {
        // we open the help div
         $('#welcomediv').dialog('open');
    }
});


function myPreventDefault(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        // internet explorer
        e.returnValue = false;
    }
}