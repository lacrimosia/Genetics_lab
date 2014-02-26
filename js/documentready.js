var jsonfile = 'js/data.json';
var data = JSON.parse(getData(jsonfile));
var fadeOutTransitiontime = 2000;
var numQuestions = data.questions.length;

var maxtries = 3;

var correctColor = '#0fc7a4';
var incorrectColor = 'red';

// set female traits
var initFemaleTraits = data.traits;
var femaleTraits = data.traits;
var femalediv = 'female' ;

// set male traits and shuffle genotypes
var maleTraits = data.traits;
var malediv = 'male' ;

// create our male trait object for generating
// the default male
var maleTraitObject = {};
// set a few defaults for male
maleTraitObject['gender'] = 'male';

// create our female trait object for 
// generating the default male
var initFemaleTraitObject = {};
var femaleTraitObject = {};

// set a few defaults for female
initFemaleTraitObject['gender'] = 'female';
femaleTraitObject['gender'] = 'female';

// we shuffle all of the genotypes for each trait
// so that we can generate the male, and create the 
// new object (maleTraitObject/initFemaleTraitObject)
shuffleTraits(maleTraits, maleTraitObject);
shuffleTraits(initFemaleTraits, initFemaleTraitObject);

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

    // build malemonster 
    createMonster(malediv, maleTraitObject);
    // build femalemonster
    createMonster(femalediv, initFemaleTraitObject);
});

function addMonsterImage(mydiv, myclass, imageName){
    $('#'+mydiv).find('.'+myclass).prepend('<img src="images/'+imageName+'" alt="Monster '+myclass+'" />');
}

function createMonster(monsterdiv, traitObject) {
    // build our male monster
    
    // tail
    var tail = getImageName('tail', traitObject);
    addMonsterImage(monsterdiv, 'tail', tail);
    // body
    var body = getImageName('body', traitObject);
    addMonsterImage(monsterdiv, 'body', body);
    // horn
    var horn = getImageName('horn', traitObject);
    addMonsterImage(monsterdiv, 'horn', horn);
    // toes
    var toes = getImageName('toes', traitObject);
    addMonsterImage(monsterdiv, 'toes', toes);
    // claws
    var claws = getImageName('claws', traitObject);
    addMonsterImage(monsterdiv, 'claws', claws);
    // ears
    var ears = getImageName('ears', traitObject);
    addMonsterImage(monsterdiv, 'ears', ears);
    // teeth
    var teeth = getImageName('teeth', traitObject);
    addMonsterImage(monsterdiv, 'teeth', teeth);
    // eye
    var eye = getImageName('eye', traitObject);
    addMonsterImage(monsterdiv, 'eyes', eye);
    //eyelid
    var eyelid = getImageName('eyelid', traitObject);
    addMonsterImage(monsterdiv, 'eyelid', eyelid);
}


// TODO: what is this doing here?
//$('#closewelcome').tooltip();

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
        // color
        filename = filename + bodyTraits['Tail Color'][Object.keys(bodyTraits['Tail Color'])].image + '_';
        // shape
        filename = filename + bodyTraits['Tail Shape'][Object.keys(bodyTraits['Tail Shape'])].image + '.png';    
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

// utility functions
function getData(jsonfile){
    return $.ajax({
        url:jsonfile,
        async: false,
        dataType: 'json'
    }).responseText;
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function shuffleTraits(traits, object) {
    $.each(traits, function(i, v){
        shuffle(v.genotype);
        object[v.name] = v.genotype[0];
    });
}
