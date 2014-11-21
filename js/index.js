var its_container_wrapper = document.getElementById('equationresult');
var display = document.getElementById('display');
var preview_display = document.getElementById('preview-display');

function correctFirstMargin(col_container, col_width){
  var cols = col_container.getElementsByTagName('div');
  cols[0].style.marginLeft = '0';
}




function createCols(container_width, int_block_height, col_width, number_of_columns, spacing, whole_container){
  
  var col_container = document.createElement('section');
  var col;
  var col_style_width;
  var col_style_margin;
  var whole_container = whole_container;
  
  // col-container
  col_container.setAttribute('class', 'col-container');
  col_container.style.width = container_width + '%';


  
  //columns
  for (var i = 0, len = number_of_columns; i < len; i++){
    col = document.createElement('div');
    col.setAttribute('class', 'col-' + number_of_columns);
    col.style.width = col_width + '%';
    col.style.marginLeft = spacing + '%';
    col.style.color = '#fff';
    col.style.textAlign = 'center';
    col.style.padding = '20px 0 0 0'
    col.style.float = 'left';
    col.style.height = int_block_height + 'px';
    col.style.background = '#111';
    
    col_container.appendChild(col);
  }

  whole_container.insertBefore(col_container, whole_container.firstChild);


  correctFirstMargin(col_container, col_width);
  
}



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
}




function clearEverything(){
  display.innerHTML = '';
}

function removeLast(){
  var first_container = document.getElementsByTagName('section')[0];
  first_container.parentNode.removeChild(first_container);
}

//showEqualColSteps('4', '2%', '100%', '%');
//showEqualColSteps('4', '25px', '800px', 'px');



function submitBlockDetails(){
  var number_of_columns = document.getElementById('number_of_rows').value;
  var spacing = document.getElementById('margin-width').value;
  var block_height = document.getElementById('block-height').value;
  var container_width = document.getElementById('container-width').value;
  
  calculate_widths(container_width, block_height, number_of_columns, spacing, display);
}


function previewBuild(){
  var number_of_columns = document.getElementById('number_of_rows').value;
  var spacing = document.getElementById('margin-width').value;
  var block_height = document.getElementById('block-height').value;
  var container_width = document.getElementById('container-width').value;
  preview_display.innerHTML = '';
  calculate_widths(container_width, block_height, number_of_columns, spacing, preview_display);
};


var number_of_columns_el = document.getElementById('number_of_rows');
var spacing_el = document.getElementById('margin-width');
var block_height_el = document.getElementById('block-height');
var container_width_el = document.getElementById('container-width');

number_of_columns_el.addEventListener('input', previewBuild);
spacing_el.addEventListener('input', previewBuild);
block_height_el.addEventListener('input', previewBuild);
container_width_el.addEventListener('input', previewBuild);





// its.snippet();