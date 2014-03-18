var jsonfile = 'js/data.json';
var data = JSON.parse(getData(jsonfile));
var fadeOutTransitiontime = 2000;
var numQuestions = data.questions.length;

// pdf document var
var pdfdoc = new jsPDF('landscape', 'pt', 'letter');
// print placement in the PDF
var pdfx = 30;
var pdfy = 30;
var pdfw = 742;
var pdfh = 550;

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
    addResultTableRow(monsterdiv, 'eye', traitObject, 'Eye Color', defaultValueEyeColor);
    addResultTableRow(monsterdiv, 'eye', traitObject, 'Eye', defaultValueEye);
    // teeth
    addResultTableRow(monsterdiv, 'teeth', traitObject, 'Teeth', defaultValueTeeth);
    // ears
    addResultTableRow(monsterdiv, 'ears', traitObject, 'Ear Shape', defaultValueEarShape);
    // claws
    addResultTableRow(monsterdiv, 'claws', traitObject, 'Claws', defaultValueClaws);
    // toes
    addResultTableRow(monsterdiv, 'toes', traitObject, 'Feet', defaultValueFeet);
    // horn
    addResultTableRow(monsterdiv, 'horn', traitObject, 'Horn Color', defaultValueHornColor);
    // body
    addResultTableRow(monsterdiv, 'body', traitObject, 'Skin Color', defaultValueSkinColor);
    // tail
    addResultTableRow(monsterdiv, 'tail', traitObject, 'Tail Shape', defaultValueTailShape);
    addResultTableRow(monsterdiv, 'tail', traitObject, 'Tail Color', defaultValueTailColor);

}



function addResultTableRow(monsterdiv, trait, bodyTraits, traitKey, sliderIndex){
    var rowtemplate = $('#row-template').html();

    var arrIndex = 0;
    if (sliderIndex == 0){
        arrIndex = 0;
    }else if(sliderIndex == 10){
        arrIndex = 1;
    }else if(sliderIndex == 20){
        arrIndex = 2;
    }
    var genotype = Object.keys(defaultTraitObject[traitKey][arrIndex]);

    var allele1, allele2 = '';
    $.each(data.traits, function(i,v){
        if (v.name == traitKey) {
            allele1 = v.allele1;
            allele2 = v.allele2;
        }
    });
    
    rowtemplate = rowtemplate.replace(/TRAITKEY/,traitKey.replace(/ /, '_'));
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
    newdiv = newdiv.replace(/TRAITKEY/,traitKey);

    // set our unique id
    var sliderIndex = $('#slidercontainer').find('.slider').length;
    newdiv = newdiv.replace(/INDEX/g, sliderIndex);

    // append the new slider
    $('#'+monsterdiv+'sliders').find('.slidercontainer').prepend(newdiv);

    // add slider functionality
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
            // var newImage = getImageName(gender, t, defaultTraitObject, arrIndex);
            // console.log(newImage);
            // console.log(t);
            // console.log(gender);
            // replaceMonsterImage(gender, t, newImage);

            // update our result table
            var sliderTraitKey = $(this).attr('oe-traitkey');
            var genotype = Object.keys(defaultTraitObject[sliderTraitKey][arrIndex]);
            var phenotype = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].phenotype;

            // put together our filename
            switch(sliderTraitKey)
            {
            case "Tail Color":
                var tailcolor = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                var fname = $('#female').find('.tail').find('img').attr('src');
                var newFname = fname.replace(/(images\/female\/.+)(_orange|_purple)(.*)/, "$1_"+tailcolor+"$3");
                $('#female').find('.tail').find('img').attr('src', newFname);
                break;
            case "Tail Shape":
                var tailshape = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                var fname = $('#female').find('.tail').find('img').attr('src');
                var newFname = fname.replace(/(images\/female\/.+)(_curly|_straight)(.*)/, "$1_"+tailshape+"$3");
                $('#female').find('.tail').find('img').attr('src', newFname);
                break;
            case "Skin Color":
                // color
                var bodyColor = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                $.each($('#female').find('img'), function(iter,val){
                    var fname = $(val).attr('src');
                    var newFname = fname.replace(/(images\/female\/.+)(_gb|_g|_b)(_?.*)/, "$1_"+bodyColor+"$3");
                    $(val).attr('src', newFname);
                });
                break;
            case "Horn Color":
                var horn = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                var fname = $('#female').find('.horn').find('img').attr('src');
                var newFname = fname.replace(/(images\/female\/.+)(_white|_purple)(.*)/, "$1_"+horn+"$3");
                $('#female').find('.horn').find('img').attr('src', newFname);
                break;
            case "Feet":
                var feet = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                var fname = $('#female').find('.toes').find('img').attr('src');
                var newFname = fname.replace(/(images\/female\/.+)(_four|_two)(.*)/, "$1_"+feet+"$3");
                $('#female').find('.toes').find('img').attr('src', newFname);      
                break;
            case "Claws":
                var claws = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                var fname = $('#female').find('.claws').find('img').attr('src');
                var newFname = fname.replace(/(images\/female\/.+)(_long|_medium|_short)(.*)/, "$1_"+claws+"$3");
                $('#female').find('.claws').find('img').attr('src', newFname);
                break;
            case "Ear Shape":
                var ears = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                var fname = $('#female').find('.ears').find('img').attr('src');
                var newFname = fname.replace(/(images\/female\/.+)(_round|_sharp)(.*)/, "$1_"+ears+"$3");
                $('#female').find('.ears').find('img').attr('src', newFname);
                break;
            case "Teeth":
                var teeth = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                var fname = $('#female').find('.teeth').find('img').attr('src');
                var newFname = fname.replace(/(images\/female\/.+)(_round|_sharp)(.*)/, "$1_"+teeth+"$3");
                $('#female').find('.teeth').find('img').attr('src', newFname);
                break;
            case "Eye":
                var eyes = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                var fname = $('#female').find('.eye').find('img').attr('src');
                var newFname = fname.replace(/(images\/female\/)(eyes|eye)(.*)/, "$1"+eyes+"$3");
                $('#female').find('.eye').find('img').attr('src', newFname);

                // eyelids
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
                break;
            case "Eye Color":
                var eyecolor = defaultTraitObject[sliderTraitKey][arrIndex][Object.keys(defaultTraitObject[sliderTraitKey][arrIndex])].image;

                // swap our images
                var fname = $('#female').find('.eye').find('img').attr('src');
                var newFname = fname.replace(/(images\/female\/.+)(_pink|_white|_red)(.*)/, "$1_"+eyecolor+"$3");
                $('#female').find('.eye').find('img').attr('src', newFname);

            }

            // update our result table
            $('#'+monsterdiv+'reference .'+sliderTraitKey.replace(/ /, '_')).find('.genotype').text(genotype);
            $('#'+monsterdiv+'reference .'+sliderTraitKey.replace(/ /, '_')).find('.phenotype').text(phenotype);
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
    // add page 1 to our pdf
    html2canvas($('#container'), {
        onrendered: function(canvas) {
            var source = canvas.toDataURL('image/jpeg');
            pdfdoc.addImage(source, 'JPEG', pdfx, pdfy, pdfw, pdfh);

            // prepare next page
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
    });
    
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
    html2canvas($('#container'), {
        onrendered: function(canvas) {
            var source = canvas.toDataURL('image/jpeg');
            pdfdoc.addPage();
            pdfdoc.addImage(source, 'JPEG', pdfx, pdfy, pdfw, pdfh);
            pdfdoc.save('biology_189_genetics_lab.pdf')
            // var out = pdfdoc.output();
            // var url = 'data:application/pdf;base64,' + $.base64.encode(out);
            // window.location.href = url;
            // window.open(url,'_blank');
	    //     	//link
        }
    });



    // var out = doc.output();
    // var url = 'data:application/pdf;base64,' + $.base64.encode(out);
    //document.location.href = url;

	// $('#male').show();
	// $('#maleTable').show();
	// $('#malesliders').show();
	// $('#monster2').show();


}

function previous() {
	$('#male').show();
	$('#maleTable').show();
	$('#malesliders').show();
	$('#previous').hide();
	$('#reset').show();
	$('#female').hide();
	$('#femalesliders').hide();
	$('#femaleTable').hide();
	$('#next').show();
	$('#printme').hide();


	
}
// function replaceMonsterImage(mydiv, myclass, imageName){
//     $('#'+mydiv).find('.'+myclass).html('<img src="images/'+imageName+'" alt="Monster '+myclass+'" />');
// }

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

