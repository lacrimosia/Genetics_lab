var jsonfile = 'js/data.json';
var data = JSON.parse(getData(jsonfile));
var fadeOutTransitiontime = 2000;
var numQuestions = data.questions.length;

var maxtries = 3;

var correctColor = '#0fc7a4';
var incorrectColor = 'red';

//// Set male and female globals
// set female traits
var defaultTraitObject = {};
createTraitObject(data.traits, defaultTraitObject, 0);

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
createTraitObject(maleTraits, maleTraitObject, 1);
createTraitObject(initFemaleTraits, initFemaleTraitObject, 1);

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
    var tail = getImageName(monsterdiv, 'tail', traitObject);
    addMonsterImage(monsterdiv, 'tail', tail);
    // body
    var body = getImageName(monsterdiv, 'body', traitObject);
    addMonsterImage(monsterdiv, 'body', body);
    // horn
    var horn = getImageName(monsterdiv, 'horn', traitObject);
    addMonsterImage(monsterdiv, 'horn', horn);
    // toes
    var toes = getImageName(monsterdiv, 'toes', traitObject);
    addMonsterImage(monsterdiv, 'toes', toes);
    // claws
    var claws = getImageName(monsterdiv, 'claws', traitObject);
    addMonsterImage(monsterdiv, 'claws', claws);
    // ears
    var ears = getImageName(monsterdiv, 'ears', traitObject);
    addMonsterImage(monsterdiv, 'ears', ears);
    // teeth
    var teeth = getImageName(monsterdiv, 'teeth', traitObject);
    addMonsterImage(monsterdiv, 'teeth', teeth);
    // eye
    var eye = getImageName(monsterdiv, 'eye', traitObject);
    addMonsterImage(monsterdiv, 'eyes', eye);
    //eyelid
    var eyelid = getImageName(monsterdiv, 'eyelid', traitObject);
    addMonsterImage(monsterdiv, 'eyelid', eyelid);
}

function addSlider(monsterdiv, trait, bodyTraits, traitKey){
    // get template divs
    var newdiv = $('#slider_template').html();

    // now we generate the slider
    // 
    newdiv = newdiv.replace(/TRAIT/g, trait);

    // generate our label
    var label = '';
    $.each(defaultTraitObject[traitKey], function(i, v){
        for(var key in v){
            if (i == 0){
                label = ' '+key+' ';
            } else {
                label = label+'| '+key+' ';
            }
        }
    });
    console.log(label);
    newdiv = newdiv.replace(/LABELTEXT/,label);

    // append the new slider
    $('#'+monsterdiv+'sliders').find('.slidercontainer').prepend(newdiv);
}


// TODO: what is this doing here?
//$('#closewelcome').tooltip();

//image name generator
function getImageName(monsterdiv, bodypart, bodyTraits) {
    // returns the name of the image
    var filename;
    // gender
    // eye/eyes have a different prefix
    if (bodypart != 'eye' && bodypart != 'eyelid') {
        filename = bodyTraits['gender'] + '/'+ bodypart + '_'; 
    } else {
        if (bodypart == 'eye'){
            filename = bodyTraits['gender'] + '/'+ bodyTraits['Eye'][Object.keys(bodyTraits['Eye'])].image + '_';
            addSlider(monsterdiv, bodypart, bodyTraits, 'Eye');
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
        addSlider(monsterdiv, bodypart, bodyTraits, 'Tail Color');
        // shape
        filename = filename + bodyTraits['Tail Shape'][Object.keys(bodyTraits['Tail Shape'])].image + '.png';    
        addSlider(monsterdiv, bodypart, bodyTraits, 'Tail Shape');
        break;
    case "body":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '.png';
        addSlider(monsterdiv, bodypart, bodyTraits, 'Skin Color');
        break;
    case "horn":
        // color
        filename = filename + bodyTraits['Horn Color'][Object.keys(bodyTraits['Horn Color'])].image + '.png';
        addSlider(monsterdiv, bodypart, bodyTraits, 'Horn Color');
        break;
    case "toes":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '_';
        //number
        filename = filename + bodyTraits['Feet'][Object.keys(bodyTraits['Feet'])].image + '.png';
        addSlider(monsterdiv, bodypart, bodyTraits, 'Feet');
        break;
    case "claws":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '_';
        //number
        filename = filename + bodyTraits['Claws'][Object.keys(bodyTraits['Claws'])].image + '.png';
        addSlider(monsterdiv, bodypart, bodyTraits, 'Claws');
        break;
    case "ears":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '_';
        //number
        filename = filename + bodyTraits['Ear Shape'][Object.keys(bodyTraits['Ear Shape'])].image + '.png';
        addSlider(monsterdiv, bodypart, bodyTraits, 'Ear Shape');
        break;
    case "teeth":
        // color
        filename = filename + bodyTraits['Skin Color'][Object.keys(bodyTraits['Skin Color'])].image + '_';
        //number
        filename = filename + bodyTraits['Teeth'][Object.keys(bodyTraits['Teeth'])].image + '.png';
                addSlider(monsterdiv, bodypart, bodyTraits, 'Teeth');
        break;
    case "eye":
        //color
        filename = filename + bodyTraits['Eye Color'][Object.keys(bodyTraits['Eye Color'])].image + '.png';
        addSlider(monsterdiv, bodypart, bodyTraits, 'Eye Color');
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

function createTraitObject(traits, object, doshuffle) {
    $.each(traits, function(i, v){
        if(parseInt(doshuffle) == 1) {
            shuffle(v.genotype);
        }
        if(typeof object['gender'] != "undefined") {
            object[v.name] = v.genotype[0];
        } else {
            object[v.name] = v.genotype;
        }
    });
}


