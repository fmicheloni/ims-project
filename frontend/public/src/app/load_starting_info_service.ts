/// <reference path="../../../typings/index.d.ts" />

/**
 * Created by fabriziomicheloni on 27/12/16.
 */

module app.startloading {

    'use strict';
    import LoginService = app.loginservice.LoginService;
    ///////////////////////////////////////////////////////
    //                       MODELS                      //
    ///////////////////////////////////////////////////////

    export class CurrentUser {
        username: string;
        name: string;
        surname: string;
        dateOfBirth: Date;
        country: string;
        city: string;
        picture: string;
    }

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IStartLoadingService {
        loadUserInfo(username: string): void;
        loggedUserInfo: CurrentUser;
        informationLoaded: boolean;
    }

    ///////////////////////////////////////////////////////
    //                      SERVICE                      //
    ///////////////////////////////////////////////////////

    export class StartLoadingService implements IStartLoadingService {

        informationLoaded: boolean = false;

        loggedUserInfo: app.startloading.CurrentUser = undefined;

        constructor(public $http) {
            console.log('Creating StartLoadingService...');
        }

        sleep(miliseconds: number): void {
            var currentTime = new Date().getTime();
            while (currentTime + miliseconds >= new Date().getTime()) {
            }
            this.informationLoaded = true;
        }

        loadUserInfo(username: string): void {
            let url = '/api/account/user?username=' + username;
            this.$http.get(url).then((response) => {
                this.loggedUserInfo = response.data;
                this.sleep(2000);
            }, function (response) {
                console.log('Error', response);
            });
        }
    }

    ///////////////////////////////////////////////////////
    //                       ANGULAR                     //
    ///////////////////////////////////////////////////////

    angular
        .module('app.startloading', [])
        .service("StartLoadingService", ['$http', StartLoadingService]);
}
