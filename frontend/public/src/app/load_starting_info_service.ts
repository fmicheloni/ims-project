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
        gender: boolean;
    }

    ///////////////////////////////////////////////////////
    //                     INTERFACES                    //
    ///////////////////////////////////////////////////////

    export interface IStartLoadingService {
        loadUserInfo(username: string): void;
        loggedUserInfo: CurrentUser;
        informationLoaded: boolean;

        longitude: number;
        latitude: number;
    }

    ///////////////////////////////////////////////////////
    //                      SERVICE                      //
    ///////////////////////////////////////////////////////

    export class StartLoadingService implements IStartLoadingService {

        longitude: number;
        latitude: number;

        informationLoaded: boolean = false;

        loggedUserInfo: app.startloading.CurrentUser = undefined;

        constructor(public $localStorage, public $http) {
            console.log('Creating StartLoadingService...');

            navigator.geolocation.getCurrentPosition(this.setLocations.bind(this));
        }

        setLocations(position): void {
            this.longitude = position.coords.longitude;
            this.latitude = position.coords.latitude;
        }

        sleep(miliseconds: number): void {
            var currentTime = new Date().getTime();
            while (currentTime + miliseconds >= new Date().getTime()) {
            }
            this.informationLoaded = true;
        }

        loadUserInfo(username: string): void {
            let url = '/api/account/user?username=' + this.$localStorage.username;
            console.log(url);
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
        .service("StartLoadingService", ['$localStorage', '$http', StartLoadingService]);
}
