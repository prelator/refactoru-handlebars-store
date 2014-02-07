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

var wishlist = []; 

//Document ready
$(document).ready(function(){
    
    //============ Click handlers ==============
    
   $(document).on('click', '#add-item', function() {
        $(document).find('.wish-list-item').remove();
        var name = $(this).closest('.product').data('name');
        var price = $(this).closest('.product').data('price');
        var isDup = false;
        var newItem = {
            title: name,
            price: price,
            included: true
            }; 
        for (var i = 0; i < wishlist.length; i++) {
            if (wishlist[i].title === name) {
                isDup = true;
                wishlist[i].included = true;
            }
        }
        if (!isDup) {
        wishlist.push(newItem);
        }
        renderWishlist();
    });

   $(document).on('click', '.btn-remove', function() {
      var name = $(this).closest('.wish-item').data('name');
      for (var i = 0; i < wishlist.length; i++) {
        if (wishlist[i].title === name) {
            wishlist[i].included = false;
            }    
        }
      $(this).closest('.wish-list-item').remove();
      getIncluded();
      console.dir(listIncluded);
   });

    //============ Handlebars Generation ==============
    var renderProducts = function(){
        var productTemplate = $('#product-template').html();
        var productCompile = Handlebars.compile(productTemplate);
        for (var i = 0; i < productsData.productsList.length; i++) {
            var newProduct = productCompile(productsData.productsList[i]);
            $('#product-container').append(newProduct);
        }
    };

    var renderWishlist = function(){
        var wishTemplate = $('#wish-template').html();
        var wishCompile = Handlebars.compile(wishTemplate);
        getIncluded();
        console.dir(listIncluded);
        for (var i = 0; i < listIncluded.length; i++) {
            var newWish = wishCompile(listIncluded[i]);
            $('#wishlist').append(newWish);            
        }
    };

    var getIncluded = function(){
        listIncluded = wishlist.filter(function(item){
            return item.included;
            });
    };

    //=========== Functions called on document ready =============
    
    renderProducts();

});//End document ready