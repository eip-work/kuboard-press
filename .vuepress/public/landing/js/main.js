/*
Copyright (c) 2018
[Custom Script]
Template Name : CRM
Version    : 1.0
Author     :  
Author URI :  
Support    :  
*/

$(function () {

    "use strict";

    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });



    /*-----------------------------------
     * ONE PAGE NAV - SMOOTH SCROLLING
     *-----------------------------------*/

    // Select all links with hashes
    $('.navbar-nav .nav-link')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .on('click', function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 40
                    }, 700, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    /*-----------------------------------
     *Dropdown Multilevel Menu
     *-----------------------------------*/
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

        return false;
    });

    /*-----------------------------------
    /* Venobox Lightbox slider
     *-----------------------------------*/
    $('.venobox').venobox();

    /*-----------------------------------
    /* Slick Slider
     *-----------------------------------*/
    $('.single-item').slick({
        dots: true,
        infinite: false,
        speed: 300,
        autoplay: true
    });

    /*-----------------------------------
    /*AOS Animate
    *-----------------------------------*/
    AOS.init({
        easing: 'ease-out-back',
        duration: 1000
    });
    /*-----------------------------------
     * Twitter Widget
     *-----------------------------------*/
    // window.twttr = (function (d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0],
    //         t = window.twttr || {};
    //     if (d.getElementById(id)) return t;
    //     js = d.createElement(s);
    //     js.id = id;
    //     js.src = "https://platform.twitter.com/widgets.js";
    //     fjs.parentNode.insertBefore(js, fjs);

    //     t._e = [];
    //     t.ready = function (f) {
    //         t._e.push(f);
    //     };

    //     return t;
    // }(document, "script", "twitter-wjs"));


});
