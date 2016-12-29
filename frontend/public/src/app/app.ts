/// <reference path="../../../typings/index.d.ts" />

angular.module('imsFrontendApp', [
    'app.demo',
    'app.home',
    'app.home.nolog',
    'app.home.withlog',
    'app.loginservice',
    'ngRoute'
]).config(($locationProvider) => {
    $locationProvider.html5Mode(true);
});