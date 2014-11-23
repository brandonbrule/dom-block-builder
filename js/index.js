// -------------------------- //
//   Global Variables     //
// -------------------------- //

// Display and Preview Containers
var display = document.getElementById('display');
var preview_display = document.getElementById('preview-display');

// Controls Container and Toggle
var toggle_buildmode = document.getElementById('toggle-buildmode');
var build_controls_container = document.getElementById('build-controls-container');

// Control Elements
var number_of_columns_el = document.getElementById('number-of-columns');
var spacing_el = document.getElementById('margin-width');
var block_height_el = document.getElementById('block-height');
var container_width_el = document.getElementById('container-width');
var block_colour_el = document.getElementById('block-colour');
var background_colour_el = document.getElementById('background-colour');
var invert_colours_el = document.getElementById('invert-colours');
var save_button_el = document.getElementById('save-block');
var place_button_el = document.getElementById('place-block');

// Input Values for Calculations
var number_of_columns;
var spacing;
var block_height;
var container_width;
var block_colour;
var background_colour;

// Magnification Container
var group_display = document.getElementById('group-display');
var magnification_el = document.getElementById('magnification');

// Array of Block History
var castle_history = [];








// -------------------------- //
//  From URL                  //
// -------------------------- //
// URL Stuff
var castle_history_url_string_container = document.getElementById('castle-history-url-string-container');
var castle_history_url_string = document.URL + '#' + encodeURIComponent(localStorage.getItem('CastleHistory'));

// If it comes from a url
// If someone sends you a link of a castle.
if(window.location.hash) {
 var hash_value = window.location.hash.replace('#', '');
 var hash_to_array = decodeURIComponent(hash_value);
 display.innerHTML = '';
 createCastleFromString(hash_to_array);
 
} else {
  createCastleFromString(localStorage.getItem('CastleHistory'));
}

// Update URL TextArea
castle_history_url_string_container.innerHTML = castle_history_url_string;

// LOAD FROM LOCAL STORAGE OR URL
function createCastleFromString(string){
  var CastleHistory = JSON.parse(string);
  for ( var i = 0, len = CastleHistory.length; i < len; i++ ){
    castle_history.push(CastleHistory[i]);
    calculateAndBuildBlocks(CastleHistory[i][0], CastleHistory[i][1], CastleHistory[i][2], CastleHistory[i][3], CastleHistory[i][4], CastleHistory[i][5], display);
  }
  updateStats();
}








// -------------------------- //
//   Global Helpers           //
// -------------------------- //

// Convert RGB to HEX Return String with Hash
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


// Clear Everything, localstorage and playboard.
function clearAll(){
  display = document.getElementById('display');
  preview = document.getElementById('preview-display');
  display.innerHTML = '';
  preview_display.innerHTML = '';
  castle_history_url_string_container.innerHTML = '';
  localStorage.removeItem('CastleHistory');
  castle_history = [];
  localStorage.setItem('CastleHistory', JSON.stringify(castle_history));
}


// Update block Stats
function updateStats(){
  var stats_container = document.getElementById('stats-container');
  var stat_blocks_placed = document.getElementById('stat-blocks-placed');
  var stat_castle_height = document.getElementById('stat-castle-height');
  var total_spans = display.getElementsByTagName('span');
  var total_spans_length = total_spans.length;

  stat_blocks_placed.innerHTML = total_spans_length;
  stat_castle_height.innerHTML = display.scrollHeight;
};









// -------------------------- //
//   Block Build Controls     //
// -------------------------- //

// Preview Slide Events
// I'm lazy, thats why they are like this.
number_of_columns_el.addEventListener('input', previewBuild);
spacing_el.addEventListener('input', previewBuild);
block_height_el.addEventListener('input', previewBuild);
container_width_el.addEventListener('input', previewBuild);

// On Colour Change
block_colour_el.addEventListener('input', previewBuild);
background_colour_el.addEventListener('input', previewBuild);


// Toggle Buildemode
toggle_buildmode.addEventListener('click', function(){

  if ( build_controls_container.style.display === 'none' ){
    build_controls_container.style.display = 'block';
  } else { 
    build_controls_container.style.display = 'none';
  }
  
});


// Magnification
magnification_el.addEventListener('input', function(){
  group_display.style.transform = 'scale(' + magnification_el.value * 0.1 + ')';
});



// Invert Colours
invert_colours_el.addEventListener('click', function(){
  var block_colour = document.getElementById('block-colour').value;
  var background_colour = document.getElementById('background-colour').value;

  block_colour_el.value = background_colour;
  background_colour_el.value = block_colour;

  previewBuild()
});




// Preview View Display Changes
// Grabs values from inputs
// Clears and rebuilds boxes on change
// Doesn't touch history or localstorage.
function previewBuild(){
  getControlValues();
  preview_display.innerHTML = '';
  calculateAndBuildBlocks(container_width, block_height, number_of_columns, spacing, block_colour, background_colour, preview_display);
};



// Get Input Values
// It needs to check and set the values with each event triggered.
function getControlValues(){
  number_of_columns = number_of_columns_el.value;
  spacing = spacing_el.value;
  block_height = block_height_el.value;
  container_width = container_width_el.value;
  block_colour = block_colour_el.value;
  background_colour = background_colour_el.value;
};


// Global Site Scan And Object/LocalStorage Creation
function scanAllAndSetCastleHistory(){
  var rows = display.getElementsByTagName('article');
  var temparr=[];

  for ( var i = 0, len = rows.length; i < len; i++ ){
    var container_width = parseInt(rows[i].style.width);
    var block_height = parseInt(rows[i].lastChild.style.height);
    var number_of_columns = parseInt(rows[i].children.length);
    var spacing = parseInt(rows[i].lastChild.style.marginLeft);
    var block_colour = rgbtohex( rows[i].lastChild.style.background );
    var background_colour = rgbtohex( rows[i].style.background );

    temparr.unshift([container_width, block_height, number_of_columns, spacing, block_colour, background_colour]);
  }

  castle_history = temparr;

  // Local Storage Build History
  localStorage.removeItem('CastleHistory');
  localStorage.setItem('CastleHistory', JSON.stringify(castle_history));

  castle_history_url_string_container.innerHTML = document.URL + '#' + encodeURIComponent(JSON.stringify(castle_history));


  // Update Stats
  updateStats();

}













// ----------------------------- //
// Block Set and Edit Controls   //
// ----------------------------- //

// Place Block Control
function placeBlock(){

  // Get Values from Control Inputs
  getControlValues();

  // Clear Preview Display
  preview_display.innerHTML = '';

  // Create Blocks
  calculateAndBuildBlocks(container_width, block_height, number_of_columns, spacing, block_colour, background_colour, display);

  // Reset the display block to display in case you were editing.
  display = document.getElementById('display');

  // Scan and Update Local Storage
  scanAllAndSetCastleHistory();

};


// Copy Blocks
function copyBlock(event){

  // Set Column Container Element from One Clicked
  var col_container = event.target.parentNode;
  var cols = col_container.children;

  // Get Block Information from The One Clicked
  container_width = parseInt(this.style.width);
  block_height = parseInt(this.scrollHeight);
  number_of_columns = cols.length;
  spacing = parseInt(this.lastChild.style.marginLeft);
  block_colour = cols[0].style.backgroundColor;
  background_colour = col_container.style.backgroundColor;

  // Set Build Input Values
  number_of_columns_el.value = number_of_columns;
  spacing_el.value = spacing;
  block_height_el.value = block_height;
  container_width_el.value = container_width;
  block_colour_el.value = rgbtohex( block_colour.toString() );
  background_colour_el.value = rgbtohex( background_colour.toString() );

  // Set Displays to Creation Locations
  display = document.getElementById('display');
  preview_display = document.getElementById('preview-display');

  // Place Block
  placeBlock();

}


function editBlock(event){

  // Set Column Container Element from One Clicked
  var col_container = this.parentNode.getElementsByTagName('article')[0];
  var cols = col_container.children;

  // Get Block Information from The One Clicked
  container_width = parseInt(col_container.style.width);
  block_height = parseInt(col_container.scrollHeight);
  number_of_columns = cols.length;
  spacing = parseInt(col_container.lastChild.style.marginLeft);
  block_colour = cols[0].style.background;
  background_colour = col_container.style.background;

  // Open Up Build Controls if Hidden
  build_controls_container.style.display = 'block';

  // Set Control Input Values
  number_of_columns_el.value = number_of_columns;
  spacing_el.value = spacing;
  block_height_el.value = block_height;
  container_width_el.value = container_width;
  block_colour_el.value = rgbtohex( block_colour );
  background_colour_el.value = rgbtohex( background_colour );

  // Set Preview Display and Display Box to this element
  // So Controls update the edited container and placeBlock
  // Sets the new box to where it was. (The one you being edited)
  preview_display = this.parentNode;
  display = this.parentNode;
  save_button_el.style.display='block';
  place_button_el.style.display = 'none';

  // Place block
  placeBlock();

};


function saveBlock(){

  // Get Values from 
  getControlValues();

  // Reset Display and Preview containers
  display = document.getElementById('display');
  preview_display = document.getElementById('preview-display');
  preview_display.innerHTML = '';

  // Show Place Block, hide save block button.
  save_button_el.style.display='none';
  place_button_el.style.display = 'block';

  // Update LocalStorage
  scanAllAndSetCastleHistory();

};











// -------------------------- //
// Build Blocks DOM Creation //
// -------------------------- //

// Column Creation and Math
// Equal Spaced Equation
// Parse All Inputs as Numbers
// Calculate Size and Margin and Send those values off to create the columns.
function calculateAndBuildBlocks(container_width, block_height, number_of_columns, spacing, block_colour, background_colour, whole_container){

  // Make sure everything's a number
  container_width = parseInt(container_width);
  block_height = parseInt(block_height);
  number_of_columns = parseInt(number_of_columns);
  spacing = parseInt(spacing);


  // Calculate Columns Measurements
  var remaining_num_of_cols = number_of_columns - 1;
  var total_margin_spacing = remaining_num_of_cols * spacing;
  var remaining_width_after_margin = 100 - total_margin_spacing;
  var col_width = remaining_width_after_margin / number_of_columns;
  

  // Container Elements
  var col_container_wrapper = document.createElement('section');
  var col_container = document.createElement('article');
  var col;
  var editButton = document.createElement('button');
  var editButtonCtx = document.createTextNode('edit');
  var closeButton = document.createElement('button');
  var closeCtx = document.createTextNode('x');
  var col_style_width;
  var col_style_margin;


  // Col Wrapper
  col_container_wrapper.style.position = 'relative';
  col_container_wrapper.style.width = '100%';

  
  // Col Container
  col_container.setAttribute('class', 'col-container');
  col_container.style.width = container_width + '%';
  col_container.style.background = background_colour;

  col_container.addEventListener('click', copyBlock);


  // Edit Button
  editButton.appendChild(editButtonCtx);
  col_container_wrapper.appendChild(editButton);
  editButton.addEventListener('click', editBlock);


  // Close Button
  closeButton.appendChild(closeCtx);
  col_container_wrapper.appendChild(closeButton);
  closeButton.onclick = function () {
    col_container_wrapper.parentNode.removeChild(col_container_wrapper);
    display = document.getElementById('display');
    scanAllAndSetCastleHistory();
  };
  

  // Each Column
  for (var i = 0, len = number_of_columns; i < len; i++){
    col = document.createElement('span');
    col.style.display = 'block';
    col.style.background = block_colour;
    col.style.width = col_width + '%';
    col.style.marginLeft = spacing + '%';
    col.style.float = 'left';
    col.style.height = block_height + 'px';
    
    col_container.appendChild(col);
  }


  // Append It All
  col_container_wrapper.appendChild(col_container);
  whole_container.insertBefore(col_container_wrapper, whole_container.firstChild);
  

  // Remove First Column Margin 
  var cols = col_container.getElementsByTagName('span');
  cols[0].style.marginLeft = '0';

};















