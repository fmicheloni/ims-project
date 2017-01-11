/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 10/01/17.
 */

module app.myexcursions {

    'use strict';
    import IStartLoadingService = app.startloading.IStartLoadingService;
    import ILoginService = app.loginservice.ILoginService;

    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IExcursionsCtrl {
        isAddingExcursion: boolean;

        goToAddingPage(): void;
        goBack(): void;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class ExcursionsCtrl implements IExcursionsCtrl {

        isAddingExcursion: boolean;

        constructor(public StartLoadingService: IStartLoadingService,
                    public LoginService: ILoginService) {
            this.isAddingExcursion = false;
        }

        goToAddingPage(): void {
            this.isAddingExcursion = true;
        }

        goBack(): void {
            this.isAddingExcursion = false;
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.myexcursions', ['app.startloading', 'app.loginservice'])
        .config(($routeProvider) => {
            $routeProvider.when('/myexcursions', {
                templateUrl: '../../views/myexcursions/myexcursion.html',
                controller: ExcursionsCtrl,
                controllerAs: 'excursionsCtrl'
            })
        });
}
