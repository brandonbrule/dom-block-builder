var its_container_wrapper = document.getElementById('equationresult');
var display = document.getElementById('display');

function correctFirstMargin(col_container, col_width, measurement){
  var cols = col_container.getElementsByTagName('div');
  cols[0].style.marginLeft = '0';
  cols[0].innerHTML = 'width: ' + col_width + measurement + '<br>'
                    + 'margin-left: 0';
}




function createCols(col_width, number_of_columns, spacing, container_width, measurement){
  
  var col_container = document.createElement('section');
  var col;
  var col_style_width;
  var col_style_margin;
  
  // col-container
  col_container.setAttribute('class', 'col-container');
  col_container.style.background = '#abc';
  col_container.style.width = container_width;
  col_container.style.margin = '10px auto';
  
  //columns
  for (var i = 0, len = number_of_columns; i < len; i++){
    col = document.createElement('div');
    col.setAttribute('class', 'col-' + number_of_columns);
    col.style.width = col_width + measurement;
    col.style.marginLeft = spacing + measurement;
    col.style.color = '#fff';
    col.style.textAlign = 'center';
    col.style.padding = '20px 0 0 0'
    col.style.float = 'left';
    col.style.height = '100px';
    col.style.background = '#333';
    
    col.innerHTML = 'width: ' + col_width + measurement + '<br>'
                    + 'margin-left: ' + spacing + measurement;
   
    col_container.appendChild(col);
  }
  
  display.appendChild(col_container);
  
  
  correctFirstMargin(col_container, col_width, measurement);
  
}



function showEqualColSteps(number_of_columns, spacing, container_width, measurement){
  var int_number_of_columns = parseInt(number_of_columns);
  var int_spacing = parseInt(spacing);
  var int_container_width = parseInt(container_width);
  
  var remaining_num_of_cols = int_number_of_columns - 1;
  var total_margin_spacing = remaining_num_of_cols * int_spacing;
  var remaining_width_after_margin = int_container_width - total_margin_spacing;
  var col_width = remaining_width_after_margin / int_number_of_columns;
  
  var object = {
    number_of_columns : number_of_columns,
    spacing : spacing,
    container_width: container_width
  }
  its.linebreak();
  its.heading('@include equalSpaced(' + number_of_columns + ', ' + spacing + ', ' + container_width +')');
  its.linebreak();
  its.a(object, false);
  its.message(
    'Step 1: Number of Columns - First Column = Remaining Number of Columns', 
    'Number of Columns(' + number_of_columns + ') - First Column(1) = ' + 'Remaining Number of Columns(' + remaining_num_of_cols + ')'
  );

  its.message(
    'Step 2: Remaining Number of Columns * Margin Spacing = Total Margin Spacing', 
    'Remaining Number of Columns(' + remaining_num_of_cols + ') * Margin Spacing(' + int_spacing + measurement  + ') = ' + 'Total Margin Spacing(' + total_margin_spacing + measurement + ')'
  );
  
  its.message(
    'Step 3: Container Width - Total Margin Spacing = Remaining Width', 
    'Container Width(' + int_container_width + measurement + ') - Total Margin Spacing(' + total_margin_spacing + measurement +') = ' + 'Remaining Width(' + remaining_width_after_margin + measurement + ')'
  );

  its.message(
    'Step 4: Remaining Width / Total Number of Columns = Each Column Width',
    'Remaining Width(' + remaining_width_after_margin + measurement + ') / Total Number of Columns(' + int_number_of_columns + ') = ' + 'Each Column Width('  + col_width + measurement + ')'
  )
  
  createCols(col_width, int_number_of_columns, int_spacing, container_width, measurement);
}

its.snippet();


function clearEverything(){
  its_container_wrapper.innerHTML = '';
  display.innerHTML = '';
  its.snippet();
}

//showEqualColSteps('4', '2%', '100%', '%');
//showEqualColSteps('4', '25px', '800px', 'px');