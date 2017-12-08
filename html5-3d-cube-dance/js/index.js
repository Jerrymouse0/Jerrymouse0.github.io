/* use the control panel to change these values */
var nbCubes = null;
var cubeSize = null;
var cubeMargin = null;
var perspective = null;

function initParams() {
    nbCubes = parseInt($('#entities').val());
    cubeSize = parseInt($('#size').val());
    cubeMargin = parseInt($('#spacing').val());
    perspective = parseInt($('#pers').val());
}

function buildCubes() {
    
    $('#pane').empty();
    
    var persSize = nbCubes * (cubeSize + cubeMargin*2);
    $('#perspective')
        .css('width', persSize+'px')
        .css('height', persSize+'px')
        .css('margin-left', (-persSize/2)+'px')
        .css('margin-top', (-persSize/2)+'px')
        .css('-webkit-perspective', perspective)
        .css('perspective', perspective);
    
    var lineDelay = 0;
    var cubeDelay = 0;
    
    for(var i=0; i<nbCubes; i++) {
        var line = $('<div class="line"></div>');
        for(var j=0; j<nbCubes; j++) {
            
            var delay = lineDelay + cubeDelay;
            
            var cube = $('<div class="cube"><div class="face front"></div><div class="face back"></div><div class="face top"></div><div class="face bottom"></div><div class="face left"></div><div class="face right"></div></div>');
            
            cube
                .css('-webkit-animation-delay', delay+'s')
                .css('animation-delay', delay+'s');
            
            line.append(cube);
            cubeDelay += .1;
        }
        $('#pane').append(line);
        lineDelay += .1;
        cubeDelay = 0;
    }
    
    $('.cube')
        .css('width', cubeSize+'px')
        .css('height', cubeSize+'px')
        .css('margin', cubeMargin+'px');
}

initParams();
buildCubes();

$('#controls input').on('input', function(e) {
    var value = $(this).val();
    $(this).parent('td').next('td').html(value);
});

$('#controls input').on('change', function(e) {
    initParams();
    buildCubes();
});

$('#toggle').click(function(e) {
    e.preventDefault();
    $('#controls').slideToggle(200);
  
    $(this).toggleClass('hide');
    if($(this).hasClass('hide')) $(this).html('Hide');
    else $(this).html('Controls')
});