//this document contains code for the dialog box and buttons

$(document).ready(function() {
    //reload page
    $('#Clear').click(function(){
	location.reload();
	return false;
    });

    // open instructional dialog on documentready
    openHelpDialog();
    
    // click to open instructional dialog
    $('#help').click(function(){
        openHelpDialog();
    });
    
    $('#helpMessage').dialog('open').on('keydown', function(evt) {
        if (evt.keyCode === $.ui.keyCode.ESCAPE) {
            $('#helpMessage').dialog('close');
            startQuiz(questionOrder);
        }                
        evt.stopPropagation();
    });
	
	//close dialog on click
    $('#closewelcome').click(function() {
        $('#helpMessage').dialog('close');
        $('#divBottom').removeClass('hide');
    });
});

function openHelpDialog() {
    $('#helpMessage').dialog({
        autoOpen: true,
        modal: true,
	resizable: false,
	//title: "Transcription: DNA to RNA",
        
        width: '650px',
        height: 'auto',
	position: {my: 'center', at: 'center', of: 'body'},
        
        show: 'fade',
        hide: 'fade',
        
        open: function () {
            $('.ui-widget-overlay', this).hide().fadeIn();
            
            $('.ui-icon-closethick').bind('click.close', function () {
                $('.ui-widget-overlay').fadeOut(function () {
                    $('.ui-icon-closethick').unbind('click.close');
                    $('.ui-icon-closethick').trigger('click');
                });
                
                return false;
            });
        }
    });
    $('#helpMessage').css("margin-left","0px");
}

$('#closewelcome').tooltip();
