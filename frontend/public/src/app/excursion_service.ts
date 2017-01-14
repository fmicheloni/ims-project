/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 11/01/16.
 */

module app.excursions {

    'use strict';
    import LoginService = app.loginservice.LoginService;


    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////

    export class Excursion {
        id: number;
        image: string;
        insertionDate: Date;
        likes: number;
        longDescription: string;
        peopleTarget: string;
        placeTarget: string;
        title: string;
        username: string;
    }

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IExcursionService {
        loadExcursion(file, title, description, place, people): void;

        getMyExcursions(): void;

        myExcursions: Array<Excursion>;

        // cache the excursions in the local service
        areMyExcursionsAlreadyLoaded: boolean;
    }

    ///////////////////////////////////////////////////////
    //                      SERVICE                      //
    ///////////////////////////////////////////////////////

    export class ExcursionService implements IExcursionService {

        myExcursions: Array<app.excursions.Excursion> = [];
        areMyExcursionsAlreadyLoaded: boolean = false;

        constructor(public Upload, public $localStorage, public $http) {
            this.getMyExcursions();
        }

        loadExcursion(fileIn, titleIn, descriptionIn, placeIn, peopleIn): void {
            this.Upload.upload({
                url: '/api/excursion/add',
                method: 'POST',
                file: this.Upload.dataUrltoBlob(fileIn, "image"),
                fields: {
                    'title': titleIn,
                    'description': descriptionIn,
                    'place': placeIn,
                    'people': peopleIn,
                    'username': this.$localStorage.username
                }
            }).then((response) => {
                console.log(response.data);
            });
        }

        getMyExcursions(): void {
            if(!this.areMyExcursionsAlreadyLoaded) {
                let url = '/api/excursion/myexcursions?username=' + this.$localStorage.username;
                console.log(url);
                this.$http.get(url).then((response) => {
                    let myExcursions: Array<app.excursions.Excursion> = response.data;
                    for(let excursion of myExcursions) {
                        this.myExcursions.push(excursion);
                    }
                    this.areMyExcursionsAlreadyLoaded = true;
                }, function (response) {
                    console.log('Error', response);
                });
            }
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.excursions', ['ngFileUpload'])
        .service("ExcursionService", ['Upload', '$localStorage', '$http', ExcursionService]);
}
