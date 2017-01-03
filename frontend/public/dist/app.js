/// <reference path="../../../typings/index.d.ts" />
angular.module('imsFrontendApp', [
    'app.home',
    'app.home.nolog',
    'app.home.withlog',
    'app.loginservice',
    'app.startloading',
    'app.home.startpage',
    'ngRoute'
]).config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 27/12/16.
 */
var app;
(function (app) {
    var startloading;
    (function (startloading) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                       MODELS                      //
        ///////////////////////////////////////////////////////
        var CurrentUser = (function () {
            function CurrentUser() {
            }
            return CurrentUser;
        }());
        startloading.CurrentUser = CurrentUser;
        ///////////////////////////////////////////////////////
        //                      SERVICE                      //
        ///////////////////////////////////////////////////////
        var StartLoadingService = (function () {
            function StartLoadingService($http) {
                this.$http = $http;
                this.informationLoaded = false;
                this.loggedUserInfo = undefined;
                console.log('Creating StartLoadingService...');
            }
            StartLoadingService.prototype.sleep = function (miliseconds) {
                var currentTime = new Date().getTime();
                while (currentTime + miliseconds >= new Date().getTime()) {
                }
                this.informationLoaded = true;
            };
            StartLoadingService.prototype.loadUserInfo = function (username) {
                var _this = this;
                var url = '/api/account/user?username=' + username;
                this.$http.get(url).then(function (response) {
                    _this.loggedUserInfo = response.data;
                    _this.sleep(2000);
                }, function (response) {
                    console.log('Error', response);
                });
            };
            return StartLoadingService;
        }());
        startloading.StartLoadingService = StartLoadingService;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.startloading', [])
            .service("StartLoadingService", ['$http', StartLoadingService]);
    })(startloading = app.startloading || (app.startloading = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 27/12/16.
 */
var app;
(function (app) {
    var loginservice;
    (function (loginservice) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                       MODELS                      //
        ///////////////////////////////////////////////////////
        var ResponseToken = (function () {
            function ResponseToken(token) {
                this.token = token;
            }
            return ResponseToken;
        }());
        loginservice.ResponseToken = ResponseToken;
        ///////////////////////////////////////////////////////
        //                      SERVICE                      //
        ///////////////////////////////////////////////////////
        var LoginService = (function () {
            function LoginService($localStorage, $cookies) {
                this.$localStorage = $localStorage;
                this.$cookies = $cookies;
                this.isLogged = false;
                this.loggedUser = undefined;
                console.log('Creating LoginService...');
                this.isLogged = this.checkIfLogged();
            }
            LoginService.prototype.getIsLogged = function () {
                return this.isLogged;
            };
            LoginService.prototype.checkIfLogged = function () {
                var isLoggedLocalStorage = this.$localStorage.isLogged;
                var bearerCookie = this.$cookies.get('Bearer');
                if (bearerCookie == null || isLoggedLocalStorage == null) {
                    console.log("Not logged ");
                    return false;
                }
                if (isLoggedLocalStorage != true) {
                    return false;
                }
                // TODO connect with the real api gateway
                // return this.checkTokenSync(bearerCookie);
                return true;
            };
            LoginService.prototype.checkTokenSync = function (token) {
                if (token == null) {
                    return false;
                }
                var http = new XMLHttpRequest();
                var url = '/api/authentication/validate';
                http.open("POST", url, false);
                http.setRequestHeader('Content-Type', 'application/txt');
                // TODO connect with the real api gateway
                http.send('eyJhbGciOiJIUzUxMiJ9.' +
                    'eyJzdWIiOiJSaWNoYXJkMDEyIiwiY3JlYXRlZCI6MTQ4MTU4NDA5ODE1NywiZXhwIjoxNDg0MTc2MDk4fQ.' +
                    '0-cTOpZXwz7FewssjHpfXbWnr6JDUYX7B1ZbT3OPU6ude3MzA21obWA6VRtfysAwFSwIYXtSDINqDRM1EbTFJw');
                return http.status == 200;
            };
            LoginService.prototype.login = function (user) {
                var stringUser = JSON.stringify(user);
                var http = new XMLHttpRequest();
                var url = 'http://localhost/api/authentication/auth';
                http.open("POST", url, false);
                http.setRequestHeader('Content-Type', 'application/json');
                console.log("Logging in...", stringUser);
                http.send(stringUser);
                if (http.status != 200) {
                    return false;
                }
                var obtainedToken = JSON.parse(http.response);
                this.$cookies.put('Bearer', obtainedToken.token);
                this.isLogged = true;
                this.loggedUser = user.username;
                console.log(user.username);
                return true;
            };
            return LoginService;
        }());
        loginservice.LoginService = LoginService;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.loginservice', ['ngStorage', 'ngCookies'])
            .service("LoginService", ['$localStorage', '$cookies', LoginService]);
    })(loginservice = app.loginservice || (app.loginservice = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 27/12/16.
 */
var app;
(function (app) {
    var home;
    (function (home) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                     CONTROLLER                    //
        ///////////////////////////////////////////////////////
        var HomeCtrl = (function () {
            function HomeCtrl($scope, $cookies, LoginService) {
                this.$scope = $scope;
                this.$cookies = $cookies;
                this.LoginService = LoginService;
            }
            return HomeCtrl;
        }());
        home.HomeCtrl = HomeCtrl;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.home', ['ngRoute', 'ngCookies', 'app.loginservice'])
            .config(function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '../../views/home/home.html',
                controller: HomeCtrl,
                controllerAs: 'homeCtrl'
            });
        });
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 27/12/16.
 */
var app;
(function (app) {
    var home;
    (function (home) {
        var nolog;
        (function (nolog) {
            'use strict';
            ///////////////////////////////////////////////////////
            //                       MODELS                      //
            ///////////////////////////////////////////////////////
            var LoggingUser = (function () {
                function LoggingUser(username, password) {
                    this.username = username;
                    this.password = password;
                }
                return LoggingUser;
            }());
            nolog.LoggingUser = LoggingUser;
            ///////////////////////////////////////////////////////
            //                    CONTROLLERS                    //
            ///////////////////////////////////////////////////////
            var HomeNoLogCtrl = (function () {
                function HomeNoLogCtrl(LoginService, $window) {
                    this.LoginService = LoginService;
                    this.$window = $window;
                    this.usernameLogin = "";
                    this.passwordLogin = "";
                }
                HomeNoLogCtrl.prototype.login = function () {
                    var user = new LoggingUser(this.usernameLogin, this.passwordLogin);
                    console.log(user);
                    var result = this.LoginService.login(user);
                    console.log('Result of login is: ', result);
                    // if(result) {
                    //     this.$window.location.href = '/';
                    // } else {
                    // //    TODO show error message
                    // }
                };
                return HomeNoLogCtrl;
            }());
            nolog.HomeNoLogCtrl = HomeNoLogCtrl;
            ///////////////////////////////////////////////////////
            //                       ANGULAR                     //
            ///////////////////////////////////////////////////////
            angular
                .module('app.home.nolog', ['app.loginservice', 'angularSpinner'])
                .directive('homeNoLogDirective', function () {
                return {
                    templateUrl: '../../views/home/home_no_login.html',
                    controller: HomeNoLogCtrl,
                    controllerAs: 'homeNoLogCtrl'
                };
            });
        })(nolog = home.nolog || (home.nolog = {}));
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 29/12/16.
 */
var app;
(function (app) {
    var home;
    (function (home) {
        var withlog;
        (function (withlog) {
            'use strict';
            ///////////////////////////////////////////////////////
            //                    CONTROLLERS                    //
            ///////////////////////////////////////////////////////
            var HomeWithLogCtrl = (function () {
                function HomeWithLogCtrl(LoginService, StartLoadingService, $window) {
                    this.LoginService = LoginService;
                    this.StartLoadingService = StartLoadingService;
                    this.$window = $window;
                    if (!this.StartLoadingService.informationLoaded) {
                        console.log('Loading user information...');
                        this.StartLoadingService.loadUserInfo(LoginService.loggedUser);
                    }
                }
                return HomeWithLogCtrl;
            }());
            withlog.HomeWithLogCtrl = HomeWithLogCtrl;
            ///////////////////////////////////////////////////////
            //                       ANGULAR                     //
            ///////////////////////////////////////////////////////
            angular
                .module('app.home.withlog', ['app.loginservice', 'app.startloading', 'angularSpinner'])
                .directive('homeWithLogDirective', function () {
                return {
                    templateUrl: '../../views/home/home_with_login.html',
                    controller: HomeWithLogCtrl,
                    controllerAs: 'homeWithLogCtrl'
                };
            });
        })(withlog = home.withlog || (home.withlog = {}));
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 03/01/17.
 */
var app;
(function (app) {
    var home;
    (function (home) {
        var withlog;
        (function (withlog) {
            'use strict';
            ///////////////////////////////////////////////////////
            //                    CONTROLLERS                    //
            ///////////////////////////////////////////////////////
            var StartPageCtrl = (function () {
                function StartPageCtrl(LoginService, StartLoadingService, $window) {
                    this.LoginService = LoginService;
                    this.StartLoadingService = StartLoadingService;
                    this.$window = $window;
                }
                return StartPageCtrl;
            }());
            withlog.StartPageCtrl = StartPageCtrl;
            ///////////////////////////////////////////////////////
            //                       ANGULAR                     //
            ///////////////////////////////////////////////////////
            angular
                .module('app.home.startpage', ['app.loginservice', 'app.startloading', 'angularSpinner'])
                .directive('startPageDirective', function () {
                return {
                    templateUrl: '../../views/startPage/startPage.html',
                    controller: StartPageCtrl,
                    controllerAs: 'startPageCtrl'
                };
            });
        })(withlog = home.withlog || (home.withlog = {}));
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
