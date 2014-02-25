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

// body colors
var bodyColors = data.bodycolor;

// maleTraitObject
var maleTraitObject = {};

// set a few defaults for male
maleTraitObject['gender'] = 'male';
maleTraitObject['bodycolor'] = shuffle(bodyColors)[0];


// we shuffle all of the genotypes for each trait
// so that we can generate the male
$.each(maleTraits, function(i, v){
    shuffle(v.genotype);
    maleTraitObject[v.name] = v.genotype[0];
});

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

    // build our male monster
    console.log( maleTraitObject);
    console.log(maleTraitObject['Tail Shape'][Object.keys(maleTraitObject['Tail Shape'])]);
    
    // tail
    // male_tail_o/p_curled/straight.png
    var maleTail = getTailImageName(maleTraitObject);
    console.log(maleTail);
    // body

    // horn

    // toes
    
    // claws

    // ears

    // teeth

    // eye

    //eyelid

});

function openHelpDialog() {
    $('#helpMessage').dialog({
        autoOpen: true,
        modal: true,
	resizable: false,
	//title: "Transcription: DNA to RNA",
        
        width: '650px',
        height: 'auto',
	position: {my: 'center', at: 'center', of: 'div'},
        
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

// HEAD
//gender, bodyType, color, shape
//image name generator
function setImageName(bodyTraits) {
    // Object
    // Claws: Object
    // Color-Blindness: Object
    // Ear Shape: Object
    // Eye: Object
    // Eye Color (incomplete): Object
    // Feet: Object
    // Horn Color: Object
    // Skin Color (codominant): Object
    // Tail: Object
    // Tail Color: Object
    // Tail Shape: Object
    // Teeth: Object
    
    // start our file name
    // gender_bodypart_shape_size_color_number.png
    // male_toes_na_na_b_4.png
    // male_body_na_na_g_na.png

    // walk through each part of the name

    // gender
    var filename = bodyTraits['gender'] + '_';

    // bodypart
    filename = filename + bodyTraits['bodycolor'] + '_';
    
    // shape
    console.log(bodyTraits['Tail Shape']);
    // if (bodyTraits['shape']
    // ])
    
}

function getTailImageName(bodyTraits) {
    // returns the name of the tail image
    // gender
    var filename = bodyTraits['gender'] + '_';
    // color
    filename = filename + bodyTraits['Tail Color'][Object.keys(bodyTraits['Tail Color'])].image + '_';
    // shape
    filename = filename + bodyTraits['Tail Shape'][Object.keys(bodyTraits['Tail Shape'])].image + '_tail.png';

    return filename;
}

function getData(jsonfile){
    return $.ajax({
        url:jsonfile,
        async: false,
        dataType: 'json'
    }).responseText;
}
// cd217be17d7271cc575877ce9c20363e03ef340b
