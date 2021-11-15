
// Latest Way
function recaptchaCallbackIndex() {
    $.ajax({
        url: "./libs/checkCaptcha.php",
        type: "POST",
        async: false,
        data: {
            // captcha: grecaptcha.getResponse()
            captcha: grecaptcha.getResponse(html_element_index_id)
        },
        success: function(resp) {
            if (resp === "true") {
                $('#crcIndex').removeClass('cstm-red-brdr');
                $('#grErrorMsg').hide();
                $('#indexForm').val(1);
            } else {
                console.log("else11");
                grecaptcha.reset(html_element_index_id);
                $('#crcIndex').addClass('cstm-red-brdr');
                $('#grErrorMsg').show();
                $('#indexForm').val(0);
            }
        }
    });
}

function recaptchaExpiredIndex() {
    $('#indexForm').val(0);
}

function recaptchaCallbackPopup() {
    $.ajax({
        url: "./libs/checkCaptcha.php",
        type: "POST",
        async: false,
        data: {
            captcha: grecaptcha.getResponse(html_element_popup_id)
        },
        success: function(resp) {
            if (resp === "true") {
                $('#crcPopup').removeClass('cstm-red-brdr');
                $('#grErrorMsgPopup').hide();
                $('#popupForm').val(1);
            } else {
                console.log("else22");
                grecaptcha.reset(html_element_popup_id);
                $('#crcPopup').addClass('cstm-red-brdr');
                $('#grErrorMsgPopup').show();
                $('#popupForm').val(0);
            }
        }
    });
}

function recaptchaExpiredPopup() {
    $('#popupForm').val(0);
}

// Latest Way Ends


        $.getScript("js/recaptchaConfiguration.js", function() {});

        $.getScript("https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit", function() {});

        var html_element_popup_id, html_element_index_id, onloadCallback;

        
        // $(document).ready(function() {

            $('body').append("<div id='modalContent'></div>");
            $('body').append("<div id='html_element_popup'></div>");
            // $("#modalContent").load("modal-form.html", function(){
            // });

                onloadCallback = function() {
                    html_element_popup_id = grecaptcha.render('html_element_popup', {
                        'sitekey' : '6Ldvx24aAAAAAFyJHAafuwuTQTkJer02u-TEGj8m',
                        'callback' : recaptchaCallbackPopup,
                        'expired-callback' : recaptchaExpiredPopup
                    });
                    if($('#html_element_index').length) {
                        console.log("Hereeeehtml_element_index");
                        html_element_index_id = grecaptcha.render('html_element_index', {
                            'sitekey' : '6Ldvx24aAAAAAFyJHAafuwuTQTkJer02u-TEGj8m',
                            'callback' : recaptchaCallbackIndex,
                            'expired-callback' : recaptchaExpiredIndex
                        });
                    }
                };
                window.onloadCallback = onloadCallback

                $.getScript("https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit", function() {});
                // $.getScript("js/recaptchaConfiguration.js", function() {});
                $.getScript("js/moment-with-locales.min.js", function() {
                    $.getScript("js/bootstrap-datetimepicker.min.js", function() {
                        $('#form_datetime').datetimepicker({
                            // defaultDate: new Date(),
                            minDate: new Date(),
                            ignoreReadonly: true,
                            stepping: 30,
                            enabledHours: [15, 16, 17, 18, 19, 20],
                            // inline: true,
                            icons: {
                                time: 'cstm-sel cstm-sel-time',
                                date: 'cstm-sel cstm-sel-date'
                            },
                            // "setDate": new Date(),
                        });
                    });

                });

    

// window.location.href = window.location.origin + '/#modal-popup2';


