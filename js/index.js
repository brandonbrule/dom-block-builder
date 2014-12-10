// -------------------------- //
//   Global Variables     //
// -------------------------- //

// Display and Preview Containers
var body = document.getElementsByTagName('body')[0];
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

// Stats URL Container
var stats_url_container = document.getElementById('stats-url-container');

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
var castle_history_url_string;

// If Local Storage Exists Load LocalStorage History

// No Local Storage -- Local Storage === Null
if (localStorage.getItem("CastleHistory") === null) {
  // Empty Object
  castle_history_url_string = encodeURIComponent(JSON.stringify(castle_history));
} else {
  // Castle History From Local Storage
  castle_history_url_string = encodeURIComponent(localStorage.getItem('CastleHistory'));
}
// Append url as Hashtag
castle_history_url_string = document.URL + '#' + castle_history_url_string;






// If it comes from a url
// If someone sends you a link of a castle.
if(window.location.hash) {
 var hash_value = window.location.hash.replace('#', '');
 var hash_to_array = decodeURIComponent(hash_value);
 var starting_point_button = document.getElementById('starting-point-button');
 var toggle_controls_button_container = document.getElementById('toggle-controls-button-container');

 body.className = body.className + "hash";

 starting_point_button.style.display = 'block';
 toggle_controls_button_container.style.display = 'none';
 display.innerHTML = '';
 createCastleFromString(hash_to_array, 'no_events');
 build_controls_container.style.display = 'none';

} else {
  var home_el = document.getElementById('back-home');
  home_el.style.display = 'none';

  if (localStorage.getItem("CastleHistory") === null) {
    // No Local Storage
    var default_castle_if_nothing = decodeURIComponent('%5B%5B100%2C0%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B20%2C2%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B18%2C0%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B16%2C7%2C4%2C3%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B16%2C34%2C4%2C10%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B16%2C7%2C4%2C3%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B18%2C7%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B16%2C15%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B12%2C14%2C7%2C1%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B12%2C3%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C3%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B12%2C3%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C0%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C9%2C10%2C7%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C0%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B12%2C3%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C0%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C9%2C10%2C7%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C0%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B12%2C3%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C0%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B12%2C2%2C7%2C1%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C4%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C3%2C7%2C9%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C1%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C0%2C7%2C10%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C1%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C6%2C7%2C10%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C1%2C7%2C7%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C1%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B12%2C1%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C1%2C6%2C3%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B12%2C2%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B10%2C3%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C0%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C0%2C10%2C1%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C0%2C10%2C2%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C0%2C10%2C3%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C0%2C10%2C2%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C0%2C10%2C1%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C0%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C2%2C7%2C8%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C2%2C9%2C8%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C3%2C8%2C8%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C3%2C7%2C10%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C3%2C6%2C10%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C2%2C5%2C10%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C1%2C5%2C5%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C1%2C5%2C3%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C3%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C1%2C10%2C10%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C1%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B6%2C4%2C5%2C8%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B6%2C1%2C5%2C4%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B6%2C2%2C4%2C4%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B6%2C6%2C3%2C4%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B6%2C10%2C2%2C4%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B6%2C11%2C1%2C0%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B4%2C2%2C6%2C4%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B4%2C2%2C3%2C4%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B2%2C2%2C2%2C4%2C%22%234361eb%22%2C%22%23ffffff%22%5D%2C%5B8%2C13%2C2%2C7%2C%22%23ffffff%22%2C%22%234361eb%22%5D%2C%5B8%2C13%2C1%2C0%2C%22%23ffffff%22%2C%22%234361eb%22%5D%5D');
    createCastleFromString(default_castle_if_nothing, 'has_events');

  } else {
    createCastleFromString( localStorage.getItem('CastleHistory'), 'has_events' );
  }

  

}




var isInIFrame = (window.location != window.parent.location) ? true : false;

if (isInIFrame){
  body.className = body.className + "-iframe";
}




function makeThisMyStartingPoint(){
  saveBlock();
  window.location.replace('');
}





// Update URL TextArea
castle_history_url_string_container.value = castle_history_url_string;



// LOAD FROM LOCAL STORAGE OR URL
function createCastleFromString(string, render_events){
  var CastleHistory = JSON.parse(string);
  for ( var i = 0, len = CastleHistory.length; i < len; i++ ){
    castle_history.push(CastleHistory[i]);
    calculateAndBuildBlocks(CastleHistory[i][0], CastleHistory[i][1], CastleHistory[i][2], CastleHistory[i][3], CastleHistory[i][4], CastleHistory[i][5], display, render_events);
  }
  updateStats();
}



var iframe_history_array = [];


// Load information from localstorage or object.  
if (localStorage.getItem('Iframe_History') === null) {
  var iframe_history_array = localStorage.setItem('Iframe_History', JSON.stringify(iframe_history_array));
} else {
  var iframe_history_array = JSON.parse(localStorage.getItem('Iframe_History'));
  displayHistoryFrames();
}





function createHistoryFrames(){
  var iframe_history_container = document.getElementById('iframe-history-container');
  var iframe;
  var a;
  var iframe_history_localstorage;

  iframe_history_container.innerHTML ='';

  iframe_history_array.unshift(castle_history_url_string_container.value);

  // Add String to Value.
  if ( iframe_history_array.length >= 3 ){
    iframe_history_array.pop();
  }

  localStorage.setItem('Iframe_History', JSON.stringify(iframe_history_array));
  iframe_history_array = JSON.parse(localStorage.getItem('Iframe_History'));

  displayHistoryFrames();
}



function displayHistoryFrames(){
  var iframe_history_container = document.getElementById('iframe-history-container');
  var iframe;

  iframe_history_container.innerHTML ='';

  for (var i = 0; i < iframe_history_array.length; i++){
    anchor = document.createElement('a');
    anchor.style.padding = '1em';
    anchor.style.background = '#53a7ea';
    anchor.style.display = 'block';
    anchor.style.margin = '1em 0 0 0';
    anchor.setAttribute('href', iframe_history_array[i]);
    anchor.setAttribute('target', '_blank');
    
    iframe = document.createElement('iframe');
    iframe.setAttribute('src', iframe_history_array[i]);

    anchor.appendChild(iframe);
    iframe_history_container.appendChild(anchor);
  }
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
  castle_history_url_string_container.value = '';
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
    stats_url_container.style.display = 'block';
  } else { 
    build_controls_container.style.display = 'none';
    stats_url_container.style.display = 'none';
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
    var block_colour = rgbtohex( rows[i].lastChild.style.backgroundColor );
    var background_colour = rgbtohex( rows[i].style.backgroundColor );

    temparr.unshift([container_width, block_height, number_of_columns, spacing, block_colour, background_colour]);
  }

  castle_history = temparr;

  // Local Storage Build History
  localStorage.removeItem('CastleHistory');
  localStorage.setItem('CastleHistory', JSON.stringify(castle_history));

  castle_history_url_string_container.value = document.URL + '#' + encodeURIComponent(JSON.stringify(castle_history));


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





function editBlock(event){


  // Reset First In Case you Keep Spamming Edit
  //preview_display = document.getElementById('preview-display');
  //display = document.getElementById('display');


  // Set Column Container Element from One Clicked
  var col_container_wrapper = this.parentNode;
  var col_container = this.parentNode.getElementsByTagName('article')[0];
  var cols = col_container.children;

  // Get Block Information from The One Clicked
  container_width = parseInt(col_container.style.width);
  block_height = parseInt(col_container.scrollHeight);
  number_of_columns = cols.length;
  spacing = parseInt(col_container.lastChild.style.marginLeft);
  block_colour = cols[0].style.backgroundColor;
  background_colour = col_container.style.backgroundColor;



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
  save_button_el.parentNode.style.display='block';
  place_button_el.parentNode.style.display = 'none';



  // Delete Block
  var closeButton = document.createElement('button');
  var closeCtx = document.createTextNode('x');
  
  closeButton.onclick = function () {
    event.stopPropagation();
    col_container_wrapper.parentNode.removeChild(col_container_wrapper);
    display = document.getElementById('display');
    scanAllAndSetCastleHistory();
  };
  


  // Set Fixed Controls Mobile
  build_controls_container.classList.add("fixed-controls");

  // Add Active Class to Edit Container
  removeActiveContainerClass();
  this.parentNode.classList.add("active-container");

  // Place block
  //placeBlock();

   // Close Button
  closeButton.appendChild(closeCtx);
  col_container_wrapper.appendChild(closeButton);

};

function removeActiveContainerClass(){
  var active_containers = document.getElementsByClassName('active-container');
  for (var i = 0, len = active_containers.length; i < len; i++){
    active_containers[i].classList.remove("active-container");
  }
};


function saveBlock(){
  removeActiveContainerClass();

  // Get Values from 
  getControlValues();

  // Reset Display and Preview containers
  display = document.getElementById('display');
  preview_display = document.getElementById('preview-display');
  preview_display.innerHTML = '';

  // Show Place Block, hide save block button.
  save_button_el.parentNode.style.display='none';
  place_button_el.parentNode.style.display = 'block';

  // Remove Fixed Class Controls Mobile
  build_controls_container.classList.remove("fixed-controls")

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
function calculateAndBuildBlocks(container_width, block_height, number_of_columns, spacing, block_colour, background_colour, whole_container, render_events){

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

  var col_style_width;
  var col_style_margin;


  // Col Wrapper
  col_container_wrapper.style.position = 'relative';
  col_container_wrapper.style.width = '100%';

  
  // Col Container
  col_container.setAttribute('class', 'col-container');
  col_container.style.width = container_width + '%';
  col_container.style.background = background_colour;
  
  

  // Each Column
  for (var i = 0, len = number_of_columns; i < len; i++){
    col = document.createElement('span');
    col.style.display = 'block';
    col.style.background = block_colour;
    col.style.width = col_width + '%';
    col.style.marginLeft = spacing + '%';
    col.style.float = 'left';
    col.style.height = (block_height) + 'vh';
    
    col_container.appendChild(col);
  }



  if (render_events !== 'no_events'){
    // Edit
    col_container.addEventListener('click', editBlock);

  }


  // Append It All
  col_container_wrapper.appendChild(col_container);
  whole_container.insertBefore(col_container_wrapper, whole_container.firstChild);
  

  // Remove First Column Margin 
  var cols = col_container.getElementsByTagName('span');
  cols[0].style.marginLeft = '0';

};