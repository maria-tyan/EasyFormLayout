var vodichka = {
    init: function () {
        this.initCache();
        this.initEvents();
        this.initMethods();
        this.initMenu();
        this.initValidation();
        this.initSlider();
    },
    initCache: function () {
        this.$body = $('body');
        this.$BodyHtml = $('body,html');
        this.$overlay = $('.js-overlay');
        this.$popupform = $('.js-popup-form');
        this.$thn = $('.js-popup-thanks');
        this.$close = $('.js-close');
        this.$order = $('.js-order');
        this.$popupClose = $('.js-popup-close');
        this.$commonslider = $('.js-slider');
        this.$slideblock = $('.js-slide-block');
        this.$slidetext = $('.js-slide-text');
        this.$slidetitlet = $('.js-slide-title');
        this.$reviewsslider = $('.js-reviews');
        this.$methods = $('.js-methods');
        this.$methodsStep = $('.js-methods-step');
        this.$wave = $('.js-wave');
        this.$waveContent = $('.js-wave-content');
        this.$finaleStep = $('.js-finale-step');
        this.$staff =$('.js-staff');
        this.$staffImg =$('.js-staff-img');
        this.$popupTable =$('.js-popup-table');
        this.$orderTable =$('.js-order-table');
        this.$popupVideo =$('.js-popup-video');
        this.$orderVideo =$('.js-order-video');
        this.$menuMarker =$('.js-menu-marker');
        this.$navItem = $('.js-nav-item');
        this.$nav = $('.js-nav');
    },
    initSlider: function () {
        if (this.$commonslider.length != 0) {
            this.$commonslider.slick({
                dots: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                appendArrows: '.slider-nav',
                fade: true
            });
        }

        if (this.$reviewsslider.length != 0) {
            this.$reviewsslider.slick({
                dots: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                appendArrows: '.reviews-nav'
            });
        }

        if (this.$methods.length != 0) {
            this.$methods.slick({
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                // autoplay: true,
                autoplaySpeed: 5000,
                fade: true
            });
        }
        var top = this.$methods.offset().top - 650;
        var start = false;
            
        if (!start) {
            $(window).scroll(function () {
                if( (top <=  $(window).scrollTop())){
                    start = true;
                    vodichka.$methods.slick('slickPlay');
                }
            });
        }
    },

    initMenu: function(){
        var _this = this;
        this.$menuMarker.click(function(){
            if($(window).width() < 1200){
                if(!$(this).hasClass('_active')){
                    $(this).addClass('_active');
                    $(this).next().slideDown();
                }
                else{
                    $(this).removeClass('_active');
                    $(this).next().slideUp();
                }
            }
        })

        this.$navItem.click(function () {
            var object = $(this.getAttribute('data-object')).offset().top;
            if (_this.$menuMarker.hasClass('_active')) {
                _this.$menuMarker.click();
            }
            _this.$BodyHtml.stop().animate({'scrollTop': object - 100}, 600);
        })
    },

    initMethods: function() {
        var flagN = false;
        this.$methods.on('beforeChange', function(event, slick, currentSlide, nextSlide){

            var active = $(this).find('._active');
            var color = active.next().data('color');
            var num = active.index() + 2;
            

            if(flagN) {
                var num = active.index() + 1;
            }

            switch (num) {
                case 4:
                    vodichka.$staff.fadeOut(300);
                    vodichka.$finaleStep.css('opacity', 1);
                    active.removeClass('_active');
                    vodichka.$methodsStep.eq(0).addClass('_active');
                    flagN = true;

                case 3:
                    vodichka.$staff.eq(0).fadeOut(300);
                    vodichka.$staff.eq(5).fadeOut(800);
                    vodichka.$staff.eq(1).fadeOut(500);
                case 2:
                    active.removeClass('_active');
                    vodichka.$wave.css('background-color', color);
                    vodichka.$waveContent.css('color', color);
                    vodichka.$waveContent.attr('data-num', num);
                    active.next().addClass('_active');
                    vodichka.$staffImg.fadeOut(1000);
                    
                    break;
                case 1:
                    vodichka.$finaleStep.css('opacity', 0);
                    vodichka.$staff.fadeIn(300);
                    vodichka.$staffImg.fadeIn(600);
                    active.removeClass('_active');
                    vodichka.$wave.css('background-color', color);
                    vodichka.$waveContent.css('color', color);
                    vodichka.$waveContent.attr('data-num', num);
                    active.next().addClass('_active');
                    
                default:
                    break;
            }
        });
    },

    initValidation: function () {
        $('form').each(function () {
            $(this).validate({
                errorPlacement: function (error, element) {

                },
                submitHandler: function (form) {
                    var object = $(form);
                    send(object);
                }
            });
        });
        /*----------------------form send-------------------*/

        $.validator.addMethod(
                'regexp',
                function (value, element, regexp) {
                    var re = new RegExp(regexp);
                    return this.optional(element) || re.test(value);
                },
                "Please check your input."
                );
        $.validator.addClassRules({
            userphone: {
                required: true
            },
            usermail: {
                email: true,
                required: true
            },
            username: {
                required: true
            },
            required: {
                required: true
            }
        });
        function send(object) {
            var fieldArr = [], newFieldArr = {}, special = [];
            fieldArr = object.find(':input,textarea,select').not('input[type="hidden"]').serializeArray();
            special = object.find('input[type="hidden"]').serializeArray();
            for (var c = 0; c < fieldArr.length; c++) {
                var title = object.find('input[name="' + fieldArr[c].name + '"],select[name="' + fieldArr[c].name + '"],textarea[name="' + fieldArr[c].name + '"]').attr('data-title');
                fieldArr[c]['title'] = title;
                temp = {};
                temp.title = fieldArr[c].title;
                temp.value = fieldArr[c].value;
                var name = fieldArr[c].name;
                if (fieldArr[c].value.length > 0) {
                    newFieldArr[name] = temp;
                }
            }

            var data = {
                formData: newFieldArr
            };
            for (var c = 0; c < special.length; c++) {
                data[special[c].name] = special[c].value;
            }
            $.ajax({
                type: "POST",
                url: 'form-handler.php',
                dataType: 'json',
                data: data
            }).done(function () {
                vodichka.$popupform.closePopUp();
                vodichka.$thn.openPopUp();
                object.trigger( 'reset' );

                setTimeout(function () {
                    vodichka.$thn.closePopUp();
                }, 3000)
            })
        }
    },
    initEvents: function () {
        var _this = this;
        this.$order.click(function () {
            _this.$popupform.openPopUp();
        });

        this.$orderTable.click(function () {
            _this.$popupTable.openPopUp();
        });

        this.$orderVideo.click(function () {
            _this.$popupVideo.openPopUp();
        });

        this.$close.click(function () {
            _this.$popupform.closePopUp();
            _this.$popupTable.closePopUp();
            _this.$popupVideo.closePopUp();
            _this.$thn.closePopUp();
        });

    },
};

$.fn.closePopUp = function () {
    this.fadeOut(600);
    vodichka.$overlay.fadeOut(600);
};
$.fn.openPopUp = function () {
    this.fadeIn(600);
    vodichka.$overlay.fadeIn(600);
    vodichka.$body.attr('style', '');
};

$(document).ready(function () {
    vodichka.init();
    $(window).resize(function () {
    });
    $(window).scroll(function () {
        
    });
    $('.userphone').mask("+7(999)999-99-99", {placeholder: '_'});
});
