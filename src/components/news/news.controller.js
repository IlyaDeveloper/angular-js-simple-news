(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('NewsController', NewsController);

    NewsController.$inject = [];
    /* @ngInject */
    function NewsController() {
        var vm = this;

        activate();

        ////

        function activate() {
        }
    }
})();
