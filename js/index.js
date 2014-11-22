
var group_display = document.getElementById('group-display');
var display = document.getElementById('display');
var preview_display = document.getElementById('preview-display');

var number_of_columns_el = document.getElementById('number-of-columns');
var spacing_el = document.getElementById('margin-width');
var block_height_el = document.getElementById('block-height');
var container_width_el = document.getElementById('container-width');



var magnification_el = document.getElementById('magnification');
magnification_el.addEventListener('input', changeMagnification);

function changeMagnification(){
  group_display.style.transform = 'scale(' + magnification_el.value * 0.1 + ')';
}






// Equal Spaced Equation
// Parse All Inputs as Numbers
// Calculate Size and Margin and Send those values off to create the columns.
function calculate_widths(container_width, block_height, number_of_columns, spacing, whole_container){
  var int_number_of_columns = parseInt(number_of_columns);
  var int_spacing = parseInt(spacing);
  var int_container_width = parseInt(container_width);
  var int_block_height = parseInt(block_height);

  // Column Measurements
  var remaining_num_of_cols = int_number_of_columns - 1;
  var total_margin_spacing = remaining_num_of_cols * int_spacing;
  var remaining_width_after_margin = 100 - total_margin_spacing;
  var col_width = remaining_width_after_margin / int_number_of_columns;
  
  createCols(container_width, int_block_height, col_width, int_number_of_columns, int_spacing, whole_container);
};



// Create and Style Columns and the Container
function createCols(container_width, int_block_height, col_width, number_of_columns, spacing, whole_container){
  var col_container = document.createElement('article');
  var col;
  var col_style_width;
  var col_style_margin;
  var whole_container = whole_container;

  var col_container_wrapper = document.createElement('section');
  col_container_wrapper.style.position = 'relative';
  col_container_wrapper.style.width = '100%';
  

  
  // col-container
  col_container.setAttribute('class', 'col-container');
  col_container.style.width = container_width + '%';

  col_container.addEventListener('click', copyCols);



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
    col.style.background = '#111';
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


function copyCols(event){
  var col_container = this;
  var container_width = parseInt(this.style.width);
  var block_height = parseInt(this.scrollHeight);
  var cols = col_container.children;
  var number_of_columns = cols.length;
  var spacing = parseInt(this.lastChild.style.marginLeft);

  number_of_columns_el.value = number_of_columns;
  spacing_el.value = spacing;
  block_height_el.value = block_height;
  container_width_el.value = container_width;

  placeBlock();

}











//-------------- Display Columns --------------//
//---------------------------------------------//

// Preview Changes

// Preview Slide Events
// I'm lazy, thats why they are like this.
number_of_columns_el.addEventListener('input', previewBuild);
spacing_el.addEventListener('input', previewBuild);
block_height_el.addEventListener('input', previewBuild);
container_width_el.addEventListener('input', previewBuild);

// Preview View Display Changes
function previewBuild(){
  var number_of_columns = document.getElementById('number-of-columns').value;
  var spacing = document.getElementById('margin-width').value;
  var block_height = document.getElementById('block-height').value;
  var container_width = document.getElementById('container-width').value;

  preview_display.innerHTML = '';

  calculate_widths(container_width, block_height, number_of_columns, spacing, preview_display);
  
};


// Place Block Control
function placeBlock(){
  var number_of_columns = document.getElementById('number-of-columns').value;
  var spacing = document.getElementById('margin-width').value;
  var block_height = document.getElementById('block-height').value;
  var container_width = document.getElementById('container-width').value;
  
  calculate_widths(container_width, block_height, number_of_columns, spacing, display);

  // Update Stats
  updateStats();

  preview_display.innerHTML = '';

};


// Remove Last Block Control
function removeLastPlacedColumn(){
  var first_container = document.getElementsByTagName('section')[0];
  first_container.parentNode.removeChild(first_container);

  // Update Stats
  updateStats();
};


function updateStats(){
  var stats_container = document.getElementById('stats-container');
  var stat_blocks_placed = document.getElementById('stat-blocks-placed');
  var stat_castle_height = document.getElementById('stat-castle-height');
  var total_spans = display.getElementsByTagName('span');
  var total_spans_length = total_spans.length;

  stat_blocks_placed.innerHTML = "Blocks: " + total_spans_length;

  stat_castle_height.innerHTML = "Height: " + display.scrollHeight;

  // for (var i = 0, len = total_spans.length; i < len; i++){

  // }

};

placeBlock();