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
    addSlider(monsterdiv, 'tail', traitObject, 'Tail Color', 0);
    addSlider(monsterdiv, 'tail', traitObject, 'Tail Shape', 1);
    // body
    var body = getImageName(monsterdiv, 'body', traitObject);
    addMonsterImage(monsterdiv, 'body', body);
    addSlider(monsterdiv, 'body', traitObject, 'Skin Color', 2);
    // horn
    var horn = getImageName(monsterdiv, 'horn', traitObject);
    addMonsterImage(monsterdiv, 'horn', horn);
    addSlider(monsterdiv, 'horn', traitObject, 'Horn Color', 3);
    // toes
    var toes = getImageName(monsterdiv, 'toes', traitObject);
    addMonsterImage(monsterdiv, 'toes', toes);
    addSlider(monsterdiv, 'toes', traitObject, 'Feet', 4);
    // claws
    var claws = getImageName(monsterdiv, 'claws', traitObject);
    addMonsterImage(monsterdiv, 'claws', claws);
    addSlider(monsterdiv, 'claws', traitObject, 'Claws', 5);
    // ears
    var ears = getImageName(monsterdiv, 'ears', traitObject);
    addMonsterImage(monsterdiv, 'ears', ears);
    addSlider(monsterdiv, 'ears', traitObject, 'Ear Shape', 6);
    // teeth
    var teeth = getImageName(monsterdiv, 'teeth', traitObject);
    addMonsterImage(monsterdiv, 'teeth', teeth);
    addSlider(monsterdiv, 'teeth', traitObject, 'Teeth', 7);
    // eye
    var eye = getImageName(monsterdiv, 'eye', traitObject);
    // eyes here, as it's the div name in the image container, (sorry!)
    addMonsterImage(monsterdiv, 'eye', eye);
    addSlider(monsterdiv, 'eye', traitObject, 'Eye', 8);
    addSlider(monsterdiv, 'eye', traitObject, 'Eye Color', 9);
    //eyelid
    var eyelid = getImageName(monsterdiv, 'eyelid', traitObject);
    addMonsterImage(monsterdiv, 'eyelid', eyelid);
}

function addSlider(monsterdiv, trait, bodyTraits, traitKey, sliderIndex){
    // get template divs

    var newdiv = $('#slider_template').html();
    // get our default value
    var defaultSelection = getKeyName(bodyTraits,traitKey);
    var defaultValue = 0;

    // now we generate the slider
    // 
    newdiv = newdiv.replace(/TRAIT/g, trait);

    // generate our label
    var label = '';
    $.each(defaultTraitObject[traitKey], function(i, v){
        for(var key in v){
            if(key == defaultSelection){
                switch(i) {
                case 1: 
                    defaultValue = 10;
                    break;
                case 2:
                    defaultValue = 20;
                    break;
                }
            }
            if (i == 0){
                label = ' '+key+' ';
            } else {
                label = label+'| '+key+' ';
            }
        }
    });
    newdiv = newdiv.replace(/LABELTEXT/,label);

    // set our unique id
    var sliderIndex = $('#floating').find('.slider').length;
    newdiv = newdiv.replace(/INDEX/g, sliderIndex);

    // append the new slider
    $('#'+monsterdiv+'sliders').find('.slidercontainer').prepend(newdiv);
    //console.log($('#'+monsterdiv+'sliders').find('.slider:first-child').slider("option", "value", defaultValue));
//    $( ".selector" ).slider( "value", 55 );

    // add slider functionality
    //console.log(defaultValue);
    $('.slider'+sliderIndex).slider({
        value: defaultValue,   //starting point of slider
        min: 0,
        max: 20,   //ending amount
        step: 10,   //snap to grid amount
        animate: 'slow',
        slide: function( event, ui ) { //put text at label
            //$( ".label1" ).text(ui.value );
        },
        change: function(event, ui){
            var gender = $(this).parents().eq(2).attr('id').replace('sliders','');

            // I buried the trait in $(this).attr('class'), so we need to find it
            var c = $(this).attr('class').split(' ')
            var traitKey = '';
            $.each(c, function(i, v){
                // get our trait from the slider
                if (!v.match(/(slider|widget|corner)/)){
                    traitKey = v;
                }
            });

            // get TraitKey array index
            var arrIndex;
            if (ui.value == 0){
                arrIndex = 0;
            }else if(ui.value == 10){
                arrIndex = 1;
            }else if(ui.value == 20){
                arrIndex = 2;
            }
            var newImage = getImageName(gender, traitKey, defaultTraitObject, arrIndex);
            replaceMonsterImage(gender, traitKey, newImage);
        }
    });
	//disable male sliders
    if (monsterdiv == 'male') {
        $('.slider'+sliderIndex).slider('disable');        
    }
}


// TODO: what is this doing here?
//$('#closewelcome').tooltip();

//image name generator
function getImageName(monsterdiv, bodypart, bodyTraits, item) {
    // returns the name of the image
    var filename;
    var i = 0;
    if (typeof item == 'undefined'){
        i = 0;
    } else {
        i = item;
    }
    // gender
    // eye/eyes have a different prefix
    if (bodypart != 'eye' && bodypart != 'eyelid') {
        filename = monsterdiv + '/'+ bodypart + '_'; 
    } else {
        if (bodypart == 'eye'){
            filename = monsterdiv + '/'+ bodyTraits['Eye'][i][Object.keys(bodyTraits['Eye'][i])].image + '_';
        } else {
            if (bodyTraits['Eye'][i][Object.keys(bodyTraits['Eye'][i])].image == 'eye' ) {
                filename = monsterdiv + '/eyelid.png';
            } else {
                filename = monsterdiv + '/eyelids.png';
            }
        }
    }

    // put together our filename
    switch(bodypart)
    {
    case "tail":
        // color
        filename = filename + bodyTraits['Tail Color'][i][Object.keys(bodyTraits['Tail Color'][i])].image + '_';
        // shape
        filename = filename + bodyTraits['Tail Shape'][i][Object.keys(bodyTraits['Tail Shape'][i])].image + '.png';    
        break;
    case "body":
        // color
        filename = filename + bodyTraits['Skin Color'][i][Object.keys(bodyTraits['Skin Color'][i])].image + '.png';
        break;
    case "horn":
        // color
        filename = filename + bodyTraits['Horn Color'][i][Object.keys(bodyTraits['Horn Color'][i])].image + '.png';
        break;
    case "toes":
        // color
        filename = filename + bodyTraits['Skin Color'][i][Object.keys(bodyTraits['Skin Color'][i])].image + '_';
        //number
        filename = filename + bodyTraits['Feet'][i][Object.keys(bodyTraits['Feet'][i])].image + '.png';
        break;
    case "claws":
        // color
        filename = filename + bodyTraits['Skin Color'][i][Object.keys(bodyTraits['Skin Color'][i])].image + '_';
        //number
        filename = filename + bodyTraits['Claws'][i][Object.keys(bodyTraits['Claws'][i])].image + '.png';
        break;
    case "ears":
        // color
        filename = filename + bodyTraits['Skin Color'][i][Object.keys(bodyTraits['Skin Color'][i])].image + '_';
        //number
        filename = filename + bodyTraits['Ear Shape'][i][Object.keys(bodyTraits['Ear Shape'][i])].image + '.png';
        break;
    case "teeth":
        // color
        filename = filename + bodyTraits['Skin Color'][i][Object.keys(bodyTraits['Skin Color'][i])].image + '_';
        //number
        filename = filename + bodyTraits['Teeth'][i][Object.keys(bodyTraits['Teeth'][i])].image + '.png';
        break;
    case "eye":
        //color
        filename = filename + bodyTraits['Eye Color'][i][Object.keys(bodyTraits['Eye Color'][i])].image + '.png';
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

function replaceMonsterImage(mydiv, myclass, imageName){
    // console.log($('#'+mydiv).find('.body').find('img').attr('src').split('_')[1].split('.')[0]);
    // console.log(imageName);
    // // get body color
    // var bodyImg = $('#'+mydiv).find('.body').find('img').attr('src').split('_')[1].split('.')[0];
    // switch(imageName) {
    //     case "body"
    // }
    
    $('#'+mydiv).find('.'+myclass).html('<img src="images/'+imageName+'" alt="Monster '+myclass+'" />');
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
        object[v.name] = [];
        if(typeof object['gender'] != "undefined") {
            object[v.name][0] = v.genotype[0];
        } else {
            $.each(v.genotype, function(i2,v2){
                object[v.name][i2] = v.genotype[i2];                
            });
        }
    });
}

function getKeyName(o,traitKey) {
    var key;
    for(var k in o[traitKey][0]){
        key = k;
    }
    return key;
}


