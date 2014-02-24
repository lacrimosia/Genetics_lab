var jsonfile = 'js/data.json';
var data = JSON.parse(getData(jsonfile));
var fadeOutTransitiontime = 2000;
var numQuestions = data.questions.length;

var maxtries = 3;

var correctColor = '#0fc7a4';
var incorrectColor = 'red';

// set female traits
var femaleTraits = data.traits;
// set male traits and shuffle genotypes
var maleTraits = data.traits;

// maleTraitObject
var maleTraitObject = {};
console.log(data.traits);
console.log(maleTraits);
$.each(maleTraits, function(i, v){
console.log(v.name);
    console.log(shuffle(v.genotype));
    maleTraitObject[v.name] = v.genotype[0];

});
    console.log( maleTraitObject);

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

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// TODO: what is this doing here?
$('#closewelcome').tooltip();


function getData(jsonfile){
    return $.ajax({
        url:jsonfile,
        async: false,
        dataType: 'json'
    }).responseText;
}
