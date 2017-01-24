/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 27/12/16.
 */
var app;
(function (app) {
    var account;
    (function (account) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                     CONTROLLER                    //
        ///////////////////////////////////////////////////////
        var AccountCtrl = (function () {
            function AccountCtrl($scope, LoginService, StartLoadingService) {
                this.$scope = $scope;
                this.LoginService = LoginService;
                this.StartLoadingService = StartLoadingService;
                this.loggedUser = undefined;
                this.loggedUser = this.StartLoadingService.loggedUserInfo;
                if (!this.StartLoadingService.informationLoaded) {
                    this.loadingImage = 'dist/images/s3X06zT.jpg';
                    console.log('Loading user information...');
                    this.StartLoadingService.loadUserInfo(LoginService.loggedUser);
                }
            }
            return AccountCtrl;
        }());
        account.AccountCtrl = AccountCtrl;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.account', ['ngRoute', 'app.loginservice', 'app.startloading'])
            .config(function ($routeProvider) {
            $routeProvider.when('/account', {
                templateUrl: '../../views/account/account.html',
                controller: AccountCtrl,
                controllerAs: 'accountCtrl'
            });
        });
    })(account = app.account || (app.account = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
angular.module('imsFrontendApp', [
    'app.home',
    'app.home.nolog',
    'app.home.withlog',
    'app.loginservice',
    'app.startloading',
    'app.home.startpage',
    'app.navbar',
    'app.search',
    'app.account',
    'app.myexcursions',
    'app.settings',
    'app.settingsctrl',
    'app.excursions',
    'ngRoute',
    'pascalprecht.translate',
    'ngSanitize'
]).config(function ($translateProvider, $locationProvider) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.translations('English', {
        // settings page
        'LANGUAGE_TITLE': 'Language',
        'SETTINGS': 'Settings',
        // navbar
        'HOME_NAV': 'Home',
        'SEARCH_NAV': 'Search',
        'ACCOUNT_NAV': 'Account',
        'SETTINGS_NAV': 'Settings',
        'LOGOUT_NAV': 'Logout',
        'LOGGED_AS_NAV': 'Logged as'
    });
    $translateProvider.translations('Italiano', {
        // settings page
        'LANGUAGE_TITLE': 'Lingua',
        'SETTINGS': 'Impostazioni',
        // navbar
        'HOME_NAV': 'Home',
        'SEARCH_NAV': 'Cerca',
        'ACCOUNT_NAV': 'Profilo',
        'SETTINGS_NAV': 'Impostazioni',
        'LOGOUT_NAV': 'Logout',
        'LOGGED_AS_NAV': 'Loggato come'
    });
    $translateProvider.preferredLanguage('English');
    $locationProvider.html5Mode(false).hashPrefix('');
});
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 11/01/16.
 */
var app;
(function (app) {
    var excursions;
    (function (excursions_1) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                       MODELS                      //
        ///////////////////////////////////////////////////////
        var Excursion = (function () {
            function Excursion() {
            }
            return Excursion;
        }());
        excursions_1.Excursion = Excursion;
        ///////////////////////////////////////////////////////
        //                      SERVICE                      //
        ///////////////////////////////////////////////////////
        var ExcursionService = (function () {
            function ExcursionService(Upload, $localStorage, $http) {
                this.Upload = Upload;
                this.$localStorage = $localStorage;
                this.$http = $http;
                this.myExcursions = [];
                this.areMyExcursionsAlreadyLoaded = false;
                this.getMyExcursions();
            }
            ExcursionService.prototype.loadExcursion = function (fileIn, titleIn, descriptionIn, placeIn, peopleIn) {
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
                }).then(function (response) {
                    console.log(response.data);
                });
            };
            ExcursionService.prototype.getMyExcursions = function () {
                var _this = this;
                if (!this.areMyExcursionsAlreadyLoaded) {
                    var url = '/api/excursion/myexcursions?username=' + this.$localStorage.username;
                    console.log(url);
                    this.$http.get(url).then(function (response) {
                        var myExcursions = response.data;
                        for (var _i = 0, myExcursions_1 = myExcursions; _i < myExcursions_1.length; _i++) {
                            var excursion = myExcursions_1[_i];
                            _this.myExcursions.push(excursion);
                        }
                        _this.areMyExcursionsAlreadyLoaded = true;
                    }, function (response) {
                        console.log('Error', response);
                    });
                }
            };
            ExcursionService.prototype.searchExcursions = function (args) {
                var url = '/api/excursion/search?title=' + args;
                console.log(url);
                var http = new XMLHttpRequest();
                http.open("GET", url, false);
                http.setRequestHeader('Content-Type', 'application/txt');
                http.send();
                var excursions = JSON.parse(http.response);
                return excursions;
            };
            return ExcursionService;
        }());
        excursions_1.ExcursionService = ExcursionService;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.excursions', ['ngFileUpload'])
            .service("ExcursionService", ['Upload', '$localStorage', '$http', ExcursionService]);
    })(excursions = app.excursions || (app.excursions = {}));
})(app || (app = {}));
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
            function StartLoadingService($localStorage, $http) {
                this.$localStorage = $localStorage;
                this.$http = $http;
                this.informationLoaded = false;
                this.loggedUserInfo = undefined;
                console.log('Creating StartLoadingService...');
                navigator.geolocation.getCurrentPosition(this.setLocations.bind(this));
            }
            StartLoadingService.prototype.setLocations = function (position) {
                this.longitude = position.coords.longitude;
                this.latitude = position.coords.latitude;
            };
            StartLoadingService.prototype.sleep = function (miliseconds) {
                var currentTime = new Date().getTime();
                while (currentTime + miliseconds >= new Date().getTime()) {
                }
                this.informationLoaded = true;
            };
            StartLoadingService.prototype.loadUserInfo = function (username) {
                var _this = this;
                var url = '/api/account/user?username=' + this.$localStorage.username;
                console.log(url);
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
            .service("StartLoadingService", ['$localStorage', '$http', StartLoadingService]);
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
            function LoginService($localStorage, $cookies, $window) {
                this.$localStorage = $localStorage;
                this.$cookies = $cookies;
                this.$window = $window;
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
                var username = this.$localStorage.username;
                var bearerCookie = this.$cookies.get('Bearer');
                if (bearerCookie == null || isLoggedLocalStorage == null || username == null) {
                    console.log("Not logged ");
                    return false;
                }
                if (isLoggedLocalStorage != true) {
                    return false;
                }
                return this.checkTokenSync(bearerCookie);
            };
            LoginService.prototype.checkTokenSync = function (token) {
                if (token == null) {
                    return false;
                }
                var http = new XMLHttpRequest();
                var url = '/api/authentication/validate';
                http.open("POST", url, false);
                http.setRequestHeader('Content-Type', 'application/txt');
                http.send(this.$cookies.get('Bearer'));
                return http.status == 200;
            };
            LoginService.prototype.login = function (user) {
                var stringUser = JSON.stringify(user);
                var http = new XMLHttpRequest();
                var url = '/api/authentication/auth';
                http.open("POST", url, false);
                http.setRequestHeader('Content-Type', 'application/json');
                console.log("Logging in...", stringUser);
                http.send(stringUser);
                if (http.status != 200) {
                    return http.status;
                }
                var obtainedToken = JSON.parse(http.response);
                this.$cookies.put('Bearer', obtainedToken.token);
                this.isLogged = true;
                this.$localStorage.isLogged = true;
                this.loggedUser = user.username;
                this.$localStorage.username = user.username;
                console.log(user.username);
                return http.status;
            };
            LoginService.prototype.logout = function () {
                this.$cookies.remove('Bearer');
                this.$localStorage.isLogged = undefined;
                this.$localStorage.username = undefined;
                this.$window.location.href = '/';
            };
            return LoginService;
        }());
        loginservice.LoginService = LoginService;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.loginservice', ['ngStorage', 'ngCookies'])
            .service("LoginService", ['$localStorage', '$cookies', '$window', LoginService]);
    })(loginservice = app.loginservice || (app.loginservice = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 10/01/16.
 */
var app;
(function (app) {
    var settings;
    (function (settings) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                      SERVICE                      //
        ///////////////////////////////////////////////////////
        var SettingsService = (function () {
            function SettingsService($localStorage, $cookies, $window, $translate) {
                this.$localStorage = $localStorage;
                this.$cookies = $cookies;
                this.$window = $window;
                this.$translate = $translate;
                var language = this.$localStorage.language;
                if (language == undefined) {
                    this.changeLanguage("English");
                }
                else {
                    this.$translate.use(language);
                }
            }
            SettingsService.prototype.changeLanguage = function (lang) {
                this.$translate.use(lang);
                this.$localStorage.language = lang;
            };
            return SettingsService;
        }());
        settings.SettingsService = SettingsService;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.settings', ['ngStorage', 'ngCookies', 'pascalprecht.translate'])
            .service("SettingsService", ['$localStorage', '$cookies', '$window', '$translate', SettingsService]);
    })(settings = app.settings || (app.settings = {}));
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
            function HomeCtrl($scope, $cookies, LoginService, SettingsService) {
                this.$scope = $scope;
                this.$cookies = $cookies;
                this.LoginService = LoginService;
                this.SettingsService = SettingsService;
            }
            return HomeCtrl;
        }());
        home.HomeCtrl = HomeCtrl;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.home', ['ngRoute', 'ngCookies', 'app.loginservice', 'app.settings'])
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
                function HomeNoLogCtrl(LoginService, $window, growl) {
                    this.LoginService = LoginService;
                    this.$window = $window;
                    this.growl = growl;
                    // login
                    this.usernameLogin = "";
                    this.passwordLogin = "";
                    this.isInRegistrationPage = false;
                }
                HomeNoLogCtrl.prototype.login = function () {
                    var user = new LoggingUser(this.usernameLogin, this.passwordLogin);
                    console.log(user);
                    var result = this.LoginService.login(user);
                    console.log('Result of login is: ', result);
                    if (result != 200) {
                        if (result == 400) {
                            this.growl.error("Invalid username or password!");
                        }
                        if (result == 401) {
                            this.growl.error("Your account has not been activated!");
                        }
                        this.usernameLogin = "";
                    }
                };
                HomeNoLogCtrl.prototype.register = function () {
                };
                HomeNoLogCtrl.prototype.goToRegistration = function () {
                    this.isInRegistrationPage = true;
                };
                HomeNoLogCtrl.prototype.goToLogin = function () {
                    this.isInRegistrationPage = false;
                };
                return HomeNoLogCtrl;
            }());
            nolog.HomeNoLogCtrl = HomeNoLogCtrl;
            ///////////////////////////////////////////////////////
            //                       ANGULAR                     //
            ///////////////////////////////////////////////////////
            angular
                .module('app.home.nolog', ['app.loginservice', 'angularSpinner', 'angular-growl'])
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
                    this.loadingImage = undefined;
                    if (!this.StartLoadingService.informationLoaded) {
                        console.log('Loading user information...');
                        this.StartLoadingService.loadUserInfo(this.LoginService.loggedUser);
                    }
                    this.loadingImage = 'dist/images/s3X06zT.jpg';
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
 * Created by fabriziomicheloni on 07/01/17.
 */
var app;
(function (app) {
    var navbar;
    (function (navbar) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                    CONTROLLERS                    //
        ///////////////////////////////////////////////////////
        var NavbarCtrl = (function () {
            function NavbarCtrl(StartLoadingService, LoginService, SettingsService) {
                this.StartLoadingService = StartLoadingService;
                this.LoginService = LoginService;
                this.SettingsService = SettingsService;
                this.activePage = undefined;
                this.username = undefined;
                this.username = this.StartLoadingService.loggedUserInfo.username;
                this.activePage = window.location.href;
            }
            NavbarCtrl.prototype.logout = function () {
                this.LoginService.logout();
            };
            return NavbarCtrl;
        }());
        navbar.NavbarCtrl = NavbarCtrl;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.navbar', ['app.startloading', 'app.loginservice', 'app.settings'])
            .directive('navbarDirective', function () {
            return {
                templateUrl: '../../views/navbar/navbar.html',
                controller: NavbarCtrl,
                controllerAs: 'navbarCtrl'
            };
        });
    })(navbar = app.navbar || (app.navbar = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 07/01/17.
 */
var app;
(function (app) {
    var search;
    (function (search) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                    CONTROLLERS                    //
        ///////////////////////////////////////////////////////
        var SearchCtrl = (function () {
            function SearchCtrl(StartLoadingService, LoginService, NgMap, SettingsService, ExcursionService) {
                this.StartLoadingService = StartLoadingService;
                this.LoginService = LoginService;
                this.NgMap = NgMap;
                this.SettingsService = SettingsService;
                this.ExcursionService = ExcursionService;
                this.isDisplayingResults = false;
                this.excursionsResult = [];
                this.loadingImage = undefined;
                if (!this.StartLoadingService.informationLoaded) {
                    console.log('Loading user information...');
                }
                this.longitude = this.StartLoadingService.latitude;
                this.latitude = this.StartLoadingService.longitude;
                this.loadingImage = 'dist/images/s3X06zT.jpg';
            }
            SearchCtrl.prototype.searchExcursions = function () {
                while (this.excursionsResult.length > 0) {
                    this.excursionsResult.pop();
                }
                console.log(this.searchString);
                var foundExcursion = this.ExcursionService.searchExcursions(this.searchString);
                for (var _i = 0, foundExcursion_1 = foundExcursion; _i < foundExcursion_1.length; _i++) {
                    var excursion = foundExcursion_1[_i];
                    console.log(excursion);
                    this.excursionsResult.push(excursion);
                }
                this.isDisplayingResults = true;
            };
            SearchCtrl.prototype.goBack = function () {
                this.isDisplayingResults = false;
            };
            return SearchCtrl;
        }());
        search.SearchCtrl = SearchCtrl;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.search', ['app.startloading', 'app.loginservice', 'ngMap', 'angularSpinner', 'app.settings', 'app.excursions'])
            .config(function ($routeProvider) {
            $routeProvider.when('/search', {
                templateUrl: '../../views/testsearchpage/searchpage.html',
                controller: SearchCtrl,
                controllerAs: 'searchCtrl'
            });
        });
    })(search = app.search || (app.search = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 10/01/17.
 */
var app;
(function (app) {
    var myexcursions;
    (function (myexcursions) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                    CONTROLLERS                    //
        ///////////////////////////////////////////////////////
        var ExcursionsCtrl = (function () {
            function ExcursionsCtrl(StartLoadingService, LoginService, ExcursionService) {
                this.StartLoadingService = StartLoadingService;
                this.LoginService = LoginService;
                this.ExcursionService = ExcursionService;
                this.displayedExcursion = undefined;
                this.isDisplayingExcursion = false;
                this.myExcursions = [];
                this.title = undefined;
                this.description = undefined;
                this.targetPlace = undefined;
                this.targetPeople = undefined;
                this.position = undefined;
                this.croppedDataUrl = undefined;
                this.isAddingExcursion = false;
                console.log(this.ExcursionService);
                this.myExcursions = this.ExcursionService.myExcursions;
            }
            ExcursionsCtrl.prototype.goToAddingPage = function () {
                this.isAddingExcursion = true;
            };
            ExcursionsCtrl.prototype.goBack = function () {
                this.isAddingExcursion = false;
            };
            ExcursionsCtrl.prototype.addExcursion = function () {
                console.log(this.title);
                this.ExcursionService.loadExcursion(this.croppedDataUrl, this.title, this.description, this.targetPlace, this.targetPeople);
            };
            ExcursionsCtrl.prototype.showProductInfo = function (excursion) {
                this.isDisplayingExcursion = true;
                this.displayedExcursion = excursion;
            };
            ExcursionsCtrl.prototype.goBackFromExcursion = function () {
                this.isDisplayingExcursion = false;
            };
            return ExcursionsCtrl;
        }());
        myexcursions.ExcursionsCtrl = ExcursionsCtrl;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.myexcursions', ['app.startloading', 'app.loginservice', 'ngFileUpload', 'ngImgCrop', 'app.excursions'])
            .config(function ($routeProvider) {
            $routeProvider.when('/myexcursions', {
                templateUrl: '../../views/myexcursions/myexcursion.html',
                controller: ExcursionsCtrl,
                controllerAs: 'excursionsCtrl'
            });
        });
    })(myexcursions = app.myexcursions || (app.myexcursions = {}));
})(app || (app = {}));
/// <reference path="../../../typings/index.d.ts" />
/**
 * Created by fabriziomicheloni on 07/01/17.
 */
var app;
(function (app) {
    var settingsctrl;
    (function (settingsctrl) {
        'use strict';
        ///////////////////////////////////////////////////////
        //                    CONTROLLERS                    //
        ///////////////////////////////////////////////////////
        var SettingsCtrl = (function () {
            function SettingsCtrl(SettingsService) {
                this.SettingsService = SettingsService;
            }
            SettingsCtrl.prototype.changeLanguage = function () {
                this.SettingsService.changeLanguage(this.language);
            };
            return SettingsCtrl;
        }());
        settingsctrl.SettingsCtrl = SettingsCtrl;
        ///////////////////////////////////////////////////////
        //                       ANGULAR                     //
        ///////////////////////////////////////////////////////
        angular
            .module('app.settingsctrl', ['app.settings'])
            .config(function ($routeProvider) {
            $routeProvider.when('/settings', {
                templateUrl: '../../views/settings/settings.html',
                controller: SettingsCtrl,
                controllerAs: 'settingsCtrl'
            });
        });
    })(settingsctrl = app.settingsctrl || (app.settingsctrl = {}));
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
angular.module("app.templates", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("app-templates/images/Edit fiddle - JSFiddle_files/1xGMJQ.html", "<!DOCTYPE html>\n<!-- saved from url=(0040)http://headway-widget.net/widgets/1xGMJQ -->\n<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n    \n    <style>\n      *{box-sizing:border-box}*,body,button,input,select,textarea{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}body,html{height:100vh}html{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size:13px;overflow:hidden}body,h2,h3,p{padding:0;margin:0}p{font-size:13px}h2,h3{font-weight:600;font-size:.9rem}.outercont{color:#222c36}.outercont .cont{overflow:hidden;position:relative;height:100vh;width:100vw}.outercont .innercont{width:800px;-webkit-transition:all .3s;-webkit-transform:translate(0);transform:translate(0);overflow:hidden;position:absolute;left:0;transition:all .3s;will-change:left;width:200vw}.outercont .innercont .logDetails,.outercont .innercont .logListCont{width:100vw;float:left;overflow:hidden}.outercont .innercont .slideCont{padding:16px}.outercont .innercont .slideCont .slideBody .label{margin-bottom:10px}.outercont .innercont .slideCont .slideBody p{margin-bottom:10px;line-height:19px;color:#222c36;clear:both}.outercont .innercont .slideCont .slideBody p a{color:#2795ee}.outercont .innercont .slideCont .slideBody p:last-child{margin-bottom:0}.outercont .innercont .slideCont .slideBody ul{clear:both;padding:0;margin:10px 0 10px 15px;line-height:22px}.outercont .innercont .logDetailsItem{position:relative}.outercont .innercont .logItem{display:block;line-height:19px;padding:7px 16px 7px 12px;color:#666;text-decoration:none;border-left:3px solid #2795ee}.outercont .innercont .logItem.read{border-left:0;padding:7px 15px}.outercont .innercont .logItem:first-child{padding-top:14px}.outercont .innercont .logItem:last-child{padding-bottom:14px}.outercont .innercont .logItem:hover strong{text-decoration:underline}.outercont .innercont strong{color:#222c36;font-weight:600}.outercont .innercont .back{position:absolute;top:0;left:0;display:block;height:46px;width:30px;opacity:.25}.outercont .innercont .back:after,.outercont .innercont .back:before{content:\"\";height:12px;width:1px;display:block;background:#222c36;position:absolute;left:17px}.outercont .innercont .back:before{-webkit-transform:rotate(45deg);transform:rotate(45deg);top:14px}.outercont .innercont .back:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);bottom:12px}.outercont .innercont h3{text-align:center;border-bottom:1px solid #f1f1f1;font-weight:600;font-size:14px;padding:15px 23px;line-height:15px}.outercont .innercont .link{margin:15px 0 5px}.outercont .innercont .link a{color:#2795ee;font-weight:700;text-decoration:none;display:inline-block}.outercont .innercont .seeMore{background:#fcfcfc;color:#a8a8a8;font-size:12px;text-align:center;border-top:1px solid #f1f1f1;height:35px;line-height:35px;border-radius:0 0 4px 4px}.outercont .innercont .seeMore a{color:#a8a8a8}.outercont .innercont .label{border-radius:10px;color:#fff;font-size:11px;padding:0 6px;height:18px;line-height:18px;margin-right:5px;float:left}.outercont .innercont .label.category_{display:none}.outercont .innercont .label.category_1{background:#5ab987}.outercont .innercont .label.category_2{background:#8d66b9}.outercont .innercont .label.category_3{background:#f5a623}.outercont .innercont .label.category_4{background:#23cff5}.outercont .innercont .label.category_5{background:#eb82ae}.outercont .innercont .label.category_6{background:#2364f5}.outercont .innercont .label.category_7{background:#94cd1b}.outercont .innercont .label.category_8{background:#ecc439}.outercont .innercont .label.category_9{background:#7290df}.outercont .innercont .label.category_10{background:#ba68db}\n    </style>\n    <script>\n      (function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}},s=function(t,e){function s(){this.constructor=t}for(var o in e)n.call(e,o)&&(t[o]=e[o]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},n={}.hasOwnProperty;t=function(){function t(){this.log=e(this.log,this)}return t.prototype.pushMessage=function(t,e){return null==e&&(e={}),window.parent.postMessage([t,e],\"*\")},t.prototype.addEvent=function(t,e,s,n){return null==n&&(n=!1),t.addEventListener(e,s,n)},t.prototype.setStyles=function(t,e){var s,n;n=[];for(s in e)n.push(t.style[s]=e[s]);return n},t.prototype.log=function(){if(this.options.debug)return console.log(\"[Headway Debug]\",arguments)},t}(),this.App=function(t){function n(t){this.applyTranslations=e(this.applyTranslations,this),this.moveScreenTo=e(this.moveScreenTo,this),this.setDetailsHeight=e(this.setDetailsHeight,this),this.setListHeight=e(this.setListHeight,this),this.markItems=e(this.markItems,this),this.logsExpired=e(this.logsExpired,this),this.countUnseenItems=e(this.countUnseenItems,this),this.countItems=e(this.countItems,this),this.storeSeenItems=e(this.storeSeenItems,this),this.getCurrentIds=e(this.getCurrentIds,this),this.setSeenIds=e(this.setSeenIds,this),this.setReadIds=e(this.setReadIds,this),this.setupDefaults=e(this.setupDefaults,this),this.options=t,this.elements={logItems:document.querySelectorAll(\".logItem\"),backLinks:document.querySelectorAll(\".back\"),logListCont:document.querySelector(\".logListCont\"),logDetailsItem:document.querySelectorAll(\".logDetailsItem\"),innercont:document.querySelector(\".innercont\"),title:document.querySelector(\"h3\"),readMore:document.querySelector(\".link a\")},this.storageKey,this.currentCount,this.badgeCount,this.storageIds,this.current={data:null},this.setupDefaults(),this.log(\"App.constructor\",this.options,this.elements,this.storageKey,this.currentCount,this.badgeCount,this.storageIds,this.current)}return s(n,t),n.prototype.setupDefaults=function(){var t,e,s,n,o,r,i,a,l;for(a=this.elements.logItems,t=function(t){return function(e,s){return t.addEvent(e,\"click\",function(n){if(n.stopPropagation(),n.preventDefault(),t.moveScreenTo(-100),t.setDetailsHeight(s),t.currentCount>=0&&!e.dataset.read&&t.storageIds.read.indexOf(e.dataset.id)<0)return t.currentCount=t.currentCount-1,t.setReadIds(e.dataset.id),t.markItems(\"read\")})}}(this),s=e=0,o=a.length;e<o;s=++e)i=a[s],t(i,s);for(l=this.elements.backLinks,n=0,r=l.length;n<r;n++)i=l[n],this.addEvent(i,\"click\",function(t){return function(e){return e.stopPropagation(),e.preventDefault(),t.moveScreenTo(0),t.setListHeight()}}(this));if(this.setListHeight(),this.elements.logItems.length>0)return this.addEvent(window,\"message\",function(t){return function(e){var s,n;if(n=e.data[0],s=e.data[1],\"opened\"===n&&(t.storeSeenItems(),t.pushMessage(\"setBadge\",{counter:0,softHide:!0,options:t.options})),\"closed\"===n&&(t.moveScreenTo(0),t.setListHeight()),\"ready\"===n)return t.options.debug=s.options.debug,t.current.data=s,t.storageKey=t.current.data.host,t.storageIds=s.storage,t.currentCount=t.countItems(\"read\"),t.badgeCount=t.countUnseenItems(),t.markItems(\"read\"),t.markItems(\"seen\"),t.applyTranslations(),t.log(\"App.setupDefaults#ready\",e.data),t.pushMessage(\"widgetReady\",{counter:t.badgeCount,softHide:!0,options:t.options})}}(this))},n.prototype.setReadIds=function(t){var e,s;return s=\"HW_readItems\",this.storageIds.read.push(t),e=this.storageIds.read.join(\",\"),this.pushMessage(\"setStorage\",{key:s,ids:e})},n.prototype.getIds=function(t){return this.storageIds[t]},n.prototype.setSeenIds=function(t){var e;return e=\"HW_seenItems\",t=t.join(\",\"),this.pushMessage(\"setStorage\",{key:e,ids:t})},n.prototype.getCurrentIds=function(){var t;return t=Array.prototype.slice.call(this.elements.logItems),t.map(function(t){return t.dataset.id})},n.prototype.storeSeenItems=function(){var t,e,s,n;for(s=Array.prototype.slice.call(this.elements.logItems),t=0,n=s.length;t<n;t++)e=s[t],this.storageIds.seen.indexOf(e.dataset.id)<0&&this.storageIds.seen.push(e.dataset.id);return this.storageIds.seen=this.storageIds.seen.slice(0,20),this.setSeenIds(this.storageIds.seen)},n.prototype.countItems=function(t){var e,s,n,o,r,i,a,l;if(s=0,this.log(\"App.countItems(\"+t+\")\",this.storageIds),null!=(l=this.storageIds)?l[t]:void 0){for(o=this.storageIds[t],e=this.getCurrentIds(),n=e.map(function(t){return o.indexOf(t)>=0}),r=0,a=n.length;r<a;r++)i=n[r],i||(s+=1);this.log(\"App.countItems#storageIds[\"+t+\"]\",e,n)}return s},n.prototype.countUnseenItems=function(){var t,e,s;return s=this.countItems(\"seen\"),e=this.logsExpired(),t=s,e&&(t=0),t},n.prototype.logsExpired=function(){var t,e,s,n,o,r,i;return s=this.options.expireAfter||9999,o=this.elements.logItems[0],r=o.dataset.date,n=new Date(r),t=new Date,i=Math.abs(t.getTime()-n.getTime()),e=Math.floor(i/864e5),e>=s},n.prototype.markItems=function(t){var e,s,n,o,r,i;if(n=this.getIds(t),n.length>0){for(i=[],e=0,r=n.length;e<r;e++)s=n[e],s?(o=document.querySelector(\"*[data-id=\'\"+s+\"\']\"),null!=o&&(o.dataset[t]=!0),i.push(null!=o?o.classList.add(t):void 0)):i.push(void 0);return i}},n.prototype.setListHeight=function(){return this.pushMessage(\"setHeight\",{height:this.elements.logListCont.offsetHeight})},n.prototype.setDetailsHeight=function(t){var e,s,n,o,r,i;for(i=this.elements.logDetailsItem,n=0,r=i.length;n<r;n++)o=i[n],this.setStyles(o,{display:\"none\"});return s=this.elements.logDetailsItem[t].querySelector(\"noscript\"),s&&(e=s.innerHTML,e=e.replace(/&gt;/g,\">\").replace(/&lt;/g,\"<\").replace(/&amp;/g,\"&\"),s.parentNode.innerHTML=e,this.applyTranslations(),this.addTargetBlank(this.elements.logDetailsItem[t])),this.setStyles(this.elements.logDetailsItem[t],{display:\"block\"}),this.pushMessage(\"setHeight\",{height:this.elements.logDetailsItem[t].offsetHeight})},n.prototype.addTargetBlank=function(t){var e,s,n,o,r;for(o=t.querySelectorAll(\".slideBody a\"),r=[],e=0,s=o.length;e<s;e++)n=o[e],r.push(n.target=\"_blank\");return r},n.prototype.moveScreenTo=function(t){return this.setStyles(this.elements.innercont,{left:t+\"%\"})},n.prototype.applyTranslations=function(){var t,e,s,n,o,r,i,a,l;if(this.current.data.options.translations){if(a=this.current.data.options.translations,null!=a.title&&(this.elements.title.textContent=a.title),null!=a.labels){r=a.labels;for(e in r)for(l=r[e],n=document.querySelectorAll(\"*[data-label-value=\'\"+e+\"\']\"),t=0,o=n.length;t<o;t++)s=n[t],s.textContent=l}if(null!=a.readMore)return null!=(i=this.elements.readMore)?i.textContent=a.readMore:void 0}},n}(t)}).call(this);\n//# sourceMappingURL=app-65972bd103.js.map\n\n    </script>\n    <script type=\"text/javascript\">\n      var HW_config =  {\"badgeDelay\":3,\"softHide\":true,\"eyecatcher\":false,\"expireAfter\":null}\n\n      document.addEventListener(\"DOMContentLoaded\", function(){\n        new App(HW_config);\n      }, false);\n    </script>\n\n      <style>\n        .outercont .innercont .link a {\n          color: #1C90F3;\n        }\n\n        .outercont .innercont .slideCont .slideBody p a {\n          color: #1C90F3;\n        }\n\n        .outercont .innercont .logItem {\n          border-left-color: #1C90F3;\n        }\n      </style>\n  </head>\n  <body>\n    <div class=\"outercont\">\n      <div class=\"cont\">\n        <div class=\"innercont\">\n            <div class=\"logListCont\">\n    <h3>Latest changes</h3>\n    <div class=\"logList\">\n      <a href=\"http://headway-widget.net/widgets/1xGMJQ#\" class=\"logItem\" data-id=\"13381\" data-date=\"2016-12-14 11:24:28 UTC\">\n  <span class=\"label category_3\" data-label-value=\"fix\">Fix</span>\n  <strong>Embed fixes.</strong>\n  We\'ve added a bunch of fixes to the Embed:\n\n🎨 Overriding colors works again.\n\n🐞 There was a...\n</a> <!-- /logItem -->\n<a href=\"http://headway-widget.net/widgets/1xGMJQ#\" class=\"logItem\" data-id=\"9678\" data-date=\"2016-10-06 19:49:22 UTC\">\n  <span class=\"label category_2\" data-label-value=\"improvement\">Improvement</span>\n  <strong>JSX Syntax Highlighting.</strong>\n  Added JSX syntax highlighting when you switch the language of the JavaScript panel to...\n</a> <!-- /logItem -->\n<a href=\"http://headway-widget.net/widgets/1xGMJQ#\" class=\"logItem\" data-id=\"9011\" data-date=\"2016-09-21 15:46:52 UTC\">\n  <span class=\"label category_3\" data-label-value=\"fix\">Fix</span>\n  <strong>JavaScript-based embed.</strong>\n  There was an issue with using the JavaScript-based embed (the default one), where it would throw...\n</a> <!-- /logItem -->\n<a href=\"http://headway-widget.net/widgets/1xGMJQ#\" class=\"logItem\" data-id=\"8805\" data-date=\"2016-09-16 20:14:27 UTC\">\n  <span class=\"label category_2\" data-label-value=\"improvement\">Improvement</span>\n  <strong>Resources reordering.</strong>\n  This is long overdue, and actually wasn\'t supposed to land in this version of JSFiddle, but...\n</a> <!-- /logItem -->\n\n    </div> <!-- /logList -->\n    <div class=\"seeMore\">\n      <a target=\"_blank\" href=\"https://headwayapp.co/jsfiddle-changelog\">JSFiddle changelog</a>\n        powered by <a target=\"_blank\" href=\"https://headwayapp.co/\">Headway</a>\n    </div>\n  </div> <!-- /logListCont -->\n\n  <div class=\"logDetails\">\n    <div class=\"logDetailsItem\">\n  <a href=\"http://headway-widget.net/widgets/1xGMJQ#back\" class=\"back\"></a>\n  <h3>Embed fixes</h3>\n  <div class=\"slideCont\">\n    <div class=\"slideBody\">\n      <noscript>\n        &lt;span class=\"label category_3\" data-label-value=\"fix\"&gt;Fix&lt;/span&gt;\n        &lt;p&gt;We\'ve added a bunch of fixes to the Embed:&lt;/p&gt;\n&lt;ol&gt;\n&lt;li&gt;&lt;p&gt;🎨 Overriding colors works again.\n&lt;img src=\"https://cloud.headwayapp.co/changelogs_images/images/small/000/001/761-a68cad8f71c47fa79b88489e0fe26c1164aa871a.png\" width=\"308\" height=\"150\"&gt;&lt;/p&gt;&lt;/li&gt;\n&lt;li&gt;&lt;p&gt;🐞 There was a problem when the &lt;strong&gt;Results&lt;/strong&gt; tab would not have the correct height if embedded as the first tab in order. This is now working as expected.&lt;/p&gt;&lt;/li&gt;\n&lt;/ol&gt;\n      </noscript>\n    </div>\n      <p class=\"link\"><a target=\"_blank\" href=\"https://headwayapp.co/jsfiddle-changelog/embed-fixes-13381\">Read the whole post</a></p>\n  </div> <!-- /slideCont -->\n</div> <!-- /logDetailsItem -->\n<div class=\"logDetailsItem\">\n  <a href=\"http://headway-widget.net/widgets/1xGMJQ#back\" class=\"back\"></a>\n  <h3>JSX Syntax Highlighting</h3>\n  <div class=\"slideCont\">\n    <div class=\"slideBody\">\n      <noscript>\n        &lt;span class=\"label category_2\" data-label-value=\"improvement\"&gt;Improvement&lt;/span&gt;\n        &lt;p&gt;Added &lt;b&gt;JSX syntax highlighting&lt;/b&gt; when you switch the language of the JavaScript panel to &lt;b&gt;Babel&lt;/b&gt;.&lt;/p&gt;&lt;p&gt;Additionally bumped CodeMirror version from 5.9.0 to 5.19.0 – they sure update it a lot!&lt;/p&gt;\n      </noscript>\n    </div>\n  </div> <!-- /slideCont -->\n</div> <!-- /logDetailsItem -->\n<div class=\"logDetailsItem\">\n  <a href=\"http://headway-widget.net/widgets/1xGMJQ#back\" class=\"back\"></a>\n  <h3>JavaScript-based embed</h3>\n  <div class=\"slideCont\">\n    <div class=\"slideBody\">\n      <noscript>\n        &lt;span class=\"label category_3\" data-label-value=\"fix\"&gt;Fix&lt;/span&gt;\n        &lt;p&gt;There was an issue with using the JavaScript-based embed (the default one), where it would throw an error when no-protocol was defined as the URL.&lt;/p&gt;&lt;p&gt;Sorry for the trouble.&lt;/p&gt;\n      </noscript>\n    </div>\n  </div> <!-- /slideCont -->\n</div> <!-- /logDetailsItem -->\n<div class=\"logDetailsItem\">\n  <a href=\"http://headway-widget.net/widgets/1xGMJQ#back\" class=\"back\"></a>\n  <h3>Resources reordering</h3>\n  <div class=\"slideCont\">\n    <div class=\"slideBody\">\n      <noscript>\n        &lt;span class=\"label category_2\" data-label-value=\"improvement\"&gt;Improvement&lt;/span&gt;\n        &lt;p&gt;This is long overdue, and actually wasn\'t supposed to land in this version of JSFiddle, but turned out to be a 30 minute task, so here it is –&nbsp;&lt;b&gt;resource reordering&lt;/b&gt;!&lt;/p&gt;&lt;p&gt;Just grab a resource and drag it into a new slot.&lt;/p&gt;\n      </noscript>\n    </div>\n  </div> <!-- /slideCont -->\n</div> <!-- /logDetailsItem -->\n\n  </div> <!-- /logDetails -->\n\n        </div> <!-- /innercont -->\n      </div> <!-- /cont -->\n    </div> <!-- /outercont -->\n  \n\n</body></html>");
        $templateCache.put("app-templates/images/Edit fiddle - JSFiddle_files/saved_resource.html", "<!DOCTYPE html>\n<!-- saved from url=(0055)http://fiddle.jshell.net/danialfarid/xxo3sk41/590/show/ -->\n<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><style type=\"text/css\">@charset \"UTF-8\";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>\n  \n  <meta name=\"robots\" content=\"noindex, nofollow\">\n  <meta name=\"googlebot\" content=\"noindex, nofollow\">\n\n  \n  \n\n  \n  \n  \n\n  \n\n  <script type=\"text/javascript\" src=\"./dummy.js\"></script>\n\n  \n\n  \n\n  \n\n  \n    <link rel=\"stylesheet\" type=\"text/css\" href=\"./result-light.css\">\n  \n\n  \n    \n      <script type=\"text/javascript\" src=\"./angular.js\"></script>\n    \n  \n    \n      <script type=\"text/javascript\" src=\"./ng-file-upload-shim.js\"></script>\n    \n  \n    \n      <script type=\"text/javascript\" src=\"./ng-file-upload.js\"></script>\n    \n  \n    \n      <script type=\"text/javascript\" src=\"./ng-img-crop.js\"></script>\n    \n  \n    \n      <link rel=\"stylesheet\" type=\"text/css\" href=\"./ng-img-crop.css\">\n    \n  \n\n  <style type=\"text/css\">\n    .cropArea {\n    background: #E4E4E4;\n    overflow: hidden;\n    width:500px;\n    height:350px;\n}\nform .progress {\n    line-height: 15px;\n}\n.progress {\n    display: inline-block;\n    width: 100px;\n    border: 3px groove #CCC;\n}\n.progress div {\n    font-size: smaller;\n    background: orange;\n    width: 0;\n}\n  </style>\n\n  <title> by danialfarid</title>\n\n  \n    \n\n\n\n\n<script type=\"text/javascript\">//<![CDATA[\n\n//inject ngFileUpload and ngImgCrop directives and services.\nvar app = angular.module(\'fileUpload\', [\'ngFileUpload\', \'ngImgCrop\']);\n\napp.controller(\'MyCtrl\', [\'$scope\', \'Upload\', \'$timeout\', function ($scope, Upload, $timeout) {\n    $scope.upload = function (dataUrl, name) {\n        Upload.upload({\n            url: \'https://angular-file-upload-cors-srv.appspot.com/upload\',\n            data: {\n                file: Upload.dataUrltoBlob(dataUrl, name)\n            },\n        }).then(function (response) {\n            $timeout(function () {\n                $scope.result = response.data;\n            });\n        }, function (response) {\n            if (response.status > 0) $scope.errorMsg = response.status \n                + \': \' + response.data;\n        }, function (evt) {\n            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);\n        });\n    }\n}]);\n//]]> \n\n</script>\n\n  \n</head>\n\n<body ng-app=\"fileUpload\" ng-controller=\"MyCtrl\" class=\"ng-scope\">\n  \n    <form name=\"myForm\" class=\"ng-valid ng-submitted ng-dirty ng-valid-max-height ng-valid-min-height ng-valid-max-width ng-valid-min-width ng-valid-dimensions ng-valid-ratio ng-valid-max-ratio ng-valid-min-ratio ng-valid-max-duration ng-valid-min-duration ng-valid-duration ng-valid-validate-async-fn ng-valid-parse\">\n        <div>Crop Image and Upload</div>\n        <button ngf-select=\"\" ng-model=\"picFile\" accept=\"image/*\" class=\"ng-valid ng-touched ng-dirty ng-valid-max-height ng-valid-min-height ng-valid-max-width ng-valid-min-width ng-valid-dimensions ng-valid-ratio ng-valid-max-ratio ng-valid-min-ratio ng-valid-max-duration ng-valid-min-duration ng-valid-duration ng-valid-validate-async-fn ng-valid-parse\">\n            Select Picture</button>\n        <div ngf-drop=\"\" ng-model=\"picFile\" ngf-pattern=\"image/*\" class=\"cropArea ng-pristine ng-untouched ng-valid\">\n            <img-crop image=\"picFile  | ngfDataUrl\" result-image=\"croppedDataUrl\" ng-init=\"croppedDataUrl=&#39;&#39;\" class=\"ng-isolate-scope\"><canvas width=\"446\" height=\"350\" style=\"margin-top: -175px; margin-left: -223.025px; cursor: default;\"></canvas></img-crop>\n        </div>\n        <div>\n            <img ng-src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQVR4Xu1dCZhO1Rt/hyxhKtTItJFMkco2JcYfUbROYRRPIUaNUP2TpfSQLVHK2pAiWbJElnZtZKsoraJVigjZpkE0/+d3mvP973zzLffe795z7/m+932eeWa++c4959z3nN9533POuyQVFBQUEBNzgDkQkgNJDBCeGcyB8BxggPDsYA5E4AADhKcHc4ABwnOAOWCPAyxB7PGNn0oQDjBAEmSg+TXtcYABYo9v/FSCcIABkiADza9pjwOmAHLo0CFKTk423cKoUaPooYceMl2eC6rnAMYIlJGRQU2bNo3aAbtjave5qB1SVMAUQNLS0mjr1q2mu5SUlER8QW+aXZ4UvOqqq+i9994TbY8dO5b69u0bsR92x9Tuc54wJUSjAiAlSpSgXbt2UUpKipjY+Lxnzx6qXLkyrVq1im666Sb6888/CS+L/59++umiXMmSJcVzZ5xxhvhcqlQp+uijj6hBgwYMEL+McJh+tGzZkl5//XX65JNP6IorrqC///6b+vTpQ127dqV+/frR+vXrqXr16jR06FCqUqUKtWnTho4dO0YdO3akl19+udjYyzlUtWpVOn78OJUpU4Y++OADaty4sdZzIWn37t0FmOCga665ht5++22aPHky9erVSwACEx8S5PPPP6dy5coF2I3/T5kyhXJyckS5vXv3UqVKlcT3uq8aPp/bjnTv6quvphUrVtCRI0eoWbNmYmHbvn07ZWVlib8BGoBEEsYUhHHPy8ujChUqFJkLc+fOpU6dOomx/+mnn6hatWpxMReSjhw5UoCVHysAJvi+ffsoNzeXevbsWQQgmzdvpvz8fMGYadOmUY8ePWjq1Kl09913i3JHjx6l0qVLxwVTHJmBPq/EqGJh/KAlLF26NDB+kyZNEoskCBoDFsB//vmHbrvtNpo9e7bQFkDTp0+nbt26kREgBw8eDOxZdV8shYrVpEkTWrt2LX3//fdUo0YNmjBhAt17770BgMiXbN26tZAw77zzDkFEB5erXbs2AUhypfH5HEno7kmJULFiRbEoYoErW7YsXXzxxfT1118LSYEFD6oX/pZzoEWLFvT+++9Teno6bdiwgdatW0eNGjWimTNnUpcuXQLloJ79/PPP2s8FU5t0P80krGKQdkzMARUc0A4gN9xw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\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAgAElEQVR4Xu1dCZhO1Rt/hyxhKtTItJFMkco2JcYfUbROYRRPIUaNUP2TpfSQLVHK2pAiWbJElnZtZKsoraJVigjZpkE0/+d3mvP973zzLffe795z7/m+932eeWa++c4959z3nN9533POuyQVFBQUEBNzgDkQkgNJDBCeGcyB8BxggPDsYA5E4AADhKcHc4ABwnOAOWCPAyxB7PGNn0oQDjBAEmSg+TXtcYABYo9v/FSCcIABkiADza9pjwOmAHLo0CFKTk423cKoUaPooYceMl2eC6rnAMYIlJGRQU2bNo3aAbtjave5qB1SVMAUQNLS0mjr1q2mu5SUlER8QW+aXZ4UvOqqq+i9994TbY8dO5b69u0bsR92x9Tuc54wJUSjAiAlSpSgXbt2UUpKipjY+Lxnzx6qXLkyrVq1im666Sb6888/CS+L/59++umiXMmSJcVzZ5xxhvhcqlQp+uijj6hBgwYMEL+McJh+tGzZkl5//XX65JNP6IorrqC///6b+vTpQ127dqV+/frR+vXrqXr16jR06FCqUqUKtWnTho4dO0YdO3akl19+udjYyzlUtWpVOn78OJUpU4Y++OADaty4sdZzIWn37t0FmOCga665ht5++22aPHky9erVSwACEx8S5PPPP6dy5coF2I3/T5kyhXJyckS5vXv3UqVKlcT3uq8aPp/bjnTv6quvphUrVtCRI0eoWbNmYmHbvn07ZWVlib8BGoBEEsYUhHHPy8ujChUqFJkLc+fOpU6dOomx/+mnn6hatWpxMReSjhw5UoCVHysAJvi+ffsoNzeXevbsWQQgmzdvpvz8fMGYadOmUY8ePWjq1Kl09913i3JHjx6l0qVLxwVTHJmBPq/EqGJh/KAlLF26NDB+kyZNEoskCBoDFsB//vmHbrvtNpo9e7bQFkDTp0+nbt26kREgBw8eDOxZdV8shYrVpEkTWrt2LX3//fdUo0YNmjBhAt17770BgMiXbN26tZAw77zzDkFEB5erXbs2AUhypfH5HEno7kmJULFiRbEoYoErW7YsXXzxxfT1118LSYEFD6oX/pZzoEWLFvT+++9Teno6bdiwgdatW0eNGjWimTNnUpcuXQLloJ79/PPP2s8FU5t0P80krGKQdkzMARUc0A4gN9xw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\">\n        </div>\n        <button ng-click=\"upload(croppedDataUrl, picFile.name)\">Submit</button> \n            \n        <span class=\"progress\" ng-show=\"progress &gt;= 0\">\n          <div style=\"width:100%\" ng-bind=\"progress + &#39;%&#39;\" class=\"ng-binding\">100%</div>\n        </span>\n        <span ng-show=\"result\" class=\"\">Upload Successful</span>\n        <span class=\"err ng-binding ng-hide\" ng-show=\"errorMsg\"></span>\n    </form>\n\n  \n  <script>\n  // tell the embed parent frame the height of the content\n  if (window.parent && window.parent.parent){\n    window.parent.parent.postMessage([\"resultsFrame\", {\n      height: document.body.getBoundingClientRect().height,\n      slug: \"xxo3sk41\"\n    }], \"*\")\n  }\n</script>\n\n\n\n\n\n<label tabindex=\"-1\" style=\"visibility: hidden; position: absolute; overflow: hidden; width: 0px; height: 0px; border: none; margin: 0px; padding: 0px;\">upload<input type=\"file\" ngf-select=\"\" ng-model=\"picFile\" accept=\"image/*\"></label></body></html>");
    }]);
