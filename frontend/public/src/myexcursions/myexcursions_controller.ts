/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 10/01/17.
 */

module app.myexcursions {

    'use strict';
    import IStartLoadingService = app.startloading.IStartLoadingService;
    import ILoginService = app.loginservice.ILoginService;
    import IExcursionService = app.excursions.IExcursionService;

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

        addExcursion(): void;

        title: string;
        description: string;
        targetPlace: string;
        targetPeople: string;
        position: string;

        croppedDataUrl: any;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class ExcursionsCtrl implements IExcursionsCtrl {

        title: string = undefined;
        description: string = undefined;
        targetPlace: string = undefined;
        targetPeople: string = undefined;
        position: string = undefined;

        isAddingExcursion: boolean;

        croppedDataUrl: any = undefined;

        constructor(public StartLoadingService: IStartLoadingService,
                    public LoginService: ILoginService,
                    public ExcursionService: IExcursionService) {
            this.isAddingExcursion = false;

            console.log(this.ExcursionService);
        }

        goToAddingPage(): void {
            this.isAddingExcursion = true;
        }

        goBack(): void {
            this.isAddingExcursion = false;
        }

        addExcursion(): void {

            console.log(this.title);

            this.ExcursionService.loadExcursion(this.croppedDataUrl,
                this.title,
                this.description,
                this.targetPlace,
                this.targetPeople);
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.myexcursions', ['app.startloading', 'app.loginservice', 'ngFileUpload', 'ngImgCrop', 'app.excursions'])
        .config(($routeProvider) => {
            $routeProvider.when('/myexcursions', {
                templateUrl: '../../views/myexcursions/myexcursion.html',
                controller: ExcursionsCtrl,
                controllerAs: 'excursionsCtrl'
            })
        });
}
