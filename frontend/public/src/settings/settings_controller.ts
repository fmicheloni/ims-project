/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 07/01/17.
 */

module app.settingsctrl {

    'use strict';
    import ISettingsService = app.settings.ISettingsService;

    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface ISettingsCtrl {
        changeLanguage(): void;
        language: string;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class SettingsCtrl implements ISettingsCtrl {
        language: string;

        constructor(public SettingsService: ISettingsService) {
        }

        changeLanguage(): void {
            this.SettingsService.changeLanguage(this.language);
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.settingsctrl', ['app.settings'])
        .config(($routeProvider) => {
            $routeProvider.when('/settings', {
                templateUrl: '../../views/settings/settings.html',
                controller: SettingsCtrl,
                controllerAs: 'settingsCtrl'
            })
        });
}
