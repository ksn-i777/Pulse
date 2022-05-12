$(document).ready(function(){
    
    //slider

    $('.slider__box').slick({
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/slider_arrow_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/slider_arrow_right.png"></button>',
    });

    //catalog

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.conteiner').find('div.catalog__box').removeClass('catalog__box_active').eq($(this).index()).addClass('catalog__box_active');
    });

    $('.catalog__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog__grafbox').eq(i).toggleClass('catalog__grafbox_active')
            $('.catalog__textbox').eq(i).toggleClass('catalog__textbox_active')
        })
    });

    $('.catalog__link_back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog__grafbox').eq(i).toggleClass('catalog__grafbox_active')
            $('.catalog__textbox').eq(i).toggleClass('catalog__textbox_active')
        })
    });

    //modal
    
    $('.button_call').on('click', function() {
        $('.overlay, #call').fadeIn('0.3s');
    });

    $('.button_main').on('click', function() {
        $('.overlay, #consultation').fadeIn('0.3s');
    });

    $('.button_catalog').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('0.3s');
        })
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #call, #consultation, #order, #thanks').fadeOut('0.3s');
    });

    //mask of phone number
    
    $('input[name=phone]').mask("+375 (99) 999-99-99");

    //отображение стрелки скролла страницы

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    //подключение wow.js
    
    new WOW().init();

    //скрипт для локального сервера и проверки отправки данных на почту

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#call, #consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('0.3s');
            $('form').trigger('reset');
        });
        return false;
    });

  });