(function () {
    'use strict';

    angular
        .module('app.components')
        .component('news', {
            bindings: {
                article: '=?',
                nameClass: '@?',
                isDescription: '@?',
                isHiddenTitle: '@?'
            },
            templateUrl: 'app/components/news/news.html',
            controller: 'NewsController',
            controllerAs: 'vm'
        });
})();