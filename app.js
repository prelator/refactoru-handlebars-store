//Document ready
$(document).ready(function(){
    
    //============== Global functions ===========
    if (!String.prototype.supplant) {
        String.prototype.supplant = function (o) {
            return this.replace(
                /\{([^{}]*)\}/g,
                function (a, b) {
                    var r = o[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        };
    }

    var checkDup = function(name){
        var isDup = false;
        for (var i = 0; i < wishlist.length; i++) {
            if (wishlist[i].title === name) {
                isDup = true;
            }       
        }
        return isDup;        
    };        

    //Global variables
    var wishlist = []; 
    var wishTemplate = $('#wish-template').html();
    var wishCompile = Handlebars.compile(wishTemplate);

    var productTemplate = $('#product-template').html();
    var productCompile = Handlebars.compile(productTemplate);

    //============ Click handlers ==============
    
   //Add Button
   $(document).on('click', '#add-item', function() {
        $(document).find('.wish-list-item').remove();
        var name = $(this).closest('.product').attr('data-name');
        var price = $(this).closest('.product').attr('data-price');
        var newItem = {
            title: name,
            price: price,
            };         
        if (!checkDup(name)) {
            wishlist.push(newItem);
            }
        renderWishlist();
    });

   //Remove button
   $(document).on('click', '.btn-remove', function() {
      var name = $(this).closest('.wish-item').attr('data-name');
      for (var i = 0; i < wishlist.length; i++) {
        if (wishlist[i].title === name) {
            wishlist.splice(i, 1);
            }    
        }
      $(this).closest('.wish-list-item').remove();
   });

    //============ Handlebars Generation ==============
    var renderProducts = function(){
        for (var i = 0; i < productsData.productsList.length; i++) {
            var newProduct = productCompile(productsData.productsList[i]);
            $('#product-container').append(newProduct);
        }
    };

    var renderWishlist = function(){
        for (var i = 0; i < wishlist.length; i++) {
            var newWish = wishCompile(wishlist[i]);
            $('#wishlist').append(newWish);            
        }
    };

    //=========== Functions called on document ready =============
    
    renderProducts();

});//End document ready