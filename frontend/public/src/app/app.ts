/// <reference path="../../../typings/index.d.ts" />

angular.module('imsFrontendApp', [
    'app.home',
    'app.home.nolog',
    'app.home.withlog',
    'app.loginservice',
    'app.startloading',
    'app.home.startpage',
    'app.navbar',
    'app.search',
    'app.account',
    'app.myexcursions',
    'app.settings',
    'app.settingsctrl',
    'app.excursions',
    'ngRoute',
    'pascalprecht.translate',
    'ngSanitize'
]).config(($translateProvider, $locationProvider) => {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.translations('English', {
        // settings page
        'LANGUAGE_TITLE': 'Language',
        'SETTINGS': 'Settings',

        // navbar
        'HOME_NAV': 'Home',
        'SEARCH_NAV': 'Search',
        'ACCOUNT_NAV': 'Account',
        'SETTINGS_NAV': 'Settings',
        'LOGOUT_NAV': 'Logout',
        'LOGGED_AS_NAV': 'Logged as'
    });
    $translateProvider.translations('Italiano', {
        // settings page
        'LANGUAGE_TITLE': 'Lingua',
        'SETTINGS': 'Impostazioni',

        // navbar
        'HOME_NAV': 'Home',
        'SEARCH_NAV': 'Cerca',
        'ACCOUNT_NAV': 'Profilo',
        'SETTINGS_NAV': 'Impostazioni',
        'LOGOUT_NAV': 'Logout',
        'LOGGED_AS_NAV': 'Loggato come'
    });
    $translateProvider.preferredLanguage('English');

    $locationProvider.html5Mode(false).hashPrefix('');
});