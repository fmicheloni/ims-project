/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 11/01/16.
 */

module app.excursions {

    'use strict';
    import LoginService = app.loginservice.LoginService;


    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IExcursionService {
        loadExcursion(file, title, description, place, people): void;
    }

    ///////////////////////////////////////////////////////
    //                      SERVICE                      //
    ///////////////////////////////////////////////////////

    export class ExcursionService implements IExcursionService {

        constructor(public Upload, public $localStorage) {

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
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.excursions', ['ngFileUpload'])
        .service("ExcursionService", ['Upload', '$localStorage', ExcursionService]);
}
