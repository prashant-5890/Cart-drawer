// Change in Cart
function updateQuantity(line,quantity) {
  $.ajax({
      type: 'POST',
      url: '/cart/change',
      data: 'quantity=' + quantity + '&line=' + line,
      dataType: 'json',
      success: function(cart) {
      },
    });
}
// ===============================================================================
// Fetch product to cart Drawer
$(document).ready(function() {
  $('#AddToCart').click(function(e){
    e.preventDefault();
    var data = $(this).parents('form').serialize();
    var qty = 1;
    $.ajax({
      type: 'POST',
      url: '/cart/add',
      data: data,
      dataType: 'html',
      success: function(response){
        $('.cart__drawer-item').html($(response).find('.cart__drawer-item').html());
        $('.cart__drawer').html($(response).filter('.cart__drawer').html()).addClass('show-cart__drawer');
        $('.cart__drawer').addClass('show-cart__drawer');
        $('body').addClass('cv--show-cart__drawer');

        $('.cross').click(function(){
          $('.cart__drawer').removeClass('show-cart__drawer');
        });

      }
    });

  });
});
// ===============================================================================


$(document).ready(function() {

  // Cart Drawer Open On Click Cart Icon
  $(document).on("click",".cart-page-link", function(e) {
    e.preventDefault();
    $('.cart__drawer').addClass('show-cart__drawer');
    $('body').addClass('cv--show-cart__drawer');
    console.log('codevibez');
  });
  // Cart Drawer Close On Click cross Icon
  $(document).on("click",".cross",function() {
    $('.cart__drawer').removeClass('show-cart__drawer');
    $('body').removeClass('cv--show-cart__drawer');
  });
//   Close Cart Drawer click anywhere
  $(document).mouseup(function(e){
    var container = $(".cart__drawer");
    if (!container.is(e.target) && container.has(e.target).length === 0){
      container.show();
      $('.cart__drawer').removeClass('show-cart__drawer');
      $('body').removeClass('cv--show-cart__drawer');
    }
  });
  
});



// ===============================================================================


$(document).ready(function() {
  // Remove Item from Cart
  $(document).on("click",".cart__remove",function(e) {
    e.preventDefault();
    var itemUrl = $(this).attr('href');
    $.ajax({
      url: itemUrl,
      type:'GET',
      dataType: 'html',
      success: function(response){
        $('.cart__drawer-item').html($(response).find('.cart__drawer-item').html());
        $('.cart__drawer').html($(response).filter('.cart__drawer').html());  
      }
    });
  });
});

// ===============================================================================




// Change In Quantity Selector
$(document).ready(function() {

  $(document).on("click",".plus",function() {
    $(this).prev().val(+$(this).prev().val() + 1);
    var data =  $(this).parents('form').serialize();
    console.log(data);
    var quantity = $(this).prev().val();
    updateQuantity(data,quantity);
    $.ajax({
      type: 'POST',
      url: '/cart/update',
      data: data,
      dataType: 'html',
      success: function(response){
        $('.cart__drawer-item').html($(response).find('.cart__drawer-item').html());
        $('.cart__drawer').html($(response).filter('.cart__drawer').html());
      }
    });

  });

  $(document).on("click",".minus",function() {
    if ($(this).next().val() > 0) {
      $(this).next().val(+$(this).next().val() - 1);
      var data =  $(this).parents('form').serialize();
      var quantity = $(this).next().val();
      updateQuantity(data,quantity);
      $.ajax({
        type: 'POST',
        url: '/cart/update',
        data: data,
        dataType: 'html',
        success: function(response){
          $('.cart__drawer-item').html($(response).find('.cart__drawer-item').html());
          $('.cart__drawer').html($(response).filter('.cart__drawer').html());
        }
      });
    }
  });
});
//** this code for ajaxify **//
var addItem  = $('.btn--secondary').parent('.product-form--wide');
  
    $('.btn--secondary').on('click', function(e){
      e.preventDefault();
      $.ajax({
            url: '/cart/add.js',
            dataType: 'json',
            type: 'post',
            data: addItem.serialize(),
        	dataType: 'json',
            success: function(data) {
              $.getJSON('/cart.js', function(cart) {
                   $('.cart-count').html(cart.item_count);
                 	console.log(cart.item_count)
                 });
            		},
            error: function(XMLHttpRequest) {
              console.log('error', XMLHttpRequest)
            		}
      });
	});
