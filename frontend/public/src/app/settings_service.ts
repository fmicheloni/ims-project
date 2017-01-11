/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 10/01/16.
 */

module app.settings {

    'use strict';
    import LoggingUser = app.home.nolog.LoggingUser;

    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////

    // export class ResponseToken {
    //     token: string;
    //
    //     constructor(token: string) {
    //         this.token = token;
    //     }
    // }

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface ISettingsService {
        changeLanguage(lang: string): void;
    }

    ///////////////////////////////////////////////////////
    //                      SERVICE                      //
    ///////////////////////////////////////////////////////

    export class SettingsService implements ISettingsService {

        constructor(public $localStorage, public $cookies, public $window, public $translate) {
            let language = this.$localStorage.language;

            if (language == undefined) {
                this.changeLanguage("English");
            } else {
                this.$translate.use(language);
            }
        }

        changeLanguage(lang: string): void {
            this.$translate.use(lang);
            this.$localStorage.language = lang;
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.settings', ['ngStorage', 'ngCookies', 'pascalprecht.translate'])
        .service("SettingsService", ['$localStorage', '$cookies', '$window', '$translate', SettingsService]);
}
