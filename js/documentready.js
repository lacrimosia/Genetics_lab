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

//show out slider titles
$('strong.titles').removeClass('hide');

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
    openHelpDialog();
    
     //click to open instructional dialog
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
	
       //  close dialog on click
     $('#closewelcome').click(function() {
         $('#helpMessage').dialog('close');
         $('#divBottom').removeClass('hide');
     });

    // build malemonster 
    createMonster(malediv, maleTraitObject);
    // build femalemonster
    createMonster(femalediv, initFemaleTraitObject);

    // reverse the table rows
//    console.log($('#femalereference').append($('#femalereference tr:gt(1)').get().reverse()));
    // var tbody = $('#malereference tbody tr');
    // $.each(tbody, function(i, v){
    //     console.log(v);
    // });
    // console.log(tbody);
    // console.log($('#malereference tbody tr:last-child'));
//console.log($('#malereference tbody tr:gt(1)').get().reverse());
    //tbody.html($('#malereference tbody tr:gt(1)').get().reverse());

});


function addMonsterImage(mydiv, myclass, imageName){
    $('#'+mydiv).find('.'+myclass).prepend('<img src="images/'+imageName+'" alt="Monster '+myclass+'" />');
}

function createMonster(monsterdiv, traitObject) {
    // build our male monster

    // tail
    var tail = getImageName(monsterdiv, 'tail', traitObject);
    addMonsterImage(monsterdiv, 'tail', tail);
    var defaultValueTailColor = addSlider(monsterdiv, 'tail', traitObject, 'Tail Color', 0);
    var defaultValueTailShape = addSlider(monsterdiv, 'tail', traitObject, 'Tail Shape', 1);
    // body
    var body = getImageName(monsterdiv, 'body', traitObject);
    addMonsterImage(monsterdiv, 'body', body);
    var defaultValueSkinColor = addSlider(monsterdiv, 'body', traitObject, 'Skin Color', 2);
    // horn
    var horn = getImageName(monsterdiv, 'horn', traitObject);
    addMonsterImage(monsterdiv, 'horn', horn);
    var defaultValueHornColor = addSlider(monsterdiv, 'horn', traitObject, 'Horn Color', 3);
    // toes
    var toes = getImageName(monsterdiv, 'toes', traitObject);
    addMonsterImage(monsterdiv, 'toes', toes);
    var defaultValueFeet = addSlider(monsterdiv, 'toes', traitObject, 'Feet', 4);
    // claws
    var claws = getImageName(monsterdiv, 'claws', traitObject);
    addMonsterImage(monsterdiv, 'claws', claws);
    var defaultValueClaws = addSlider(monsterdiv, 'claws', traitObject, 'Claws', 5);
    // ears
    var ears = getImageName(monsterdiv, 'ears', traitObject);
    addMonsterImage(monsterdiv, 'ears', ears);
    var defaultValueEarShape = addSlider(monsterdiv, 'ears', traitObject, 'Ear Shape', 6);
    // teeth
    var teeth = getImageName(monsterdiv, 'teeth', traitObject);
    addMonsterImage(monsterdiv, 'teeth', teeth);
    var defaultValueTeeth = addSlider(monsterdiv, 'teeth', traitObject, 'Teeth', 7);
    // eye
    var eye = getImageName(monsterdiv, 'eye', traitObject);
    // eyes here, as it's the div name in the image container, (sorry!)
    addMonsterImage(monsterdiv, 'eye', eye);
    var defaultValueEye = addSlider(monsterdiv, 'eye', traitObject, 'Eye', 8);
    var defaultValueEyeColor = addSlider(monsterdiv, 'eye', traitObject, 'Eye Color', 9);
    //eyelid
    var eyelid = getImageName(monsterdiv, 'eyelid', traitObject);
    addMonsterImage(monsterdiv, 'eyelid', eyelid);

    // we need to add table rows in reverse order... here
    //eyelid: not needed, as there is no slider
    //eye
    console.log($('#'+monsterdiv));
    addResultTableRow(monsterdiv, 'eye', traitObject, 'Eye Color', defaultValueEyeColor, 9);
    addResultTableRow(monsterdiv, 'eye', traitObject, 'Eye', defaultValueEye, 8);
    // teeth
    addResultTableRow(monsterdiv, 'teeth', traitObject, 'Teeth', defaultValueTeeth, 7);
    // ears
    addResultTableRow(monsterdiv, 'ears', traitObject, 'Ear Shape', defaultValueEarShape, 6);
    // claws
    addResultTableRow(monsterdiv, 'claws', traitObject, 'Claws', defaultValueClaws, 5);
    // toes
    addResultTableRow(monsterdiv, 'toes', traitObject, 'Feet', defaultValueFeet, 4);
    // horn
    addResultTableRow(monsterdiv, 'horn', traitObject, 'Horn Color', defaultValueHornColor, 3);
    // body
    addResultTableRow(monsterdiv, 'body', traitObject, 'Skin Color', defaultValueSkinColor, 2);
    // tail
    addResultTableRow(monsterdiv, 'tail', traitObject, 'Tail Shape', defaultValueTailShape, 1);
    addResultTableRow(monsterdiv, 'tail', traitObject, 'Tail Color', defaultValueTailColor, 0);

}



function addResultTableRow(monsterdiv, trait, bodyTraits, traitKey, genotype, sliderIndex){
    var rowtemplate = $('#row-template').html();

    var arrIndex = 0;
    if (sliderIndex == 0){
        arrIndex = 0;
    }else if(sliderIndex == 10){
        arrIndex = 1;
    }else if(sliderIndex == 20){
        arrIndex = 2;
    }
    var allele1, allele2 = '';
    $.each(data.traits, function(i,v){
        if (v.name == traitKey) {
            allele1 = v.allele1;
            allele2 = v.allele2;
        }
    });
    
    rowtemplate = rowtemplate.replace(/TRAIT/g,traitKey);
    rowtemplate = rowtemplate.replace(/ALLELE1/g,allele1);
    rowtemplate = rowtemplate.replace(/ALLELE2/g,allele2);
    rowtemplate = rowtemplate.replace(/GENOTYPE/g,genotype);
    rowtemplate = rowtemplate.replace(/PHENOTYPE/g,bodyTraits[traitKey][0][Object.keys(bodyTraits[traitKey][0])].phenotype);

    $('#'+monsterdiv+'reference').find('tbody').append(rowtemplate);
}

function addSlider(monsterdiv, trait, bodyTraits, traitKey, sliderIndex){
    // get template divs

    var newdiv = $('#slider_template').html();
    // get our default value
    var defaultSelection = getKeyName(bodyTraits,traitKey);
    var defaultValue = 0;
    // now we generate the slider
    // 
    newdiv = newdiv.replace(/TRAIT/, trait);

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
    newdiv = newdiv.replace(/TRAITKEY/,traitKey);

    // set our unique id
    var sliderIndex = $('#slidercontainer').find('.slider').length;
    newdiv = newdiv.replace(/INDEX/g, sliderIndex);

    // append the new slider
    $('#'+monsterdiv+'sliders').find('.slidercontainer').prepend(newdiv);
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
	    //$('#eyeColor').html('<b>'+c+'</b>');
	    /*c selects the value of the slider*/
	    
            var t = '';
            $.each(c, function(i, v){
                // get our trait from the slider
                if (!v.match(/(slider|widget|corner)/)){
                    t = v;
		    var Traits = t;
		    //comment
		    //inserts the phenotype into table
		    //$('#eyeColor,#eyeColorG').html('<b>'+eyeColor+'</b>');
                }
		
            });
	    
            // get slider array index
            var arrIndex;
            if (ui.value == 0){
                arrIndex = 0;
            }else if(ui.value == 10){
                arrIndex = 1;
            }else if(ui.value == 20){
                arrIndex = 2;
            }
            // update our image
            var newImage = getImageName(gender, t, defaultTraitObject, arrIndex);
            console.log(newImage);
            replaceMonsterImage(gender, t, newImage);


            // update our result table
            var sliderTraitKey = $(this).attr('oe-traitkey');
            var genotype = Object.keys(defaultTraitObject[sliderTraitKey][arrIndex]);
            var phenotype = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].phenotype;
            console.log($('#female').find('.tail').find('img').attr('src'))
           // we need to change the color of all body parts
            // when we change the color of the body
            if (sliderTraitKey == 'Skin Color') {
                var bodyColor = '';
                switch(genotype[0]) {
                case "GG":
                    bodyColor = 'g';
                    break;
                case "BB":
                    bodyColor = 'b';
                    break;
                case "GB":
                    bodyColor = 'gb';
                    break;
                }
                // swap our images
                $.each($('#female').find('img'), function(iter,val){
                    console.log(val); 
                    var fname = $(val).attr('src');
                    var newFname = fname.replace(/(images\/female\/.+)(_g_|_gb_|_b_)(.*)/, "$1_"+bodyColor+"_$3");
                    console.log(fname);
                    $(val).attr('src', newFname);
                });
            }
            // we need to change the number of eyelids
            // when the number of eyes change
            if (sliderTraitKey == 'Eye') {
                var imgSrc = $('#female').find('.eye').find('img').attr('src');
                var eyelidSrc = $('#female').find('.eyelid').find('img').attr('src');
                // we match eyes_
                if (imgSrc.indexOf('eyes') != -1) {
                    // we have two eyes
                    var newEyelid = eyelidSrc.replace(/(images\/female\/)(.+)/, "$1eyelids.png");
                    $('#female').find('.eyelid').find('img').attr('src', newEyelid);
                } else {
                    // we have one eye
                    var newEyelid = eyelidSrc.replace(/(images\/female\/)(.+)/, "$1eyelid.png");
                    $('#female').find('.eyelid').find('img').attr('src', newEyelid);
                }
            }
            // we need to change the tail shape
            if (sliderTraitKey == 'Tail Shape') {
                console.log(phenotype);
                var imgSrc = $('#female').find('.tail').find('img').attr('src');
                console.log(imgSrc);
                // we match tail_
                var newTailShape = imgSrc.replace(/(images\/female\/.+)(_curled|_straight)(.png)/, "$1_"+phenotype.toLowerCase()+"$3");
                console.log(newTailShape);
                $('#female').find('.tail').find('img').attr('src', newTailShape);
            }

            // we need to change the tail color
            if (sliderTraitKey == 'Tail Color') {
                console.log(phenotype);
                var imgSrc = $('#female').find('.tail').find('img').attr('src');
                console.log(imgSrc);
                // we match tail_
                var newTailColor = imgSrc.replace(/(images\/female\/.+)(_orange_|_purple_)(.*)/, "$1_"+phenotype.toLowerCase()+"_$3");
                $('#female').find('.tail').find('img').attr('src', newTailColor);
            }

            // always female
            $.each($('#femalereference').find('.trait'), function(i,v){
                if ($(v).text() == sliderTraitKey) {
                    // change the genotype and phenotype
                    $('#femalereference').find('tr').eq(i+1).find('.genotype').text(genotype);
                    $('#femalereference').find('tr').eq(i+1).find('.phenotype').text(phenotype);
                    return false;
                }
            });
        }
    });
    //disable male sliders
    if (monsterdiv == 'male') {
        $('.slider'+sliderIndex).slider('disable');        
    }

    // return default value of slider, so we can build the table
    return defaultValue;
}

//Show table and Print function
function addTable(){
 

}

//hide show table
function next(){
    $('#male').fadeOut(300).toggle();
    $('#maleTable').fadeOut(300).toggle();
    $('#malesliders').fadeOut(300).toggle();
    $('#female').fadeOut(300).toggle();
    $('#femaleTable').fadeOut(300).toggle();
    $('#femalesliders').fadeOut(300).toggle();

    $('#previous').fadeOut(300).toggle();
    $('#reset').fadeOut(300).toggle();

    $('#next').fadeOut(300).toggle();
    $('#printme').fadeOut(300).toggle();
    
}


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
        console.log(monsterdiv, bodypart, bodyTraits, item);
        console.log(bodyTraits['Tail Shape'][i][Object.keys(bodyTraits['Tail Shape'][i])].image);
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

function printMe() {
    console.log('Im printing');
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

