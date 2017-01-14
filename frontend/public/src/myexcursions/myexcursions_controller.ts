/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 10/01/17.
 */

module app.myexcursions {

    'use strict';
    import IStartLoadingService = app.startloading.IStartLoadingService;
    import ILoginService = app.loginservice.ILoginService;
    import IExcursionService = app.excursions.IExcursionService;
    import Excursion = app.excursions.Excursion;

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

        myExcursions: Array<Excursion>;

        showProductInfo(excursion: Excursion): void;

        isDisplayingExcursion: boolean;
        displayedExcursion: Excursion;
        goBackFromExcursion(): void;
    }

    ///////////////////////////////////////////////////////
    //                    CONTROLLERS                    //
    ///////////////////////////////////////////////////////

    export class ExcursionsCtrl implements IExcursionsCtrl {
        displayedExcursion: app.excursions.Excursion = undefined;
        isDisplayingExcursion: boolean = false;

        myExcursions: Array<Excursion> = [];

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

            this.myExcursions = this.ExcursionService.myExcursions;
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

        showProductInfo(excursion: app.excursions.Excursion): void {
            this.isDisplayingExcursion = true;
            this.displayedExcursion = excursion;
        }

        goBackFromExcursion(): void {
            this.isDisplayingExcursion = false;
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
