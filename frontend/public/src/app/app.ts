/// <reference path="../../../typings/index.d.ts" />

angular.module('imsFrontendApp', [
    'app.demo',
    // 'app.templates',
    'app.home',
    'app.home.nolog',
    'ngRoute'
]).config(($locationProvider) => {
    $locationProvider.html5Mode(true);
});