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

// set a few defaults for male
maleTraitObject['gender'] = 'male';

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
    //openHelpDialog();
    
    // click to open instructional dialog
    // $('#help').click(function(){
    //     openHelpDialog();
    // });
    
    // $('#helpMessage').dialog('open').on('keydown', function(evt) {
    //     if (evt.keyCode === $.ui.keyCode.ESCAPE) {
    //         $('#helpMessage').dialog('close');
    //         startQuiz(questionOrder);
    //     }                
    //     evt.stopPropagation();
    // });
	
    //     //close dialog on click
    // $('#closewelcome').click(function() {
    //     $('#helpMessage').dialog('close');
    //     $('#divBottom').removeClass('hide');
    // });

    // build our male monster
    console.log( maleTraitObject);
    
    // tail
    // male_tail_o/p_curled/straight.png
    var maleTail = getImageName('tail', maleTraitObject);
    addMonsterImage('malemonster', 'tail', maleTail);
    // body
    var maleBody = getImageName('body', maleTraitObject);
    addMonsterImage('malemonster', 'body', maleBody);
    // horn
    var maleHorn = getImageName('horn', maleTraitObject);
    addMonsterImage('malemonster', 'horn', maleHorn);
    // toes
    var maleToes = getImageName('toes', maleTraitObject);
    addMonsterImage('malemonster', 'toes', maleToes);
    // claws
    var maleClaws = getImageName('claws', maleTraitObject);
    addMonsterImage('malemonster', 'claws', maleClaws);
    // ears
    var maleEars = getImageName('ears', maleTraitObject);
    addMonsterImage('malemonster', 'ears', maleEars);
    // teeth
    var maleTeeth = getImageName('teeth', maleTraitObject);
    addMonsterImage('malemonster', 'teeth', maleTeeth);
    // eye
    var maleEye = getImageName('eye', maleTraitObject);
    console.log(maleEye);
    addMonsterImage('malemonster', 'eyes', maleEye);
    //eyelid
    var maleEyelid = getImageName('eyelid', maleTraitObject);
    addMonsterImage('malemonster', 'eyelid', maleEyelid);
});

function addMonsterImage(mydiv, myclass, imageName){
    $('#'+mydiv).find('.'+myclass).prepend('<img src="images/'+imageName+'" alt="Monster '+myclass+'" />');
}
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
//$('#closewelcome').tooltip();

// HEAD
//gender, bodyType, color, shape
//image name generator
function getImageName(bodypart, bodyTraits) {
    // returns the name of the image
    var filename;

    // gender
    // eye/eyes have a different prefix
    if (bodypart != 'eye' && bodypart != 'eyelid') {
        filename = bodyTraits['gender'] + '/'+ bodypart + '_'; 
    } else {
        if (bodypart == 'eye'){
            filename = bodyTraits['gender'] + '/'+ bodyTraits['Eye'][Object.keys(bodyTraits['Eye'])].image + '_';
        } else {
            if (bodyTraits['Eye'][Object.keys(bodyTraits['Eye'])].image == 'eye' ) {
                filename = bodyTraits['gender'] + '/eyelid.png';
            } else {
                filename = bodyTraits['gender'] + '/eyelids.png';
            }
        }
    }

    // put together our filename
    switch(bodypart)
    {
    case "tail":
        // shape
        filename = filename + bodyTraits['Tail Shape'][Object.keys(bodyTraits['Tail Shape'])].image + '_';
        // color
        filename = filename + bodyTraits['Tail Color'][Object.keys(bodyTraits['Tail Color'])].image + '.png';    
        break;
    case "body":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '.png';
        break;
    case "horn":
        // color
        filename = filename + bodyTraits['Horn Color'][Object.keys(bodyTraits['Horn Color'])].image + '.png';
        break;
    case "toes":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '_';
        //number
        filename = filename + bodyTraits['Feet'][Object.keys(bodyTraits['Feet'])].image + '.png';
        break;
    case "claws":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '_';
        //number
        filename = filename + bodyTraits['Claws'][Object.keys(bodyTraits['Claws'])].image + '.png';
        break;
    case "ears":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '_';
        //number
        filename = filename + bodyTraits['Ear Shape'][Object.keys(bodyTraits['Ear Shape'])].image + '.png';
        break;
    case "teeth":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '_';
        //number
        filename = filename + bodyTraits['Teeth'][Object.keys(bodyTraits['Teeth'])].image + '.png';
        break;
    case "eye":
        //color
        filename = filename + bodyTraits['Eye Color'][Object.keys(bodyTraits['Eye Color'])].image + '.png';
        break;
    }

    return filename;
}

function getData(jsonfile){
    return $.ajax({
        url:jsonfile,
        async: false,
        dataType: 'json'
    }).responseText;
}
