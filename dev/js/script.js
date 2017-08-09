var sedona = {
    init: function () {
        this.initCache();
        this.initMenu();
        this.initValidation();
    },
    initCache: function () {
        this.$body = $('body');
        this.$iconMenu = $('.js-icon-menu');
        this.$closeMenu = $('.js-close-menu');
        this.$nav = $('.js-nav');

    },

    initMenu: function(){
        var _this = this;
        this.$iconMenu.click(function(){
            _this.$nav.slideDown().addClass('_active');        
        })

        this.$closeMenu.click(function(){
            _this.$nav.slideUp().removeClass('_active');    
        })
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
    }
};

$(document).ready(function () {
    sedona.init();
});
