
var toggle_buildmode = document.getElementById('toggle-buildmode');



var left_container = document.getElementById('left-controls-container');
var magnification_el = document.getElementById('magnification');



var build_controls_container = document.getElementById('build-controls-container');

var group_display = document.getElementById('group-display');
var display = document.getElementById('display');
var preview_display = document.getElementById('preview-display');

var number_of_columns_el = document.getElementById('number-of-columns');
var spacing_el = document.getElementById('margin-width');
var block_height_el = document.getElementById('block-height');
var container_width_el = document.getElementById('container-width');

var block_colour_el = document.getElementById('block-colour');
var background_colour_el = document.getElementById('background-colour');

var invert_colours_el = document.getElementById('invert-colours');



var castle_history = [];



// URL Stuff
var castle_history_url_string_container = document.getElementById('castle-history-url-string-container');


var castle_history_url_string = document.URL + '#' + encodeURIComponent(localStorage.getItem('CastleHistory'));
castle_history_url_string_container.innerHTML = castle_history_url_string;







function rgbtohex(color){
  if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
}









// LOAD FROM LOCAL STORAGE
function createCastleFromString(string){

  var CastleHistory = JSON.parse(string);

  for ( var i = 0, len = CastleHistory.length; i < len; i++ ){
    castle_history.push(CastleHistory[i]);
    calculateAndBuildBlocks(CastleHistory[i][0], CastleHistory[i][1], CastleHistory[i][2], CastleHistory[i][3], CastleHistory[i][4], CastleHistory[i][5], display);
  }

}


createCastleFromString(localStorage.getItem('CastleHistory'));








function clearAll(){
  display.innerHTML = '';
  preview_display.innerHTML = '';
  castle_history_url_string_container.innerHTML = '';
  localStorage.removeItem('CastleHistory');
  castle_history = [];
  localStorage.setItem('CastleHistory', JSON.stringify(castle_history));
}






// Equal Spaced Equation
// Parse All Inputs as Numbers
// Calculate Size and Margin and Send those values off to create the columns.
function calculateAndBuildBlocks(container_width, block_height, number_of_columns, spacing, block_colour, background_colour, whole_container){
  var int_number_of_columns = parseInt(number_of_columns);
  var int_spacing = parseInt(spacing);
  var int_container_width = parseInt(container_width);
  var int_block_height = parseInt(block_height);

  // Column Measurements
  var remaining_num_of_cols = int_number_of_columns - 1;
  var total_margin_spacing = remaining_num_of_cols * int_spacing;
  var remaining_width_after_margin = 100 - total_margin_spacing;
  var col_width = remaining_width_after_margin / int_number_of_columns;
  
  createCols(container_width, int_block_height, col_width, int_number_of_columns, int_spacing, whole_container, block_colour, background_colour);
};



// Create and Style Columns and the Container
function createCols(container_width, int_block_height, col_width, number_of_columns, spacing, whole_container, block_colour, background_colour){
  var col_container = document.createElement('article');
  var col;
  var col_style_width;
  var col_style_margin;
  var whole_container = whole_container;
  var col_container_wrapper = document.createElement('section');


  // Col Wrapper
  col_container_wrapper.style.position = 'relative';
  col_container_wrapper.style.width = '100%';
  

  
  // col-container
  col_container.setAttribute('class', 'col-container');
  col_container.style.width = container_width + '%';
  col_container.style.background = background_colour;

  col_container.addEventListener('click', copyBlocks);



  // Create Close Button Element
    var closeButton = document.createElement('button'),
        closeCtx = document.createTextNode('x');

    closeButton.appendChild(closeCtx);
    col_container_wrapper.appendChild(closeButton);


    closeButton.onclick = function () { 
      col_container_wrapper.parentNode.removeChild(col_container_wrapper);
    };
  


  // The Columns
  for (var i = 0, len = number_of_columns; i < len; i++){
    col = document.createElement('span');
    col.style.display = 'block';
    col.style.background = block_colour;
    col.style.width = col_width + '%';
    col.style.marginLeft = spacing + '%';
    col.style.float = 'left';
    col.style.height = int_block_height + 'px';
    
    col_container.appendChild(col);
  }


  col_container_wrapper.appendChild(col_container);

  whole_container.insertBefore(col_container_wrapper, whole_container.firstChild);


  

  // Run Correct First Margin 
  var cols = col_container.getElementsByTagName('span');
  cols[0].style.marginLeft = '0';
  
};













//-------------- Build Controls --------------//
//---------------------------------------------//

// Preview Changes

// Preview Slide Events
// I'm lazy, thats why they are like this.
number_of_columns_el.addEventListener('input', previewBuild);
spacing_el.addEventListener('input', previewBuild);
block_height_el.addEventListener('input', previewBuild);
container_width_el.addEventListener('input', previewBuild);

block_colour_el.addEventListener('input', previewBuild);
background_colour_el.addEventListener('input', previewBuild);


// Invert Colours
invert_colours_el.addEventListener('click', function(){
  var block_colour = document.getElementById('block-colour').value;
  var background_colour = document.getElementById('background-colour').value;

  block_colour_el.value = background_colour;
  background_colour_el.value = block_colour;

  previewBuild()
});



// Preview View Display Changes
function previewBuild(){
  var number_of_columns = document.getElementById('number-of-columns').value;
  var spacing = document.getElementById('margin-width').value;
  var block_height = document.getElementById('block-height').value;
  var container_width = document.getElementById('container-width').value;

  var block_colour = document.getElementById('block-colour').value;
  var background_colour = document.getElementById('background-colour').value;
  

  preview_display.innerHTML = '';

  calculateAndBuildBlocks(container_width, block_height, number_of_columns, spacing, block_colour, background_colour, preview_display);
  
};




// Place Block Control
function placeBlock(){
  var number_of_columns = document.getElementById('number-of-columns').value;
  var spacing = document.getElementById('margin-width').value;
  var block_height = document.getElementById('block-height').value;
  var container_width = document.getElementById('container-width').value;

  var block_colour = document.getElementById('block-colour').value;
  var background_colour = document.getElementById('background-colour').value;


  // Remove Preview Display
  preview_display.innerHTML = '';


  // Local Storage Build History
  castle_history.push([container_width, block_height, number_of_columns, spacing, block_colour, background_colour]);
  localStorage.setItem('CastleHistory', JSON.stringify(castle_history));

  castle_history_url_string_container.innerHTML = document.URL + '#' + encodeURIComponent(localStorage.getItem('CastleHistory'));
  

  // Place Objects
  calculateAndBuildBlocks(container_width, block_height, number_of_columns, spacing, block_colour, background_colour, display);

  

  // Update Stats
  updateStats();

};




// Copy Blocks
function copyBlocks(event){
  var col_container = this;
  var container_width = parseInt(this.style.width);
  var block_height = parseInt(this.scrollHeight);
  var cols = col_container.children;
  var number_of_columns = cols.length;
  var spacing = parseInt(this.lastChild.style.marginLeft);

  var block_colour = cols[0].style.background;
  var background_colour = col_container.style.background;

  number_of_columns_el.value = number_of_columns;
  spacing_el.value = spacing;
  block_height_el.value = block_height;
  container_width_el.value = container_width;

  block_colour_el.value = rgbtohex( block_colour );
  background_colour_el.value = rgbtohex( background_colour );

  placeBlock();

}






function updateStats(){
  var stats_container = document.getElementById('stats-container');
  var stat_blocks_placed = document.getElementById('stat-blocks-placed');
  var stat_castle_height = document.getElementById('stat-castle-height');
  var total_spans = display.getElementsByTagName('span');
  var total_spans_length = total_spans.length;

  stat_blocks_placed.innerHTML = "Blocks: " + total_spans_length;

  stat_castle_height.innerHTML = "Height: " + display.scrollHeight;
};






// Toggle Buildemode
toggle_buildmode.addEventListener('click', function(){

  if ( left_container.style.display === 'none' ){
    left_container.style.display ='block';
    build_controls_container.style.display = 'block';
  } else { 
    left_container.style.display ='none';
    build_controls_container.style.display = 'none';
  }
  
});

// Magnification
magnification_el.addEventListener('input', function(){
  group_display.style.transform = 'scale(' + magnification_el.value * 0.1 + ')';
});







// If someone sends you a link of a castle.
if(window.location.hash) {
 var hash_value = window.location.hash.replace('#', '');
 var hash_to_array = decodeURIComponent(hash_value);
 display.innerHTML = '';
 createCastleFromString(hash_to_array);
 updateStats();
}


