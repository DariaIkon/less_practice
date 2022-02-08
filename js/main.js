(function () {
    'use strict'

    let loader = $('#loader');
    $('#order_form__button').click(function () {
        console.log('тык');
        let name = $('#order_input_name');
        let address = $('#order_input_address');
        let phone = $('#order_input_phone');
        let hasError = false;
        let orderForm = $('#order_form');


        $('.order_input_error').hide().css({ 'position': 'absolute', 'top': '70px' });
        $('.order_form_control').css('border', '1px solid rgb(185, 145, 80)');

        if (!name.val()) {
            name.siblings('.order_input_error').show();
            $(name).css({
                'border': '1px solid red',
            })
            hasError = true;
        } 
        if (!address.val()) {
            address.siblings('.order_input_error').show();
             $(address).css({
                'border': '1px solid red',
            })
            hasError = true;
        } 
        if (!phone.val()) {
            phone.siblings('.order_input_error').show();
            $(phone).css({
                'border': '1px solid red',
            });
            hasError = true;
        }
        if (!hasError) {
            loader.css('display', 'flex');
             $.ajax({
        method: "POST",
        url: 'https://itlogia.ru/test/checkout',
        data: {name: name.val(), address: address.val(), phone: phone.val()}
        })
                 .done(function (msg) {
             loader.hide();
            console.log(msg);
            if (msg.success) {
                orderForm.css('display', 'none');
                orderForm.siblings('#order_form_success ').css('display', 'flex');
            } else {
                alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
            }
        });
        }
    })

    $('.coockie_close').click(function () {
        $('#coockie').hide();
        localStorage.setItem('coockiehide', '1');

    });

    let coockieHide = localStorage.getItem('coockiehide');
    if (!coockieHide) {
        $('#coockie').show();
    };
    $('.products_item_button').click(function (event) {
        let productTitle = $(event.target).siblings('.products_item_title').text().trim();


        let cart = localStorage.getItem('cart');
        let cartArray = [];
        if (cart) {
            cartArray = JSON.parse(cart);
        } 
        cartArray.push(productTitle);
            localStorage.setItem('cart', JSON.stringify(cartArray));
        console.log(localStorage);


    })
        
    
}());