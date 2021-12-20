
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



/*!
 * Lazy Load - JavaScript plugin for lazy loading images
 *
 * Copyright (c) 2007-2019 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://appelsiini.net/projects/lazyload
 *
 * Version: 2.0.0-rc.2
 *
 */

(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = factory(root);
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.LazyLoad = factory(root);
    }
}) (typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    "use strict";

    if (typeof define === "function" && define.amd){
        root = window;
    }

    const defaults = {
        src: "data-src",
        srcset: "data-srcset",
        selector: ".lazyload",
        root: null,
        rootMargin: "0px",
        threshold: 0
    };

    /**
    * Merge two or more objects. Returns a new object.
    * @private
    * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
    * @param {Object}   objects  The objects to merge together
    * @returns {Object}          Merged values of defaults and options
    */
    const extend = function ()  {

        let extended = {};
        let deep = false;
        let i = 0;
        let length = arguments.length;

        /* Check if a deep merge */
        if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
            deep = arguments[0];
            i++;
        }

        /* Merge the object into the extended object */
        let merge = function (obj) {
            for (let prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    /* If deep merge and property is an object, merge properties */
                    if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        /* Loop through each object and conduct a merge */
        for (; i < length; i++) {
            let obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    function LazyLoad(images, options) {
        this.settings = extend(defaults, options || {});
        this.images = images || document.querySelectorAll(this.settings.selector);
        this.observer = null;
        this.init();
    }

    LazyLoad.prototype = {
        init: function() {

            /* Without observers load everything and bail out early. */
            if (!root.IntersectionObserver) {
                this.loadImages();
                return;
            }

            let self = this;
            let observerConfig = {
                root: this.settings.root,
                rootMargin: this.settings.rootMargin,
                threshold: [this.settings.threshold]
            };

            this.observer = new IntersectionObserver(function(entries) {
                Array.prototype.forEach.call(entries, function (entry) {
                    if (entry.isIntersecting) {
                        self.observer.unobserve(entry.target);
                        let src = entry.target.getAttribute(self.settings.src);
                        let srcset = entry.target.getAttribute(self.settings.srcset);
                        if ("img" === entry.target.tagName.toLowerCase()) {
                            if (src) {
                                entry.target.src = src;
                            }
                            if (srcset) {
                                entry.target.srcset = srcset;
                            }
                        } else {
                            entry.target.style.backgroundImage = "url(" + src + ")";
                        }
                    }
                });
            }, observerConfig);

            Array.prototype.forEach.call(this.images, function (image) {
                self.observer.observe(image);
            });
        },

        loadAndDestroy: function () {
            if (!this.settings) { return; }
            this.loadImages();
            this.destroy();
        },

        loadImages: function () {
            if (!this.settings) { return; }

            let self = this;
            Array.prototype.forEach.call(this.images, function (image) {
                let src = image.getAttribute(self.settings.src);
                let srcset = image.getAttribute(self.settings.srcset);
                if ("img" === image.tagName.toLowerCase()) {
                    if (src) {
                        image.src = src;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                } else {
                    image.style.backgroundImage = "url('" + src + "')";
                }
            });
        },

        destroy: function () {
            if (!this.settings) { return; }
            this.observer.disconnect();
            this.settings = null;
        }
    };

    root.lazyload = function(images, options) {
        return new LazyLoad(images, options);
    };

    if (root.jQuery) {
        const $ = root.jQuery;
        $.fn.lazyload = function (options) {
            options = options || {};
            options.attribute = options.attribute || "data-src";
            new LazyLoad($.makeArray(this), options);
            return this;
        };
    }

    return LazyLoad;
});

