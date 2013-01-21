/*
 *  jQuery ezRandomImageRotator 1.0.0
 *  Demo's and documentation:
 *  https://github.com/mwitek/jQuery-ezRandomImageRotator
 *
 *  Author: Matthew Witek
 *  www.mwitekdesign.com
 *
 *  Dual licensed under the MIT and GPL licenses. Use as you wish!
 *  http://en.wikipedia.org/wiki/MIT_License
 *  http://en.wikipedia.org/wiki/GNU_General_Public_License
 */ 
 
 (function ($) {
    $.fn.extend({

        ezRandomImageRotator: function (userOptions) {
            var base = this;
            var baseSelector = $(base).selector;

            var defaultOptions = {
                wrapperClass: 'random_rotator_image',
                imagePathsArray: [],
                speed: 2000
            };

            var o = $.extend(defaultOptions, userOptions);
            var allImageSelectors = [];
            var allImagesToRotate = o.imagePathsArray;
            var allImagesToRotateCopy = allImagesToRotate.slice();

            base.imageArrayBuilder = function () {
                allImageSelectors = [];
                base.each(function () {
                    allImageSelectors.push(this);
                });
                allImagesToRotateCopy = allImagesToRotate.slice();
                return [allImageSelectors];
            };

            base.appendImageCache = function () {
                $('body').append('<div id="image_cache" />');
                var imageCache = $('#image_cache');
                imageCache.css('display', 'none');
                for (i = 0; i < o.imagePathsArray.length; i++) {
                    imageCache.append('<img src=' + o.imagePathsArray[i] + ' />');
                }
            };

            base.wrapImageTags = function () {
                base.each(function (index, value) {
                    var $image = $(value);
                    var randomValue = Math.floor(Math.random() * allImagesToRotateCopy.length);
                    $image.wrap('<div class="' + baseSelector.replace(/\./g, '') + '_' + (index + 1) + ' ' + o.wrapperClass + '" />');
                    $image.attr('src', allImagesToRotateCopy[randomValue]);
                    allImagesToRotateCopy.splice(randomValue, 1);
                });
            };

            base.randomImageChange = function () {
                var random = Math.floor(Math.random() * allImageSelectors.length),
                    $logo = $(allImageSelectors[random]),
                    originalOpacity = $logo.css('opacity');
                var logoFound = false;

                function replaceImage() {
                    var randomImage = allImagesToRotate[Math.floor(Math.random() * allImagesToRotate.length)];
                    logoFound = false;
                    base.each(function (value, index) {
                        if ($(this).attr('src') == randomImage) {
                            logoFound = true;
                        }
                    });
                    if (!logoFound) {
                        $logo.parent().animate({
                            opacity: 0.0
                        }, 500, function () {
                            $(this).children('img').attr('src', randomImage);
                            $(this).animate({
                                opacity: originalOpacity
                            }, 500, function () {
                                if ($(this).css('opacity') != 1) {
                                    $(this).css('opacity', 1);
                                }
                            });
                        });
                    } else {
                        replaceImage();
                    }
                }
                replaceImage();
            };

            base.setRotation = function () {
                window.setInterval(function () {
                    base.randomImageChange();
                }, o.speed);
            };

            base.imageArrayBuilder();
            base.appendImageCache();
            base.wrapImageTags();
            base.setRotation();

        }
    });
})(jQuery);
