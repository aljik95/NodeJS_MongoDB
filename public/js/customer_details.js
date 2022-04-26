var xtag = 0;

$(document).ready(function() {
  var currLoc = $('#location').val();

  JSON.parse(divLocResult).forEach(element => {
    if(element.Location == currLoc){
      $('#divisor-inp').val(element.Divisor);
      return false;
    }
  });
});

// Jquery Dependency
$(document).on('change','#amount-inp', function (e){
  e.preventDefault();
  e.stopImmediatePropagation();
    formatCurrency($(this));

    if(!/[^a-zA-Z]/.test($(this).val()) || $(this).val() == ''){
      $('#points-inp').val('');
      return false;
    }

    var amt = $(this).val();
    var div = $('#divisor-inp').val();
    var points = 0.00;
    amt = amt.replace(',','');
    div = div.replace(',','');

    amt = parseFloat(amt) || '';
    div = parseFloat(div) || '';

    if(amt !='' && div !=''){
      points = (amt/div);
      $('#points-inp').val(points.toFixed(2));
    }else{
      $('#points-inp').val('');
    }
    xtag = 0
});
$(document).on('change','#divisor-inp', function (e){
  e.preventDefault();
  e.stopImmediatePropagation();
  formatCurrency($(this));

  if(!/[^a-zA-Z]/.test($(this).val()) || $(this).val() == ''){
    $('#points-inp').val('');
    return false;
  }

    var amt = $('#amount-inp').val();
    var div = $(this).val();
    var points = 0.00;
    amt = amt.replace(',','');
    div = div.replace(',','');

    amt = parseFloat(amt) || '';
    div = parseFloat(div) || '';

    if(amt !='' && div !=''){
      points = (amt/div);
      $('#points-inp').val(points.toFixed(2));
    }else{
      $('#points-inp').val('');
    }
    xtag = 0
});

$(document).on('change','#points-inp', function (e){
  e.preventDefault();
  e.stopImmediatePropagation();
  formatCurrency($(this));

  if(!/[^a-zA-Z]/.test($(this).val()) || $(this).val() == ''){
    $('#points-inp').val('');
    return false;
  }

    var pnt = $(this).val();
    var div = $('#divisor-inp').val();
    var amount = 0.00;
    pnt = pnt.replace(',','');
    div = div.replace(',','');

    pnt = parseFloat(pnt) || '';
    div = parseFloat(div) || '';

    if(pnt !='' && div !=''){
      amount = (pnt*div);
      $('#amount-inp').val(amount.toFixed(2));
    }else{
      $('#amount-inp').val('');
    }
    
    xtag = 0
});

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val =  input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}


$(document).on('click','.pnt-save', function (e){
  e.preventDefault();
  e.stopImmediatePropagation();
  
    xtag = 1
    $('.add-pnts').click()

    
});

function validateForm(){
  var ret = true;
 
  $('.alert').show();
  $('.dvTableDetails').addClass('isBlur');

 
  if(xtag != 1){
    ret = false;
  }else{
    $('.alert').hide();
    $('.dvTableDetails').removeClass('isBlur');
    ret = true;
  }
  return ret;

}

$(document).on('click','.closebtn', function (e){
  e.preventDefault();
  e.stopImmediatePropagation();
  
    xtag = 0
    $('.alert').hide();
    $('.dvTableDetails').removeClass('isBlur');

    $('.vw_pr_qr').hide();
    $('.dvTableDetails').removeClass('isBlur');
}); 

function isBlur(){
  $('.vw_pr_qr').show();
  $('.dvTableDetails').addClass('isBlur');
}


$(document).on('click','.isRadInp', function (){
  var clk = $(this).prop('checked');

    if(clk){
      $("#divisor-inp").prop("disabled", false);
      $("#divisor-inp").css('border-color','#ff9800')
    }
})

$(document).on('change','.location',function(){
  var currLoc = $('#location').val();

  JSON.parse(divLocResult).forEach(element => {
    if(element.Location == currLoc){
      $('#divisor-inp').val(element.Divisor);
      return false;
    }
      
  });
})