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
