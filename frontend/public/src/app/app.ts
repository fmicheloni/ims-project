/// <reference path="../../../typings/index.d.ts" />

angular.module('imsFrontendApp', [
    'app.home',
    'app.home.nolog',
    'app.home.withlog',
    'app.loginservice',
    'app.startloading',
    'app.home.startpage',
    'app.navbar',
    'ngRoute'
]).config(($locationProvider) => {
    // $locationProvider.html5Mode(true);
});