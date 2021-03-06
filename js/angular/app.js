angular.module('mainModule', ['slick']);
var app = angular.module('mainModule');


app.controller('MainController', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

    $http({
        url: '../../../src/info_box.json'
    }).then(function successCallback(response) {
        $scope.elements = response.data;

        $timeout(function() {
            console.log('check here');
            $('.info-box').append('<div class="buttons"></div>');
            var buttonsBlock = $('.buttons');
            buttonsBlock.append($('.slick-prev').addClass('slick-arrow').text('Prev'));
            buttonsBlock.append($('.slick-next').addClass('slick-arrow'));

            $('.slick-arrow').on('click', function(e) {
                $(e.currentTarget).parents('.info-box').find('.slick-slide').find('.link-to-order').each(function(index, elem) {
                    $(elem).css({
                        'opacity' : 0
                    });
                    setTimeout(function(){
                        $(elem).removeAttr('style');
                        $('.showed').each(function(index, elem) {
                            $(elem).removeClass('showed')
                        });
                        $('.hide-description').each(function(index, elem) {
                            $(elem).removeClass('showed')
                        });
                        $('.description').each(function(index, elem) {
                            $(elem).removeAttr('style')
                        });
                        $('.note').each(function(index, elem) {
                            $(elem).removeAttr('style')
                        });
                        $('.show-more-link').each(function(index, elem) {
                            $(elem).html($(elem).text() == 'hide more' ? 'show more' : 'show more');
                        })
                    }, 500)
                });
            });



            $('.show-more-link').on('click', function(e) {
                var parentBlock = $(e.currentTarget).parents('.info-box-i'),
                    descriptionHeight = 0,
                    noteHeight = 0;

                $(e.currentTarget).html($(e.currentTarget).text() == 'show more' ? 'hide more' : 'show more'); // Меняем фразу в ссылке в закрытом и открытом состоянии

                /*
                 При нажатии на ссылку "Показать еще" собираем размеры блоков с текстами
                 */
                parentBlock.find('.description').css({
                    'height' : 'auto'
                });
                if ( !parentBlock.is('.showed') ) {
                    descriptionHeight = parentBlock.find('.description')[0].clientHeight;
                    parentBlock.find('.description').removeAttr('style');

                    parentBlock.find('.note').css({
                        'height' : 'auto'
                    });
                    noteHeight = parentBlock.find('.note').height();
                    parentBlock.find('.note').removeAttr('style');

                }
                /*
                 Подставляем полученные размеры и анимируем переход
                 */
                setTimeout(function() {
                    if ( parentBlock.is('.showed') && !parentBlock.is('.hide-description') ) {
                        parentBlock.addClass('hide-description')
                    }

                    if ( !parentBlock.is('.showed') ) {
                        parentBlock.addClass('showed');
                        setTimeout(function () {
                            parentBlock.find('.description').animate({
                                'height': descriptionHeight + 'px'
                            }, 300);
                            parentBlock.find('.info-content').animate({
                                'height': 325 + 'px'
                            }, 380);

                            parentBlock.find('.note').animate({
                                'height': 325 - (parentBlock.find('h2')[0].clientHeight + descriptionHeight + 80) + 'px'
                            }, 380);
                        }, 380);
                    } else if ( parentBlock.is('.hide-description') ) {
                        parentBlock.find('.description').animate({
                            'height': 27 + 'px'
                        }, 300);
                        parentBlock.find('.info-content').animate({
                            'height': 0
                        }, 380);

                        parentBlock.removeClass('hide-description');
                        parentBlock.find('.description').removeAttr('style');
                        parentBlock.find('.info-content').removeAttr('style');
                        parentBlock.find('.note').removeAttr('style');
                        setTimeout(function() {
                            parentBlock.removeClass('showed');
                        }, 600);
                    }
                }, 10);

                e.preventDefault();
            });
        }, 300);
    });

}]);