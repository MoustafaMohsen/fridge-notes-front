(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Services/frormat.service.ts":
/*!*********************************************!*\
  !*** ./src/app/Services/frormat.service.ts ***!
  \*********************************************/
/*! exports provided: FormatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatService", function() { return FormatService; });
/* harmony import */ var _statics_Grocery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../statics/Grocery */ "./src/app/statics/Grocery.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var FormatService = /** @class */ (function () {
    function FormatService() {
    }
    FormatService.prototype.Tobought = function (gPara) {
        var g = __assign({}, gPara);
        //g.moreInformations={...gPara.moreInformations}
        if (g.basic) {
        }
        else {
            g.timeout = 0; //to force gussing timeout
        }
        var lastno = g.moreInformations[g.moreInformations.length - 1].no;
        var lasttype = g.moreInformations[g.moreInformations.length - 1].typeOfNo;
        var Holdmore = {
            no: lastno,
            bought: true,
            typeOfNo: lasttype,
            lifeTime: 0
            // moreInformationsId:null
        };
        g.moreInformations.push(Holdmore);
        //to bought
        g.groceryOrBought = true;
        return g;
    };
    FormatService.prototype.Toneed = function (gPara, basic, timeout, moreInformations) {
        if (timeout === void 0) { timeout = 0; }
        var g = {
            basic: gPara.basic,
            groceryOrBought: gPara.groceryOrBought,
            id: gPara.id,
            moreInformations: gPara.moreInformations,
            name: gPara.name,
            owner: gPara.owner,
            ownerid: gPara.ownerid,
            timeout: gPara.timeout
        };
        var lastno = moreInformations.no;
        var lasttype = moreInformations.typeOfNo;
        g.timeout = 0; //to make sure no one add a timeout to a needed item
        var HoldAddmore = {
            no: lastno,
            bought: false,
            typeOfNo: lasttype,
            lifeTime: 0
        };
        g.moreInformations.push(HoldAddmore);
        g.groceryOrBought = false;
        return g;
    };
    FormatService.prototype.Toremove = function (gPara) {
        var g = __assign({}, gPara);
        //remember to SendDelete() or edit
        if (g.moreInformations.length <= 1) {
            return g;
        }
        else {
            g.moreInformations.pop();
            g.groceryOrBought = g.moreInformations[g.moreInformations.length - 1].bought;
            return g;
        }
    };
    FormatService.prototype.Toadd = function (g, name, basic, timeout, moreInformation) {
        if (basic === void 0) { basic = false; }
        if (timeout === void 0) { timeout = 0; }
        g.name = name;
        g.basic = basic;
        g.timeout = 0;
        var lastMore = this.lastmoteInfo(g);
        g.moreInformations[g.moreInformations.length - 1] = {
            bought: false,
            no: moreInformation.no,
            typeOfNo: moreInformation.typeOfNo
        };
        return g;
    };
    FormatService.prototype.lastmoteInfo = function (g) {
        var valid = g && g.moreInformations ? true : false;
        if (!valid)
            return null;
        var i = g.moreInformations.length - 1;
        var last = new _statics_Grocery__WEBPACK_IMPORTED_MODULE_0__["MoreInformation"]();
        last = g.moreInformations[i];
        return last;
    };
    return FormatService;
}()); //class

// <summary>
// Grocery non nullabls
// MoreInformations[ No=1 ,typeOfNo="" , bought =false ,  ] lifetime is a server property only
// Name,basic=false
// If no timeout and basic is true then let the server handls it else just send it as difference not the future
// </summary>
// forntend is the orcestrator and the one who determens the state of grocery before request
// Add,Edit,Needed,Bought,remove all are a single Post method and to determine the state send in parameter[needed,bought,edit,add]
//
// server dependencies:-
// -Guessing timeout
// -formating timeout to future
// -setting Date and lifetime
// -set lifetime only at bought invoks , set timeout only at needed invoks
// -timeout == 0 then it's not basic
//
// frontend dependencies
// -forming a request suitable for add,edit,bought,needed
//     -bought =>grocery as it is just add moreinformation at the end of the array containing
//       -[No=last ,typeOfNo=last , bought =true ] To URL/bought
//
//     -needed =>grocery as [Name=same,basic=input,timout=input(ifbasic)  ] and add moreinformation at the end of the array containing
//       -[No=lastOrinput ,typeOfNo=lastOrinput , bought =false ] To URL/needed
//
//     -edit =>grocery as [Name=Input,basic=input,timout=input(ifbasic&needed show input else last or 0 if basic=false) ] and
//       Change moreinformation at the end of the array to [No=input ,typeOfNo=input , bought=holdlast ]
//       To URL/needed
//
//     -remove => grocery as if moreinformation.count > 1 then remove last moreinformation and send edit
//         else send DELETE request
//
//     -add => grocery as [Name=Input,basic=inputOrfalse ,timout=input(if basic show input else 0 if basic=false) ] and
//       Change moreinformation at the end of the array to [No=inputOr1 ,typeOfNo=inputOr"" , bought=inputOrfalse ]
//       To URL/add
//
// -DELETE =>send Delete request conatining id
//
//
// <param name="grocery"></param>
//
// <returns></returns>
//     -bought =>grocery as it is just add moreinformation at the end of the array containing
//       -[No=last ,typeOfNo=last , bought =true ] To URL/bought
//-needed =>grocery as [Name=same,basic=input,timout=input(ifbasic)  ]
// and add moreinformation at the end of the array containing
//-[No=nput ,typeOfNo=nput , bought =false ] To URL/needed
//edit =>grocery as [Name=Input,basic=input,timout=input(ifbasic&needed show input else last or 0 if basic=false) ] and
//Change moreinformation at the end of the array to [No=input ,typeOfNo=input , bought=holdlast ]
//To URL/needed
//-remove => grocery as if moreinformation.count > 1 then remove last moreinformation and send edit
// else send DELETE request
//-add => grocery as [Name=Input,basic=inputOrfalse ,timout=input(if basic show input else 0 if basic=false) ] and
//Change moreinformation at the end of the array to [No=inputOr1 ,typeOfNo=inputOr"" , bought=inputOrfalse ]
//To URL/add


/***/ }),

/***/ "./src/app/Services/g-list.service.ts":
/*!********************************************!*\
  !*** ./src/app/Services/g-list.service.ts ***!
  \********************************************/
/*! exports provided: GListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GListService", function() { return GListService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _statics_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../statics/config */ "./src/app/statics/config.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _styler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styler.service */ "./src/app/Services/styler.service.ts");







var GListService = /** @class */ (function () {
    function GListService(http, snack, auth, formBuilder, styler) {
        var _this = this;
        this.http = http;
        this.snack = snack;
        this.auth = auth;
        this.styler = styler;
        this.URL = _statics_config__WEBPACK_IMPORTED_MODULE_3__["_BaseUrl"] + "/api/GroceriesApi";
        this.Lastdate = -1;
        this.showAddCard = false;
        this.showAddCard$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.clickAddCardButton$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.AddFromItem = {
            name: "",
            moreInformations: [{ bought: false, no: 1, typeOfNo: "" }],
            timeout: 0
        };
        this.Loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.Loading = false;
        this.UpdateList$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.formItem = formBuilder.group({
            name: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]],
            no: [1, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]],
            type: ["", []],
            basic: [false, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]]
        });
        this.Loading$.subscribe(function (l) { return (_this.Loading = l); });
        this.UpdateList$.asObservable().subscribe(function (options) {
            var now = Date.now() / 1000;
            var diff = now - _this.Lastdate;
            var _loading = options ? options.loading : false;
            var _refresh = options ? options.refresh : false;
            var scrollId = options ? options.scrollId : "";
            var ExcuteOnSuccess = options ? options.ExcuteOnSuccess : null;
            if (diff > 1 || _this.Lastdate == -1 || _refresh) {
                _this.Lastdate = Date.now() / 1000;
                _this.getList(_loading, scrollId, ExcuteOnSuccess);
            }
        });
        this.showAddCard$.subscribe(function (s) { return (_this.showAddCard = s); });
        this.globalRandom = this.randomStr(5);
    }
    //get isThereNeeded(){ this.NeededOnly.}
    //===== Gets
    GListService.prototype.getGroceries = function () {
        return this.http.get(this.URL);
    };
    GListService.prototype.getGroceryDetails = function (id) {
        return this.http.get(this.URL + "/grocerybyid?groceryid=" + id);
    };
    //===== Updates
    GListService.prototype.UpdateStatus = function (grocery, req) {
        var _this = this;
        var id = this.GetUserIdByGroceryId(grocery.ownerid);
        var groceryDto = {
            grocery: grocery,
            userId: id
        };
        console.log(groceryDto);
        this.http
            .post(this.URL + "/request/" + req, groceryDto)
            .subscribe(function (response) {
            _this.snack.open("" + response.statusText, "X", { duration: 2000 });
            _this.UpdateList$.next();
        }, function (e) {
            console.log(e);
            _this.snack.open("Faild to connect to the Server", "X");
        }, function () {
            console.log("Completed");
        }); //subscirbe
    };
    //===== Updatessubscribe
    GListService.prototype.request = function (grocery, req) {
        var id = this.GetUserIdByGroceryId(grocery.ownerid);
        var groceryDto = {
            grocery: grocery,
            userId: id
        };
        console.log("request()");
        console.log(groceryDto);
        return this.http.post(this.URL + "/request/" + req, groceryDto);
    };
    GListService.prototype.isGroceryNameExsits = function (name) {
        return this.http.post(this.URL + "/nameExists/", { value: name });
    };
    GListService.prototype.GuessTimeout = function (id) {
        return this.http.get(this.URL + "/guess/" + id);
    };
    //===== Services
    GListService.prototype.GetUserIdByGroceryId = function (ownerid) {
        if (this.auth.CurrentUser.Id == ownerid) {
            return this.auth.CurrentUser.Id;
        }
        else {
            return ownerid;
        }
    };
    //GET All  from Api
    GListService.prototype.getList = function (HandlLoading, scrollId, ExcuteOnSuccess) {
        var _this = this;
        if (HandlLoading === void 0) { HandlLoading = true; }
        if (scrollId === void 0) { scrollId = ""; }
        if (HandlLoading)
            this.Loading$.next(true);
        this.getGroceries().subscribe(function (response) {
            var GroceryUpdateList = function (MasterGrocery, SlaveGrocery) {
                console.log("Updatng values");
                var _loop_1 = function (i) {
                    var G = SlaveGrocery[i];
                    //filter function
                    IsG = function (g) {
                        return (g.id == G.id &&
                            g.moreInformations.length == G.moreInformations.length &&
                            g.groceryOrBought == G.groceryOrBought &&
                            g.ownerid == G.ownerid);
                    };
                    exsists = MasterGrocery.find(IsG) ? true : false;
                    if (!exsists) {
                        console.log("removed " + i);
                        console.log(SlaveGrocery[i]);
                        SlaveGrocery.splice(i, 1);
                    }
                };
                var IsG, exsists;
                for (var i = 0; i < SlaveGrocery.length; i++) {
                    _loop_1(i);
                } //for
                var _loop_2 = function (i) {
                    var item = MasterGrocery[i];
                    //filter function
                    IsG = function (g) {
                        return (g.id == item.id &&
                            g.moreInformations.length == item.moreInformations.length &&
                            g.groceryOrBought == item.groceryOrBought &&
                            g.ownerid == item.ownerid);
                    };
                    exsists = SlaveGrocery.find(IsG) ? true : false;
                    if (!exsists) {
                        console.log("added " + i);
                        console.log(item);
                        SlaveGrocery.push(item);
                    }
                };
                var IsG, exsists;
                for (var i = 0; i < MasterGrocery.length; i++) {
                    _loop_2(i);
                } //for
            };
            if (response.isSuccessful == false) {
                console.log(response.errors);
                _this.snack.open("Server returned " + response.errors, "X", { duration: 3000 });
                return;
            }
            var groceries = response.value;
            console.log("getGroceries()");
            console.log(response);
            if (!_this.Glist) {
                _this.Glist = groceries;
            }
            else {
                GroceryUpdateList(groceries, _this.Glist);
            }
            //Filter to needed only
            var HoldNeeded = [];
            for (var index = 0; index < groceries.length; index++) {
                var item = groceries[index];
                if (item.groceryOrBought)
                    HoldNeeded.push(item);
            }
            if (!_this.NeededOnly) {
                _this.NeededOnly = HoldNeeded;
            }
            else {
                GroceryUpdateList(HoldNeeded, _this.NeededOnly);
            }
            //Filter to bought only
            var holdBought = [];
            for (var index = 0; index < groceries.length; index++) {
                var item = groceries[index];
                if (!item.groceryOrBought)
                    holdBought.push(item);
            }
            if (!_this.BoughtOnly) {
                _this.BoughtOnly = holdBought;
            }
            else {
                GroceryUpdateList(holdBought, _this.BoughtOnly);
            }
            if (ExcuteOnSuccess)
                ExcuteOnSuccess();
            if (scrollId)
                _this.styler.scrollById(scrollId, 500);
            if (HandlLoading)
                _this.Loading$.next(false);
        }, function (e) {
            if (HandlLoading)
                _this.Loading$.next(false);
            console.log("g-list error");
            console.error(e);
            _this.snack.open("Connection Error, Server Disconnected", "X", {
                duration: 10000
            });
        }, function () {
            console.log("Completed");
        });
    };
    GListService.prototype.clean = function () {
        //(click) Add button
        this.AddFromItem = {
            name: "",
            moreInformations: [{ bought: false, no: 1, typeOfNo: "" }],
            basic: false,
            timeout: 0,
            owner: this.auth.CurrentUser.UserName,
            groceryOrBought: false
        };
        this.formItem.controls.name.setValue("", [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]);
        this.formItem.controls.no.setValue(1, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]);
        this.formItem.controls.type.setValue("");
        this.formItem.controls.basic.setValue(false);
        this.formItem.enable();
        this.formItem.markAsUntouched();
    };
    GListService.prototype.ViewIdByname = function (name) {
        name = name.toLowerCase().replace(/[\s ]/g, "");
        return "card" + name + this.globalRandom;
    };
    GListService.prototype.randomId = function (index, index2) {
        var r = "yXqEyfZDpOLvPWhdcKzqTomGQYXqxutkyGElskQANcxFkDxNYWgIKhr";
        var s = "";
        for (var i = 0; i < 5; i++) {
            s += r.charAt(index + i + index2);
        }
        return s;
    };
    GListService.prototype.randomStr = function (m) {
        var m = m || 9;
        var s = "", r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < m; i++) {
            s += r.charAt(Math.floor(Math.random() * r.length));
        }
        return s;
    };
    return GListService;
}()); //class



/***/ }),

/***/ "./src/app/Services/helpers.service.ts":
/*!*********************************************!*\
  !*** ./src/app/Services/helpers.service.ts ***!
  \*********************************************/
/*! exports provided: HelpersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpersService", function() { return HelpersService; });
var HelpersService = /** @class */ (function () {
    function HelpersService() {
    }
    //->Remove
    //Random String Generator
    HelpersService.prototype.randomString = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    //->list
    HelpersService.prototype.PersentageTimeout = function (timeout) {
        if (timeout <= 0)
            return 0;
        var persentage = (Date.now() / 1000) / timeout;
        return persentage;
    };
    //======General
    HelpersService.prototype.formatDate = function (seconds) {
        var d = new Date(seconds * 1000);
        var dayOfweek;
        if (d.getDay() == 0) {
            dayOfweek = "Sunday";
        }
        if (d.getDay() == 1) {
            dayOfweek = "Monday";
        }
        if (d.getDay() == 2) {
            dayOfweek = "Tuesday";
        }
        if (d.getDay() == 3) {
            dayOfweek = "Wednesday";
        }
        if (d.getDay() == 4) {
            dayOfweek = "Thursday";
        }
        if (d.getDay() == 5) {
            dayOfweek = "Friday";
        }
        if (d.getDay() == 6) {
            dayOfweek = "Saturday";
        }
        var Month;
        if (d.getMonth() == 0) {
            Month = "January";
        }
        if (d.getMonth() == 1) {
            Month = "February ";
        }
        if (d.getMonth() == 2) {
            Month = "March";
        }
        if (d.getMonth() == 3) {
            Month = "April";
        }
        if (d.getMonth() == 4) {
            Month = "May";
        }
        if (d.getMonth() == 5) {
            Month = "June";
        }
        if (d.getMonth() == 6) {
            Month = "July";
        }
        if (d.getMonth() == 7) {
            Month = "August";
        }
        if (d.getMonth() == 8) {
            Month = "September";
        }
        if (d.getMonth() == 9) {
            Month = "October";
        }
        if (d.getMonth() == 10) {
            Month = "November";
        }
        if (d.getMonth() == 11) {
            Month = "December";
        }
        var day = (d.getDate() + 1);
        var myDate = dayOfweek + ", " + Month + " " + day;
        return myDate;
    };
    //Less Usefull
    HelpersService.prototype.SecondsToDate = function (inseconds) {
        var days = Math.floor(inseconds / (60 * 60 * 24));
        var hours = Math.floor((inseconds % (60 * 60 * 24)) / (60 * 60));
        var minutes = Math.floor((inseconds % (60 * 60)) / (60));
        var seconds = Math.floor((inseconds % (60)));
        return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    };
    HelpersService.prototype.SecondsToDaysandHours = function (inseconds) {
        var days = Math.floor(inseconds / (60 * 60 * 24));
        var hours = Math.floor((inseconds % (60 * 60 * 24)) / (60 * 60));
        return days + "d " + hours + "h ";
    };
    HelpersService.prototype.SecondsToString = function (inseconds) {
        var days = Math.floor(inseconds / (60 * 60 * 24));
        var hours = Math.floor((inseconds % (60 * 60 * 24)) / (60 * 60));
        var minutes = Math.floor((inseconds % (60 * 60)) / (60));
        var seconds = Math.floor((inseconds % (60)));
        return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    };
    HelpersService.prototype.DaysToSeconds = function (D) {
        return D * 3600 * 24;
    };
    HelpersService.prototype.SecondsToDays = function (s) {
        if (s < 3600 * 24) {
            if (s < 3600) {
                if (s < 60) {
                    return "" + Math.floor(s) + " secounds !";
                }
                return "" + Math.floor(s / 60) + " Minutes";
            }
            return "" + Math.floor(s / (60 * 60)) + " Hours";
        }
        return "" + Math.floor(s / (3600 * 24)) + " Days";
    };
    HelpersService.prototype.SecodsToDate = function (inseconds) {
        var year = Math.floor(inseconds / 3.154e+7);
        var month = Math.floor(inseconds / 2.628e+6);
        var day = Math.floor(inseconds / (60 * 60 * 24));
        var hour = Math.floor((inseconds % (60 * 60 * 24)) / (60 * 60));
        var minute = Math.floor((inseconds % (60 * 60)) / (60));
        var second = Math.floor((inseconds % (60)));
        if (year > 0)
            return year + " Years";
        if (month > 0)
            return month + " Month";
        if (day > 0)
            return day + " Day";
        if (hour > 0)
            return hour + " Hours, " + minute + " Minutes";
        if (minute > 0)
            return minute + " Minutes, " + second + " Seconds";
        if (second > 0)
            return second + " Seconds";
    };
    return HelpersService;
}()); //class



/***/ }),

/***/ "./src/app/Services/styler.service.ts":
/*!********************************************!*\
  !*** ./src/app/Services/styler.service.ts ***!
  \********************************************/
/*! exports provided: StylerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StylerService", function() { return StylerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var StylerService = /** @class */ (function () {
    function StylerService() {
    }
    StylerService.prototype.scrollById = function (elId, delay) {
        if (delay === void 0) { delay = 100; }
        setTimeout(function () {
            console.log("scrolling to", elId);
            var element = document.getElementById(elId);
            if (element === null)
                return;
            element.scrollIntoView({ behavior: 'smooth' });
        }, delay);
    };
    StylerService.prototype.focusById = function (elId, delay) {
        if (delay === void 0) { delay = 600; }
        setTimeout(function () {
            console.log("focusById", elId);
            var element = document.getElementById(elId);
            if (element === null)
                return;
            element.focus();
        }, delay);
    };
    StylerService.prototype.click = function (elId, delay) {
        if (delay === void 0) { delay = 600; }
        setTimeout(function () {
            console.log("click", elId);
            var element = document.getElementById(elId);
            if (element === null)
                return;
            element.click();
        }, delay);
    };
    StylerService.prototype.CopyToClipboardById = function (containerid) {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                // Chrome
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges) {
                // Firefox
                window.getSelection().removeAllRanges();
            }
        }
        else if (document.selection) {
            // IE?
            document.selection.empty();
        }
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select().createTextRange();
            document.execCommand("copy");
        }
        else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
            document.execCommand("copy");
            //this.snack.open("Copied", "x", { duration: 1000 });
        }
    };
    StylerService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"]({ factory: function StylerService_Factory() { return new StylerService(); }, token: StylerService, providedIn: "root" });
    return StylerService;
}());



/***/ }),

/***/ "./src/app/_auth.collection/_guards/auth.guard.ts":
/*!********************************************************!*\
  !*** ./src/app/_auth.collection/_guards/auth.guard.ts ***!
  \********************************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");





var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (Object.keys(this.auth.CurrentUser).length !== 0) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_2__["defineInjectable"]({ factory: function AuthGuard_Factory() { return new AuthGuard(_angular_core__WEBPACK_IMPORTED_MODULE_2__["inject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["inject"](_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"])); }, token: AuthGuard, providedIn: "root" });
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_auth.collection/_guards/client.guard.ts":
/*!**********************************************************!*\
  !*** ./src/app/_auth.collection/_guards/client.guard.ts ***!
  \**********************************************************/
/*! exports provided: ClientGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientGuard", function() { return ClientGuard; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _services_Roles_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/Roles.service */ "./src/app/_auth.collection/_services/Roles.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");







var ClientGuard = /** @class */ (function () {
    function ClientGuard(router, auth, RolesSrv) {
        this.router = router;
        this.auth = auth;
        this.RolesSrv = RolesSrv;
    }
    ClientGuard.prototype.canActivate = function (route, state) {
        console.log("==UnverifiedGuard==");
        // If logged in check roles
        if (Object.keys(this.auth.CurrentUser).length !== 0) {
            var result = this.RolesSrv.isClient(this.auth.CurrentUser);
            console.log(result);
            if (!result) {
                var unverified = this.RolesSrv.isUnverified(this.auth.CurrentUser);
                if (unverified)
                    this.router.navigate(['/check-email']);
            }
            return result;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    ClientGuard.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_3__["defineInjectable"]({ factory: function ClientGuard_Factory() { return new ClientGuard(_angular_core__WEBPACK_IMPORTED_MODULE_3__["inject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["inject"](_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["inject"](_services_Roles_service__WEBPACK_IMPORTED_MODULE_2__["RolesService"])); }, token: ClientGuard, providedIn: "root" });
    return ClientGuard;
}());



/***/ }),

/***/ "./src/app/_auth.collection/_guards/unverified.guard.ts":
/*!**************************************************************!*\
  !*** ./src/app/_auth.collection/_guards/unverified.guard.ts ***!
  \**************************************************************/
/*! exports provided: UnverifiedGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnverifiedGuard", function() { return UnverifiedGuard; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _services_Roles_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/Roles.service */ "./src/app/_auth.collection/_services/Roles.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");







var UnverifiedGuard = /** @class */ (function () {
    function UnverifiedGuard(router, auth, RolesSrv) {
        this.router = router;
        this.auth = auth;
        this.RolesSrv = RolesSrv;
    }
    UnverifiedGuard.prototype.canActivate = function (route, state) {
        console.log("==UnverifiedGuard==");
        // If logged in check roles
        if (Object.keys(this.auth.CurrentUser).length !== 0) {
            var result = this.RolesSrv.isUnverified(this.auth.CurrentUser);
            console.log(result);
            return result;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    UnverifiedGuard.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_3__["defineInjectable"]({ factory: function UnverifiedGuard_Factory() { return new UnverifiedGuard(_angular_core__WEBPACK_IMPORTED_MODULE_3__["inject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["inject"](_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["inject"](_services_Roles_service__WEBPACK_IMPORTED_MODULE_2__["RolesService"])); }, token: UnverifiedGuard, providedIn: "root" });
    return UnverifiedGuard;
}());



/***/ }),

/***/ "./src/app/_auth.collection/_interceptors/bug.200ok.interpector.ts":
/*!*************************************************************************!*\
  !*** ./src/app/_auth.collection/_interceptors/bug.200ok.interpector.ts ***!
  \*************************************************************************/
/*! exports provided: Bug200ok */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bug200ok", function() { return Bug200ok; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");



var Bug200ok = /** @class */ (function () {
    function Bug200ok() {
    }
    Bug200ok.prototype.intercept = function (req, next) {
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) {
            if (err.status >= 200 && err.status < 300) {
                console.log("Intercepted wrong error");
                var res = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpResponse"]({
                    body: null,
                    headers: err.headers,
                    status: err.status,
                    statusText: err.statusText,
                    url: err.url
                });
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(res);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"].throw(err);
            }
        }));
    };
    return Bug200ok;
}()); //class



/***/ }),

/***/ "./src/app/_auth.collection/_interceptors/error.interceptor.ts":
/*!*********************************************************************!*\
  !*** ./src/app/_auth.collection/_interceptors/error.interceptor.ts ***!
  \*********************************************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");





var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(authenticationService, router, snack) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.snack = snack;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (err) {
            console.log("Error Interceptor");
            console.error(err);
            if (err.status === 401) {
                _this.snack.open("Please Login Or Register", "x", { duration: 3000 });
                // auto logout if 401 response returned from api
                _this.authenticationService.logout();
                _this.router.navigate(['/login']);
                //location.reload(true);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["throwError"])(err);
            }
            //console.log(err);
            //const error =  err.statusText ||err.error.message ; 
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["throwError"])(err);
        }));
        //return next.handle(request)
    };
    return ErrorInterceptor;
}()); //class



/***/ }),

/***/ "./src/app/_auth.collection/_interceptors/jwt.interceptor.ts":
/*!*******************************************************************!*\
  !*** ./src/app/_auth.collection/_interceptors/jwt.interceptor.ts ***!
  \*******************************************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");

var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(auth) {
        this.auth = auth;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        var currentUser = this.auth.CurrentUser; //JSON.parse( localStorage.getItem('currentuser') );
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentUser.token
                }
            });
        }
        return next.handle(request);
    };
    return JwtInterceptor;
}()); //class



/***/ }),

/***/ "./src/app/_auth.collection/_models/user.ts":
/*!**************************************************!*\
  !*** ./src/app/_auth.collection/_models/user.ts ***!
  \**************************************************/
/*! exports provided: UserDto, UserFriend, FriendRequestDto, UpdatePasswordDto, LoginUserDto, MyRoles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDto", function() { return UserDto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserFriend", function() { return UserFriend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FriendRequestDto", function() { return FriendRequestDto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatePasswordDto", function() { return UpdatePasswordDto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginUserDto", function() { return LoginUserDto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyRoles", function() { return MyRoles; });
/*export interface UserDtoResponses
{
    Id: string;
    firstame: string;
    lastname: string;
    username: string;
    email: string;

    password: string;
    token: string;

    userFriends: UserFriend[];
    invitationcode: string;
}
*/
var UserDto = /** @class */ (function () {
    function UserDto() {
    }
    return UserDto;
}());

var UserFriend = /** @class */ (function () {
    function UserFriend() {
    }
    return UserFriend;
}());

var FriendRequestDto = /** @class */ (function () {
    function FriendRequestDto() {
    }
    return FriendRequestDto;
}());

var UpdatePasswordDto = /** @class */ (function () {
    function UpdatePasswordDto() {
    }
    return UpdatePasswordDto;
}());

var LoginUserDto = /** @class */ (function () {
    function LoginUserDto() {
    }
    return LoginUserDto;
}());

var MyRoles;
(function (MyRoles) {
    MyRoles["admin"] = "admin";
    MyRoles["manager"] = "manager";
    MyRoles["client"] = "client";
    MyRoles["restricted"] = "restricted";
    MyRoles["unverfied"] = "unverfied";
})(MyRoles || (MyRoles = {}));


/***/ }),

/***/ "./src/app/_auth.collection/_services/Roles.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/_auth.collection/_services/Roles.service.ts ***!
  \*************************************************************/
/*! exports provided: RolesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesService", function() { return RolesService; });
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_models/user */ "./src/app/_auth.collection/_models/user.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var RolesService = /** @class */ (function () {
    function RolesService() {
    }
    RolesService.prototype.isUnverified = function (user, allowManagers) {
        if (allowManagers === void 0) { allowManagers = true; }
        var role = user.role;
        if (allowManagers) {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].admin ||
                role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].manager ||
                role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].unverfied;
            return result;
        }
        else {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].unverfied;
            return result;
        }
    };
    RolesService.prototype.isClient = function (user, allowManagers) {
        if (allowManagers === void 0) { allowManagers = true; }
        var role = user.role;
        if (allowManagers) {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].admin ||
                role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].manager ||
                role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].client;
            return result;
        }
        else {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].client;
            return result;
        }
    };
    RolesService.prototype.isRestricted = function (user, allowManagers) {
        if (allowManagers === void 0) { allowManagers = true; }
        var role = user.role;
        if (allowManagers) {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].admin ||
                role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].manager ||
                role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].restricted;
            return result;
        }
        else {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].restricted;
            return result;
        }
    };
    RolesService.prototype.isAdmin = function (user) {
        var result = user.role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].client;
        return result;
    };
    RolesService.prototype.isManager = function (user, allowManagers) {
        if (allowManagers === void 0) { allowManagers = true; }
        var role = user.role;
        if (allowManagers) {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].admin ||
                role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].manager;
            return result;
        }
        else {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].manager;
            return result;
        }
    };
    RolesService.prototype.hasRole = function (user, role, allowManagers) {
        if (allowManagers === void 0) { allowManagers = true; }
        if (allowManagers) {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].admin ||
                role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].manager ||
                role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].unverfied;
            return result;
        }
        else {
            var result = role === _models_user__WEBPACK_IMPORTED_MODULE_0__["MyRoles"].unverfied;
            return result;
        }
    };
    RolesService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"]({ factory: function RolesService_Factory() { return new RolesService(); }, token: RolesService, providedIn: "root" });
    return RolesService;
}()); //class



/***/ }),

/***/ "./src/app/_auth.collection/_services/alert.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/_auth.collection/_services/alert.service.ts ***!
  \*************************************************************/
/*! exports provided: AlertService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertService", function() { return AlertService; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");




var AlertService = /** @class */ (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.keepAfterNavigationChange = false;
        // clear alert message on route change
        router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__["NavigationStart"]) {
                if (_this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    // clear alert
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: "success", text: message });
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: "error", text: message });
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AlertService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_2__["defineInjectable"]({ factory: function AlertService_Factory() { return new AlertService(_angular_core__WEBPACK_IMPORTED_MODULE_2__["inject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"])); }, token: AlertService, providedIn: "root" });
    return AlertService;
}());



/***/ }),

/***/ "./src/app/_auth.collection/_services/authentication.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/_auth.collection/_services/authentication.service.ts ***!
  \**********************************************************************/
/*! exports provided: _BASEURL, AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_BASEURL", function() { return _BASEURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _statics_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../statics/config */ "./src/app/statics/config.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_models/user */ "./src/app/_auth.collection/_models/user.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


//Import Config





var _BASEURL = _statics_config__WEBPACK_IMPORTED_MODULE_2__["_BaseUrl"];
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        var _this = this;
        this.http = http;
        this.CurrentUser = new _models_user__WEBPACK_IMPORTED_MODULE_4__["UserDto"]();
        this.user$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.BASEURL = _BASEURL;
        this.user$.subscribe(function (u) {
            _this.CurrentUser = u;
        });
        this.updateCurrentUser();
    } //constructor
    AuthenticationService.prototype.updateCurrentUser = function (sendevent, user) {
        if (sendevent === void 0) { sendevent = true; }
        if (user === void 0) { user = null; }
        console.log("updateCurrentUser()");
        var storageUser = JSON.parse(localStorage.getItem('currentuser'));
        if (user) {
            localStorage.setItem('currentuser', JSON.stringify(user));
            storageUser = JSON.parse(localStorage.getItem('currentuser'));
            console.log("user");
            console.log(storageUser);
        }
        if (storageUser && storageUser.token) {
            this.CurrentUser = storageUser;
            console.log("storageUser && storageUser.token");
            console.log(this.CurrentUser);
            if (sendevent)
                this.user$.next(storageUser);
        }
    };
    AuthenticationService.prototype.updateCurrentUserFromServer = function () {
        var _this = this;
        if (Object.keys(this.CurrentUser).length === 0) {
            console.error("User Dto is null in service");
            console.log(this.CurrentUser);
            return null;
        }
        return this.ReAuthenticate().subscribe(function (r) {
            console.log(r);
            if (r.isSuccessful) {
                _this.updateCurrentUser(true, r.value);
            }
        }, function (e) {
            console.log(e);
        });
    };
    AuthenticationService.prototype.login = function (usernameOrEmail, password) {
        var _this = this;
        var LoginInfo = { password: password, usernameOrEmail: usernameOrEmail };
        return this.http.post(this.BASEURL + "/api//users/login", LoginInfo)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (response) {
            var user = response.value;
            if (user && user.token) {
                localStorage.setItem('currentuser', JSON.stringify(user));
                _this.user$.next(user);
            }
            return response;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('currentuser');
    };
    AuthenticationService.prototype.ReAuthenticate = function () {
        return this.http.get(this.BASEURL + "/api/users/GetUserId");
    };
    AuthenticationService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_5__["defineInjectable"]({ factory: function AuthenticationService_Factory() { return new AuthenticationService(_angular_core__WEBPACK_IMPORTED_MODULE_5__["inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); }, token: AuthenticationService, providedIn: "root" });
    return AuthenticationService;
}()); //class



/***/ }),

/***/ "./src/app/_auth.collection/_services/user.service.ts":
/*!************************************************************!*\
  !*** ./src/app/_auth.collection/_services/user.service.ts ***!
  \************************************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");




var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.BASEURL = _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["_BASEURL"];
    }
    UserService.prototype.GetAll = function () {
        return this.http.get(this.BASEURL + "/api/users");
    };
    UserService.prototype.GetById = function () {
        return this.http.get(this.BASEURL + "/api/users/GetUserId");
    };
    UserService.prototype.Update = function (user) {
        return this.http.put(this.BASEURL + "/api/users/editUser", user);
    };
    UserService.prototype.ChangePassword = function (passDto) {
        return this.http.put(this.BASEURL + "/api/users/changepassword", passDto);
    };
    UserService.prototype.Delete = function (id) {
        return this.http.delete(this.BASEURL + "/api/users/deleteuser/" + id);
    };
    UserService.prototype.Register = function (user) {
        return this.http.post(this.BASEURL + "/api/users/register", user);
    };
    UserService.prototype.GenerateInvitaionCode = function () {
        return this.http.get(this.BASEURL + "/api/users/generateinvitation");
    };
    UserService.prototype.ConfirmEmailAccount = function (Id, vercode) {
        var params = "Id=" + Id + "&verCode=" + vercode;
        return this.http.get(this.BASEURL + "/api/verification/verifyemail?" + params);
    };
    UserService.prototype.SendEmailVerification = function (Id) {
        var params = "Id=" + Id;
        return this.http.get(this.BASEURL + "/api/verification/sendverifyemail?" + params);
    };
    UserService.prototype.AddFriend = function (FriendRequestDto) {
        return this.http.post(this.BASEURL + "/api/users/addfriend", FriendRequestDto);
    };
    UserService.prototype.DeleteFriendship = function (FriendRequestDto) {
        return this.http.post(this.BASEURL + "/api/users/deletefriendship", FriendRequestDto);
    };
    UserService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_2__["defineInjectable"]({ factory: function UserService_Factory() { return new UserService(_angular_core__WEBPACK_IMPORTED_MODULE_2__["inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); }, token: UserService, providedIn: "root" });
    return UserService;
}()); //class



/***/ }),

/***/ "./src/app/_auth.collection/index.ts":
/*!*******************************************!*\
  !*** ./src/app/_auth.collection/index.ts ***!
  \*******************************************/
/*! exports provided: UserService, _BASEURL, AuthenticationService, ErrorInterceptor, JwtInterceptor, UnverifiedGuard, ClientGuard, AuthGuard, UserDto, UserFriend, FriendRequestDto, UpdatePasswordDto, LoginUserDto, MyRoles, MyAuthModule, AlertService, Bug200ok */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_services/alert.service */ "./src/app/_auth.collection/_services/alert.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlertService", function() { return _services_alert_service__WEBPACK_IMPORTED_MODULE_0__["AlertService"]; });

/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/user.service */ "./src/app/_auth.collection/_services/user.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return _services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]; });

/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "_BASEURL", function() { return _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["_BASEURL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]; });

/* harmony import */ var _interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_interceptors/error.interceptor */ "./src/app/_auth.collection/_interceptors/error.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return _interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_3__["ErrorInterceptor"]; });

/* harmony import */ var _interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_interceptors/jwt.interceptor */ "./src/app/_auth.collection/_interceptors/jwt.interceptor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return _interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_4__["JwtInterceptor"]; });

/* harmony import */ var _guards_unverified_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_guards/unverified.guard */ "./src/app/_auth.collection/_guards/unverified.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnverifiedGuard", function() { return _guards_unverified_guard__WEBPACK_IMPORTED_MODULE_5__["UnverifiedGuard"]; });

/* harmony import */ var _guards_client_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_guards/client.guard */ "./src/app/_auth.collection/_guards/client.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientGuard", function() { return _guards_client_guard__WEBPACK_IMPORTED_MODULE_6__["ClientGuard"]; });

/* harmony import */ var _interceptors_bug_200ok_interpector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_interceptors/bug.200ok.interpector */ "./src/app/_auth.collection/_interceptors/bug.200ok.interpector.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bug200ok", function() { return _interceptors_bug_200ok_interpector__WEBPACK_IMPORTED_MODULE_7__["Bug200ok"]; });

/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_auth.collection/_guards/auth.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _guards_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]; });

/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_models/user */ "./src/app/_auth.collection/_models/user.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDto", function() { return _models_user__WEBPACK_IMPORTED_MODULE_9__["UserDto"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserFriend", function() { return _models_user__WEBPACK_IMPORTED_MODULE_9__["UserFriend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FriendRequestDto", function() { return _models_user__WEBPACK_IMPORTED_MODULE_9__["FriendRequestDto"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UpdatePasswordDto", function() { return _models_user__WEBPACK_IMPORTED_MODULE_9__["UpdatePasswordDto"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginUserDto", function() { return _models_user__WEBPACK_IMPORTED_MODULE_9__["LoginUserDto"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MyRoles", function() { return _models_user__WEBPACK_IMPORTED_MODULE_9__["MyRoles"]; });

/* harmony import */ var _my_auth_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./my.auth.module */ "./src/app/_auth.collection/my.auth.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MyAuthModule", function() { return _my_auth_module__WEBPACK_IMPORTED_MODULE_10__["MyAuthModule"]; });

//Services



//Inteceptors





//Guard

//Models




/***/ }),

/***/ "./src/app/_auth.collection/my.auth.module.ts":
/*!****************************************************!*\
  !*** ./src/app/_auth.collection/my.auth.module.ts ***!
  \****************************************************/
/*! exports provided: MyAuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAuthModule", function() { return MyAuthModule; });
//import {  AlertService } from './_services/alert.service';
//import {  AuthenticationService } from './_services/authentication.service';
//import {  UserService } from './_services/user.service';
var MyAuthModule = /** @class */ (function () {
    function MyAuthModule() {
    }
    return MyAuthModule;
}());



/***/ }),

/***/ "./src/app/app.component.ngfactory.js":
/*!********************************************!*\
  !*** ./src/app/app.component.ngfactory.js ***!
  \********************************************/
/*! exports provided: RenderType_AppComponent, View_AppComponent_0, View_AppComponent_Host_0, AppComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AppComponent", function() { return RenderType_AppComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AppComponent_0", function() { return View_AppComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AppComponent_Host_0", function() { return View_AppComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponentNgFactory", function() { return AppComponentNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _components_topnav_topnav_component_ngfactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/topnav/topnav.component.ngfactory */ "./src/app/components/topnav/topnav.component.ngfactory.js");
/* harmony import */ var _components_topnav_topnav_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/topnav/topnav.component */ "./src/app/components/topnav/topnav.component.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 







var styles_AppComponent = [];
var RenderType_AppComponent = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({ encapsulation: 2, styles: styles_AppComponent, data: {} });

function View_AppComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 4, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](1, 0, null, null, 1, "app-topnav", [], null, null, null, _components_topnav_topnav_component_ngfactory__WEBPACK_IMPORTED_MODULE_1__["View_TopnavComponent_0"], _components_topnav_topnav_component_ngfactory__WEBPACK_IMPORTED_MODULE_1__["RenderType_TopnavComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](2, 114688, null, 0, _components_topnav_topnav_component__WEBPACK_IMPORTED_MODULE_2__["TopnavComponent"], [_auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"], _Services_g_list_service__WEBPACK_IMPORTED_MODULE_4__["GListService"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](3, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](4, 212992, null, 0, _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterOutlet"], [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ChildrenOutletContexts"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], [8, null], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]], null, null)], function (_ck, _v) { _ck(_v, 2, 0); _ck(_v, 4, 0); }, null); }
function View_AppComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 49152, null, 0, _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"], [], null, null)], null, null); }
var AppComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("app-root", _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"], View_AppComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ngfactory.js":
/*!*****************************************!*\
  !*** ./src/app/app.module.ngfactory.js ***!
  \*****************************************/
/*! exports provided: AppModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModuleNgFactory", function() { return AppModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.module */ "./src/app/app.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_snack_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/@angular/material/snack-bar/typings/index.ngfactory */ "./node_modules/@angular/material/snack-bar/typings/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_tooltip_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../node_modules/@angular/material/tooltip/typings/index.ngfactory */ "./node_modules/@angular/material/tooltip/typings/index.ngfactory.js");
/* harmony import */ var _components_list_list_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/list/list.component.ngfactory */ "./src/app/components/list/list.component.ngfactory.js");
/* harmony import */ var _components_account_components_manage_account_manage_account_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/account-components/manage-account/manage-account.component.ngfactory */ "./src/app/components/account-components/manage-account/manage-account.component.ngfactory.js");
/* harmony import */ var _registration_check_emails_registration_check_emails_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./registration-check-emails/registration-check-emails.component.ngfactory */ "./src/app/registration-check-emails/registration-check-emails.component.ngfactory.js");
/* harmony import */ var _email_verification_email_verification_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./email-verification/email-verification.component.ngfactory */ "./src/app/email-verification/email-verification.component.ngfactory.js");
/* harmony import */ var _components_account_components_login_login_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/account-components/login/login.component.ngfactory */ "./src/app/components/account-components/login/login.component.ngfactory.js");
/* harmony import */ var _components_account_components_register_register_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/account-components/register/register.component.ngfactory */ "./src/app/components/account-components/register/register.component.ngfactory.js");
/* harmony import */ var _app_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.component.ngfactory */ "./src/app/app.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_animations_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/animations/browser */ "./node_modules/@angular/animations/fesm5/browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_collection_interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./_auth.collection/_interceptors/jwt.interceptor */ "./src/app/_auth.collection/_interceptors/jwt.interceptor.ts");
/* harmony import */ var _auth_collection_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./_auth.collection/_interceptors/error.interceptor */ "./src/app/_auth.collection/_interceptors/error.interceptor.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _auth_collection_guards_auth_guard__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./_auth.collection/_guards/auth.guard */ "./src/app/_auth.collection/_guards/auth.guard.ts");
/* harmony import */ var _auth_collection_guards_unverified_guard__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./_auth.collection/_guards/unverified.guard */ "./src/app/_auth.collection/_guards/unverified.guard.ts");
/* harmony import */ var _auth_collection_services_Roles_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./_auth.collection/_services/Roles.service */ "./src/app/_auth.collection/_services/Roles.service.ts");
/* harmony import */ var _auth_collection_guards_client_guard__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./_auth.collection/_guards/client.guard */ "./src/app/_auth.collection/_guards/client.guard.ts");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/cdk/observers */ "./node_modules/@angular/cdk/esm5/observers.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _Services_styler_service__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./Services/styler.service */ "./src/app/Services/styler.service.ts");
/* harmony import */ var _Services_helpers_service__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./Services/helpers.service */ "./src/app/Services/helpers.service.ts");
/* harmony import */ var _Services_frormat_service__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./Services/frormat.service */ "./src/app/Services/frormat.service.ts");
/* harmony import */ var _components_list_list_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./components/list/list.component */ "./src/app/components/list/list.component.ts");
/* harmony import */ var _components_account_components_manage_account_manage_account_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./components/account-components/manage-account/manage-account.component */ "./src/app/components/account-components/manage-account/manage-account.component.ts");
/* harmony import */ var _registration_check_emails_registration_check_emails_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./registration-check-emails/registration-check-emails.component */ "./src/app/registration-check-emails/registration-check-emails.component.ts");
/* harmony import */ var _email_verification_email_verification_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./email-verification/email-verification.component */ "./src/app/email-verification/email-verification.component.ts");
/* harmony import */ var _components_account_components_login_login_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./components/account-components/login/login.component */ "./src/app/components/account-components/login/login.component.ts");
/* harmony import */ var _components_account_components_register_register_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./components/account-components/register/register.component */ "./src/app/components/account-components/register/register.component.ts");
/* harmony import */ var _auth_collection_my_auth_module__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./_auth.collection/my.auth.module */ "./src/app/_auth.collection/my.auth.module.ts");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm5/slider.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm5/portal.es5.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/esm5/divider.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! @angular/cdk/accordion */ "./node_modules/@angular/cdk/esm5/accordion.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




































































var AppModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"], [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__["ɵEmptyOutletComponentNgFactory"], _node_modules_angular_material_snack_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["MatSnackBarContainerNgFactory"], _node_modules_angular_material_snack_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["SimpleSnackBarNgFactory"], _node_modules_angular_material_tooltip_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["TooltipComponentNgFactory"], _components_list_list_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["ListComponentNgFactory"], _components_account_components_manage_account_manage_account_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["ManageAccountComponentNgFactory"], _registration_check_emails_registration_check_emails_component_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RegistrationCheckEmailsComponentNgFactory"], _email_verification_email_verification_component_ngfactory__WEBPACK_IMPORTED_MODULE_9__["EmailVerificationComponentNgFactory"], _components_account_components_login_login_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["LoginComponentNgFactory"], _components_account_components_register_register_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__["RegisterComponentNgFactory"], _app_component_ngfactory__WEBPACK_IMPORTED_MODULE_12__["AppComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_k"], [[3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_ID"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_f"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_i"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_j"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["DomSanitizer"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵDomSanitizerImpl"], [_angular_common__WEBPACK_IMPORTED_MODULE_13__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_core__WEBPACK_IMPORTED_MODULE_0__["Sanitizer"], null, [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["DomSanitizer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["HAMMER_GESTURE_CONFIG"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["GestureConfig"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MAT_HAMMER_OPTIONS"]], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatCommonModule"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["EVENT_MANAGER_PLUGINS"], function (p0_0, p0_1, p0_2, p1_0, p2_0, p2_1, p2_2, p2_3) { return [new _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵDomEventsPlugin"](p0_0, p0_1, p0_2), new _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵKeyEventsPlugin"](p1_0), new _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵHammerGesturesPlugin"](p2_0, p2_1, p2_2, p2_3)]; }, [_angular_common__WEBPACK_IMPORTED_MODULE_13__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["DOCUMENT"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["DOCUMENT"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["HAMMER_GESTURE_CONFIG"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵConsole"], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["EventManager"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["EventManager"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["EVENT_MANAGER_PLUGINS"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵDomSharedStylesHost"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵDomSharedStylesHost"], [_angular_common__WEBPACK_IMPORTED_MODULE_13__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵDomRendererFactory2"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵDomRendererFactory2"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["EventManager"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵDomSharedStylesHost"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_animations_browser__WEBPACK_IMPORTED_MODULE_16__["AnimationDriver"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_platform_browser_animations_animations_b"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_animations_browser__WEBPACK_IMPORTED_MODULE_16__["ɵAnimationStyleNormalizer"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_platform_browser_animations_animations_c"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_animations_browser__WEBPACK_IMPORTED_MODULE_16__["ɵAnimationEngine"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_platform_browser_animations_animations_a"], [_angular_common__WEBPACK_IMPORTED_MODULE_13__["DOCUMENT"], _angular_animations_browser__WEBPACK_IMPORTED_MODULE_16__["AnimationDriver"], _angular_animations_browser__WEBPACK_IMPORTED_MODULE_16__["ɵAnimationStyleNormalizer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_platform_browser_animations_animations_d"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵDomRendererFactory2"], _angular_animations_browser__WEBPACK_IMPORTED_MODULE_16__["ɵAnimationEngine"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵSharedStylesHost"], null, [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵDomSharedStylesHost"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_core__WEBPACK_IMPORTED_MODULE_0__["Testability"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Testability"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_animations__WEBPACK_IMPORTED_MODULE_18__["AnimationBuilder"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["ɵBrowserAnimationBuilder"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_19__["ɵangular_packages_forms_forms_i"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["ɵangular_packages_forms_forms_i"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpXsrfTokenExtractor"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_g"], [_angular_common__WEBPACK_IMPORTED_MODULE_13__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_e"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_h"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_h"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpXsrfTokenExtractor"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_f"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HTTP_INTERCEPTORS"], function (p0_0, p1_0, p2_0, p2_1, p2_2) { return [p0_0, new _auth_collection_interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_21__["JwtInterceptor"](p1_0), new _auth_collection_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_22__["ErrorInterceptor"](p2_0, p2_1, p2_2)]; }, [_angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_h"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_23__["AuthenticationService"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_23__["AuthenticationService"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_25__["MatSnackBar"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_d"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["XhrFactory"], null, [_angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_d"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpXhrBackend"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpXhrBackend"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_20__["XhrFactory"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpBackend"], null, [_angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpXhrBackend"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpHandler"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵHttpInterceptingHandler"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpBackend"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpClient"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpClient"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpHandler"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _auth_collection_guards_auth_guard__WEBPACK_IMPORTED_MODULE_26__["AuthGuard"], _auth_collection_guards_auth_guard__WEBPACK_IMPORTED_MODULE_26__["AuthGuard"], [_angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_23__["AuthenticationService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _auth_collection_guards_unverified_guard__WEBPACK_IMPORTED_MODULE_27__["UnverifiedGuard"], _auth_collection_guards_unverified_guard__WEBPACK_IMPORTED_MODULE_27__["UnverifiedGuard"], [_angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_23__["AuthenticationService"], _auth_collection_services_Roles_service__WEBPACK_IMPORTED_MODULE_28__["RolesService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _auth_collection_guards_client_guard__WEBPACK_IMPORTED_MODULE_29__["ClientGuard"], _auth_collection_guards_client_guard__WEBPACK_IMPORTED_MODULE_29__["ClientGuard"], [_angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_23__["AuthenticationService"], _auth_collection_services_Roles_service__WEBPACK_IMPORTED_MODULE_28__["RolesService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_19__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_30__["MutationObserverFactory"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_30__["MutationObserverFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["ErrorStateMatcher"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["ErrorStateMatcher"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["Overlay"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["Overlay"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["ScrollStrategyOptions"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["OverlayContainer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["OverlayPositionBuilder"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["OverlayKeyboardDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["DOCUMENT"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_32__["Directionality"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["ɵc"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["ɵd"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__["MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__["MAT_MENU_SCROLL_STRATEGY"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__["ɵd23"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_35__["MAT_TOOLTIP_SCROLL_STRATEGY"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_35__["MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_router__WEBPACK_IMPORTED_MODULE_24__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_g"], [_angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_router__WEBPACK_IMPORTED_MODULE_24__["NoPreloading"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["NoPreloading"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_router__WEBPACK_IMPORTED_MODULE_24__["PreloadingStrategy"], null, [_angular_router__WEBPACK_IMPORTED_MODULE_24__["NoPreloading"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_router__WEBPACK_IMPORTED_MODULE_24__["RouterPreloader"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["RouterPreloader"], [_angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleFactoryLoader"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["PreloadingStrategy"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_router__WEBPACK_IMPORTED_MODULE_24__["PreloadAllModules"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["PreloadAllModules"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_n"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_c"], [_angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["ViewportScroller"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ROUTER_CONFIGURATION"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_router__WEBPACK_IMPORTED_MODULE_24__["ROUTER_INITIALIZER"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_j"], [_angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_h"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_BOOTSTRAP_LISTENER"], function (p0_0) { return [p0_0]; }, [_angular_router__WEBPACK_IMPORTED_MODULE_24__["ROUTER_INITIALIZER"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _Services_g_list_service__WEBPACK_IMPORTED_MODULE_36__["GListService"], _Services_g_list_service__WEBPACK_IMPORTED_MODULE_36__["GListService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpClient"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_25__["MatSnackBar"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_23__["AuthenticationService"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["FormBuilder"], _Services_styler_service__WEBPACK_IMPORTED_MODULE_37__["StylerService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _Services_helpers_service__WEBPACK_IMPORTED_MODULE_38__["HelpersService"], _Services_helpers_service__WEBPACK_IMPORTED_MODULE_38__["HelpersService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _Services_frormat_service__WEBPACK_IMPORTED_MODULE_39__["FormatService"], _Services_frormat_service__WEBPACK_IMPORTED_MODULE_39__["FormatService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_13__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ErrorHandler"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵangular_packages_platform_browser_platform_browser_a"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgProbeToken"], function () { return [_angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_b"]()]; }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_h"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_h"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"], function (p0_0, p1_0) { return [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["ɵangular_packages_platform_browser_platform_browser_j"](p0_0), _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_i"](p1_0)]; }, [[2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgProbeToken"]], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_h"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationInitStatus"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationInitStatus"], [[2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](131584, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵConsole"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ErrorHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationInitStatus"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationModule"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationModule"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["BrowserModule"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["BrowserModule"], [[3, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__["BrowserModule"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["BrowserAnimationsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["BrowserAnimationsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_19__["ɵangular_packages_forms_forms_bb"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["ɵangular_packages_forms_forms_bb"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_19__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpClientXsrfModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpClientXsrfModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpClientModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["HttpClientModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_a"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_e"], [[3, _angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_router__WEBPACK_IMPORTED_MODULE_24__["UrlSerializer"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["DefaultUrlSerializer"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_router__WEBPACK_IMPORTED_MODULE_24__["ChildrenOutletContexts"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ChildrenOutletContexts"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_router__WEBPACK_IMPORTED_MODULE_24__["ROUTER_CONFIGURATION"], {}, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_common__WEBPACK_IMPORTED_MODULE_13__["LocationStrategy"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_d"], [_angular_common__WEBPACK_IMPORTED_MODULE_13__["PlatformLocation"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_13__["APP_BASE_HREF"]], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ROUTER_CONFIGURATION"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"], [_angular_common__WEBPACK_IMPORTED_MODULE_13__["LocationStrategy"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleFactoryLoader"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["SystemJsNgModuleLoader"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], [2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["SystemJsNgModuleLoaderConfig"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_24__["ROUTES"], function () { return [[{ path: "", component: _components_list_list_component__WEBPACK_IMPORTED_MODULE_40__["ListComponent"], canActivate: [_auth_collection_guards_client_guard__WEBPACK_IMPORTED_MODULE_29__["ClientGuard"]] }, { path: "account", component: _components_account_components_manage_account_manage_account_component__WEBPACK_IMPORTED_MODULE_41__["ManageAccountComponent"], canActivate: [_auth_collection_guards_auth_guard__WEBPACK_IMPORTED_MODULE_26__["AuthGuard"]] }, { path: "check-email", component: _registration_check_emails_registration_check_emails_component__WEBPACK_IMPORTED_MODULE_42__["RegistrationCheckEmailsComponent"], canActivate: [_auth_collection_guards_unverified_guard__WEBPACK_IMPORTED_MODULE_27__["UnverifiedGuard"]] }, { path: "verify-email", component: _email_verification_email_verification_component__WEBPACK_IMPORTED_MODULE_43__["EmailVerificationComponent"], canActivate: [_auth_collection_guards_unverified_guard__WEBPACK_IMPORTED_MODULE_27__["UnverifiedGuard"]] }, { path: "login", component: _components_account_components_login_login_component__WEBPACK_IMPORTED_MODULE_44__["LoginComponent"] }, { path: "register", component: _components_account_components_register_register_component__WEBPACK_IMPORTED_MODULE_45__["RegisterComponent"] }]]; }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_f"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["UrlSerializer"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ChildrenOutletContexts"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleFactoryLoader"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ROUTES"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["ROUTER_CONFIGURATION"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_24__["UrlHandlingStrategy"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_24__["RouteReuseStrategy"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_24__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_24__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_24__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_24__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _auth_collection_my_auth_module__WEBPACK_IMPORTED_MODULE_46__["MyAuthModule"], _auth_collection_my_auth_module__WEBPACK_IMPORTED_MODULE_46__["MyAuthModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_19__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_32__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_32__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MATERIAL_SANITY_CHECKS"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_47__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_47__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button__WEBPACK_IMPORTED_MODULE_48__["MatButtonModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_48__["MatButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_30__["ObserversModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_30__["ObserversModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_49__["MatCheckboxModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_49__["MatCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_50__["MatButtonToggleModule"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_50__["MatButtonToggleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_51__["TextFieldModule"], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_51__["TextFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_52__["MatFormFieldModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_52__["MatFormFieldModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_input__WEBPACK_IMPORTED_MODULE_53__["MatInputModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_53__["MatInputModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_slider__WEBPACK_IMPORTED_MODULE_54__["MatSliderModule"], _angular_material_slider__WEBPACK_IMPORTED_MODULE_54__["MatSliderModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_card__WEBPACK_IMPORTED_MODULE_55__["MatCardModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_55__["MatCardModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_56__["MatProgressBarModule"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_56__["MatProgressBarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_57__["MatToolbarModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_57__["MatToolbarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatPseudoCheckboxModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatPseudoCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatOptionModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatOptionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_58__["PortalModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_58__["PortalModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_59__["ScrollDispatchModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_59__["ScrollDispatchModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["OverlayModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_31__["OverlayModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__["MatAutocompleteModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_33__["MatAutocompleteModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_60__["MatSlideToggleModule"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_60__["MatSlideToggleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_25__["MatSnackBarModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_25__["MatSnackBarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_divider__WEBPACK_IMPORTED_MODULE_61__["MatDividerModule"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_61__["MatDividerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__["MatMenuModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_34__["MatMenuModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_icon__WEBPACK_IMPORTED_MODULE_62__["MatIconModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_62__["MatIconModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_63__["CdkAccordionModule"], _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_63__["CdkAccordionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_64__["MatExpansionModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_64__["MatExpansionModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatLineModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatLineModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_list__WEBPACK_IMPORTED_MODULE_65__["MatListModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_65__["MatListModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_66__["A11yModule"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_66__["A11yModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_35__["MatTooltipModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_35__["MatTooltipModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_67__["MatSidenavModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_67__["MatSidenavModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"], _app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵAPP_ROOT"], true, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["ANIMATION_MODULE_TYPE"], "BrowserAnimations", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_e"], "XSRF-TOKEN", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_common_http__WEBPACK_IMPORTED_MODULE_20__["ɵangular_packages_common_http_http_f"], "X-XSRF-TOKEN", [])]); });



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/account-components/edit-user/edit-user.component.css.shim.ngstyle.js":
/*!*************************************************************************************************!*\
  !*** ./src/app/components/account-components/edit-user/edit-user.component.css.shim.ngstyle.js ***!
  \*************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/components/account-components/edit-user/edit-user.component.ngfactory.js":
/*!******************************************************************************************!*\
  !*** ./src/app/components/account-components/edit-user/edit-user.component.ngfactory.js ***!
  \******************************************************************************************/
/*! exports provided: RenderType_EditUserComponent, View_EditUserComponent_0, View_EditUserComponent_Host_0, EditUserComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_EditUserComponent", function() { return RenderType_EditUserComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_EditUserComponent_0", function() { return View_EditUserComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_EditUserComponent_Host_0", function() { return View_EditUserComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditUserComponentNgFactory", function() { return EditUserComponentNgFactory; });
/* harmony import */ var _edit_user_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-user.component.css.shim.ngstyle */ "./src/app/components/account-components/edit-user/edit-user.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */ "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/card/typings/index.ngfactory */ "./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/divider/typings/index.ngfactory */ "./node_modules/@angular/material/divider/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/esm5/divider.es5.js");
/* harmony import */ var _edit_user_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./edit-user.component */ "./src/app/components/account-components/edit-user/edit-user.component.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../_auth.collection/_services/user.service */ "./src/app/_auth.collection/_services/user.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 























var styles_EditUserComponent = [_edit_user_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_EditUserComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_EditUserComponent, data: {} });

function View_EditUserComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "button", [["mat-icon-button", ""], ["matSuffix", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.enableControl(_co.f["firstname"]) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, [[21, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatSuffix"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 0, "i", [["class", "fas fa-edit"]], null, null, null, null, null))], null, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_EditUserComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "button", [["mat-icon-button", ""], ["matSuffix", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.enableControl(_co.f["lastname"]) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, [[28, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatSuffix"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 0, "i", [["class", "fas fa-edit"]], null, null, null, null, null))], null, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_EditUserComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[32, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_EditUserComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 18, "mat-form-field", [["class", "spacing col-sm-3 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 29, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 30, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 31, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 32, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 33, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 34, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 35, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "oldpassword"], ["matInput", ""], ["placeholder", "Your Password"], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_13__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[29, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_EditUserComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_37 = "oldpassword"; _ck(_v, 12, 0, currVal_37); var currVal_38 = "Your Password"; var currVal_39 = "password"; _ck(_v, 15, 0, currVal_38, currVal_39); var currVal_40 = _co.userForm.get("oldpassword").hasError("required"); _ck(_v, 18, 0, currVal_40); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).appearance == "standard"); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).appearance == "fill"); var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).appearance == "outline"); var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).appearance == "legacy"); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._control.errorState; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._canLabelFloat; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldLabelFloat(); var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._hideControlPlaceholder(); var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._control.disabled; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._control.autofilled; var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._control.focused; var currVal_11 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).color == "accent"); var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).color == "warn"); var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("untouched"); var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("touched"); var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("pristine"); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("dirty"); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("valid"); var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("invalid"); var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._shouldForward("pending"); var currVal_20 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationsEnabled; _ck(_v, 0, 1, [currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20]); var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).ngClassUntouched; var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).ngClassTouched; var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).ngClassPristine; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).ngClassDirty; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).ngClassValid; var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).ngClassInvalid; var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).ngClassPending; var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._isServer; var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).id; var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).placeholder; var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).disabled; var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).required; var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).readonly; var currVal_34 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._ariaDescribedby || null); var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).errorState; var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).required.toString(); _ck(_v, 9, 1, [currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36]); }); }
function View_EditUserComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "button", [["mat-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.resetEditUser() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["cancel"]))], null, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_EditUserComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 166, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 165, "mat-card", [["class", "col-md-10 mat-card"]], null, null, null, _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["View_MatCard_0"], _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_16__["MatCard"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 94, "div", [["class", "card-section"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 93, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 4, "div", [["class", "col-md-3 col-sm-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Account Informations"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 1, "p", [["class", "text-secondary"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["View or Edit account informations"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 87, "div", [["class", "col-md-9 col-sm-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 86, "form", [["action", ""], ["class", ""], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_bg"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 34, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 16, "mat-form-field", [["class", "spacing mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 1, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](26, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "username"], ["matInput", ""], ["placeholder", "username (not editable)"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](29, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](31, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_13__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[1, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](34, 0, null, null, 16, "mat-form-field", [["class", "spacing mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](35, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 8, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 9, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 10, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 12, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 13, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 14, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](43, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "email"], ["matInput", ""], ["placeholder", "Email (not editable)"], ["type", "email"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 44)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 44).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 44)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 44)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](44, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](46, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](48, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](49, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_13__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[8, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](51, 0, null, null, 38, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](52, 0, null, null, 18, "mat-form-field", [["class", "spacing mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](53, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 15, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 16, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 17, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 18, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 19, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 20, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 21, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](61, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "firstname"], ["matInput", ""], ["placeholder", "first name"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](62, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](64, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](66, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](67, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_13__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[15, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 4, 1, null, View_EditUserComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](70, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](71, 0, null, null, 18, "mat-form-field", [["class", "spacing mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](72, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 22, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 23, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 24, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 25, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 26, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 27, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 28, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](80, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "lastname"], ["matInput", ""], ["placeholder", "last name"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](81, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](83, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](85, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](86, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_13__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[22, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 4, 1, null, View_EditUserComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](89, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](90, 0, null, null, 7, "div", [["class", "row align-content-center justify-content-end"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EditUserComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](92, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](93, 0, null, null, 2, "button", [["class", "max-height-button  col-sm-2 align-self-center"], ["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.editUser() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](94, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Edit info"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EditUserComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](97, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](98, 0, null, 0, 1, "mat-divider", [["class", "mat-divider"], ["role", "separator"]], [[1, "aria-orientation", 0], [2, "mat-divider-vertical", null], [2, "mat-divider-horizontal", null], [2, "mat-divider-inset", null]], null, null, _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["View_MatDivider_0"], _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["RenderType_MatDivider"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](99, 49152, null, 0, _angular_material_divider__WEBPACK_IMPORTED_MODULE_18__["MatDivider"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](100, 0, null, 0, 66, "div", [["class", "card-section"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](101, 0, null, null, 65, "div", [["class", "row input-row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](102, 0, null, null, 2, "div", [["class", "col-md-3 col-sm-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](103, 0, null, null, 1, "p", [["class", "text-secondary"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Change Password"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](105, 0, null, null, 61, "div", [["class", "col-md-9 col-sm-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](106, 0, null, null, 60, "form", [["action", ""], ["class", ""], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](107, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_bg"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](108, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](110, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](111, 0, null, null, 51, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](112, 0, null, null, 16, "mat-form-field", [["class", "spacing mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](113, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 36, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 37, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 38, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 39, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 40, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 41, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 42, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](121, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "oldpassword"], ["matInput", ""], ["placeholder", "Old Password"], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 122)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 122).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 122)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 122)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](122, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](124, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](126, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](127, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_13__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[36, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](129, 0, null, null, 16, "mat-form-field", [["class", "spacing mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](130, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 43, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 44, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 45, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 46, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 47, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 48, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 49, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](138, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "newpassword"], ["matInput", ""], ["placeholder", "New Password"], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 139)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 139).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 139)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 139)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](139, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](141, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](143, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](144, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_13__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[43, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](146, 0, null, null, 16, "mat-form-field", [["class", "spacing mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_8__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](147, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 50, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 51, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 52, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 53, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 54, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 55, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 56, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](155, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "conpassword"], ["matInput", ""], ["placeholder", "Confirm Passwrod"], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 156)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 156).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 156)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 156)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](156, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](158, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](160, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](161, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_13__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[50, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](163, 0, null, null, 3, "div", [["class", "row align-content-center justify-content-end"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](164, 0, null, null, 2, "button", [["class", "max-height-button col-md-3 col-sm-4 col-5 align-self-center"], ["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changepassword() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](165, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Change Password"]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.userForm; _ck(_v, 13, 0, currVal_7); var currVal_45 = "username"; _ck(_v, 29, 0, currVal_45); var currVal_46 = "username (not editable)"; var currVal_47 = "text"; _ck(_v, 32, 0, currVal_46, currVal_47); var currVal_85 = "email"; _ck(_v, 46, 0, currVal_85); var currVal_86 = "Email (not editable)"; var currVal_87 = "email"; _ck(_v, 49, 0, currVal_86, currVal_87); var currVal_125 = "firstname"; _ck(_v, 64, 0, currVal_125); var currVal_126 = "first name"; var currVal_127 = "text"; _ck(_v, 67, 0, currVal_126, currVal_127); var currVal_128 = (_co.f["firstname"].value == _co.currentUser.FirstName); _ck(_v, 70, 0, currVal_128); var currVal_166 = "lastname"; _ck(_v, 83, 0, currVal_166); var currVal_167 = "last name"; var currVal_168 = "text"; _ck(_v, 86, 0, currVal_167, currVal_168); var currVal_169 = (_co.f["lastname"].value == _co.currentUser.LastName); _ck(_v, 89, 0, currVal_169); var currVal_170 = !_co.usrFBtn; _ck(_v, 92, 0, currVal_170); var currVal_173 = _co.usrFBtn; _ck(_v, 94, 0, currVal_173); var currVal_174 = !_co.usrFBtn; _ck(_v, 97, 0, currVal_174); var currVal_186 = _co.passwordform; _ck(_v, 108, 0, currVal_186); var currVal_224 = "oldpassword"; _ck(_v, 124, 0, currVal_224); var currVal_225 = "Old Password"; var currVal_226 = "password"; _ck(_v, 127, 0, currVal_225, currVal_226); var currVal_264 = "newpassword"; _ck(_v, 141, 0, currVal_264); var currVal_265 = "New Password"; var currVal_266 = "password"; _ck(_v, 144, 0, currVal_265, currVal_266); var currVal_304 = "conpassword"; _ck(_v, 158, 0, currVal_304); var currVal_305 = "Confirm Passwrod"; var currVal_306 = "password"; _ck(_v, 161, 0, currVal_305, currVal_306); var currVal_309 = _co.pfButton; _ck(_v, 165, 0, currVal_309); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).ngClassUntouched; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).ngClassTouched; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).ngClassPristine; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).ngClassDirty; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).ngClassValid; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).ngClassInvalid; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).ngClassPending; _ck(_v, 11, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).appearance == "standard"); var currVal_9 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).appearance == "fill"); var currVal_10 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).appearance == "outline"); var currVal_11 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).appearance == "legacy"); var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._control.errorState; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._canLabelFloat; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._shouldLabelFloat(); var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._hideControlPlaceholder(); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._control.disabled; var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._control.autofilled; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._control.focused; var currVal_19 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).color == "accent"); var currVal_20 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).color == "warn"); var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._shouldForward("untouched"); var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._shouldForward("touched"); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._shouldForward("pristine"); var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._shouldForward("dirty"); var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._shouldForward("valid"); var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._shouldForward("invalid"); var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._shouldForward("pending"); var currVal_28 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._animationsEnabled; _ck(_v, 17, 1, [currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28]); var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).ngClassUntouched; var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).ngClassTouched; var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).ngClassPristine; var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).ngClassDirty; var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).ngClassValid; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).ngClassInvalid; var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).ngClassPending; var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._isServer; var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).id; var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).placeholder; var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).disabled; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).required; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).readonly; var currVal_42 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._ariaDescribedby || null); var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).errorState; var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).required.toString(); _ck(_v, 26, 1, [currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44]); var currVal_48 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).appearance == "standard"); var currVal_49 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).appearance == "fill"); var currVal_50 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).appearance == "outline"); var currVal_51 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).appearance == "legacy"); var currVal_52 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._control.errorState; var currVal_53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._canLabelFloat; var currVal_54 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._shouldLabelFloat(); var currVal_55 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._hideControlPlaceholder(); var currVal_56 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._control.disabled; var currVal_57 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._control.autofilled; var currVal_58 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._control.focused; var currVal_59 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).color == "accent"); var currVal_60 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).color == "warn"); var currVal_61 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._shouldForward("untouched"); var currVal_62 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._shouldForward("touched"); var currVal_63 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._shouldForward("pristine"); var currVal_64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._shouldForward("dirty"); var currVal_65 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._shouldForward("valid"); var currVal_66 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._shouldForward("invalid"); var currVal_67 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._shouldForward("pending"); var currVal_68 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._animationsEnabled; _ck(_v, 34, 1, [currVal_48, currVal_49, currVal_50, currVal_51, currVal_52, currVal_53, currVal_54, currVal_55, currVal_56, currVal_57, currVal_58, currVal_59, currVal_60, currVal_61, currVal_62, currVal_63, currVal_64, currVal_65, currVal_66, currVal_67, currVal_68]); var currVal_69 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).ngClassUntouched; var currVal_70 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).ngClassTouched; var currVal_71 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).ngClassPristine; var currVal_72 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).ngClassDirty; var currVal_73 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).ngClassValid; var currVal_74 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).ngClassInvalid; var currVal_75 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).ngClassPending; var currVal_76 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49)._isServer; var currVal_77 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49).id; var currVal_78 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49).placeholder; var currVal_79 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49).disabled; var currVal_80 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49).required; var currVal_81 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49).readonly; var currVal_82 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49)._ariaDescribedby || null); var currVal_83 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49).errorState; var currVal_84 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49).required.toString(); _ck(_v, 43, 1, [currVal_69, currVal_70, currVal_71, currVal_72, currVal_73, currVal_74, currVal_75, currVal_76, currVal_77, currVal_78, currVal_79, currVal_80, currVal_81, currVal_82, currVal_83, currVal_84]); var currVal_88 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).appearance == "standard"); var currVal_89 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).appearance == "fill"); var currVal_90 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).appearance == "outline"); var currVal_91 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).appearance == "legacy"); var currVal_92 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._control.errorState; var currVal_93 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._canLabelFloat; var currVal_94 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldLabelFloat(); var currVal_95 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._hideControlPlaceholder(); var currVal_96 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._control.disabled; var currVal_97 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._control.autofilled; var currVal_98 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._control.focused; var currVal_99 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).color == "accent"); var currVal_100 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).color == "warn"); var currVal_101 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("untouched"); var currVal_102 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("touched"); var currVal_103 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("pristine"); var currVal_104 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("dirty"); var currVal_105 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("valid"); var currVal_106 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("invalid"); var currVal_107 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("pending"); var currVal_108 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._animationsEnabled; _ck(_v, 52, 1, [currVal_88, currVal_89, currVal_90, currVal_91, currVal_92, currVal_93, currVal_94, currVal_95, currVal_96, currVal_97, currVal_98, currVal_99, currVal_100, currVal_101, currVal_102, currVal_103, currVal_104, currVal_105, currVal_106, currVal_107, currVal_108]); var currVal_109 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassUntouched; var currVal_110 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassTouched; var currVal_111 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassPristine; var currVal_112 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassDirty; var currVal_113 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassValid; var currVal_114 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassInvalid; var currVal_115 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassPending; var currVal_116 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._isServer; var currVal_117 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).id; var currVal_118 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).placeholder; var currVal_119 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).disabled; var currVal_120 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).required; var currVal_121 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).readonly; var currVal_122 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._ariaDescribedby || null); var currVal_123 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).errorState; var currVal_124 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).required.toString(); _ck(_v, 61, 1, [currVal_109, currVal_110, currVal_111, currVal_112, currVal_113, currVal_114, currVal_115, currVal_116, currVal_117, currVal_118, currVal_119, currVal_120, currVal_121, currVal_122, currVal_123, currVal_124]); var currVal_129 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).appearance == "standard"); var currVal_130 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).appearance == "fill"); var currVal_131 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).appearance == "outline"); var currVal_132 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).appearance == "legacy"); var currVal_133 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._control.errorState; var currVal_134 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._canLabelFloat; var currVal_135 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldLabelFloat(); var currVal_136 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._hideControlPlaceholder(); var currVal_137 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._control.disabled; var currVal_138 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._control.autofilled; var currVal_139 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._control.focused; var currVal_140 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).color == "accent"); var currVal_141 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).color == "warn"); var currVal_142 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("untouched"); var currVal_143 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("touched"); var currVal_144 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("pristine"); var currVal_145 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("dirty"); var currVal_146 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("valid"); var currVal_147 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("invalid"); var currVal_148 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("pending"); var currVal_149 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._animationsEnabled; _ck(_v, 71, 1, [currVal_129, currVal_130, currVal_131, currVal_132, currVal_133, currVal_134, currVal_135, currVal_136, currVal_137, currVal_138, currVal_139, currVal_140, currVal_141, currVal_142, currVal_143, currVal_144, currVal_145, currVal_146, currVal_147, currVal_148, currVal_149]); var currVal_150 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassUntouched; var currVal_151 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassTouched; var currVal_152 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassPristine; var currVal_153 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassDirty; var currVal_154 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassValid; var currVal_155 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassInvalid; var currVal_156 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassPending; var currVal_157 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._isServer; var currVal_158 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).id; var currVal_159 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).placeholder; var currVal_160 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).disabled; var currVal_161 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).required; var currVal_162 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).readonly; var currVal_163 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._ariaDescribedby || null); var currVal_164 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).errorState; var currVal_165 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).required.toString(); _ck(_v, 80, 1, [currVal_150, currVal_151, currVal_152, currVal_153, currVal_154, currVal_155, currVal_156, currVal_157, currVal_158, currVal_159, currVal_160, currVal_161, currVal_162, currVal_163, currVal_164, currVal_165]); var currVal_171 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94).disabled || null); var currVal_172 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._animationMode === "NoopAnimations"); _ck(_v, 93, 0, currVal_171, currVal_172); var currVal_175 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 99).vertical ? "vertical" : "horizontal"); var currVal_176 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 99).vertical; var currVal_177 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 99).vertical; var currVal_178 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 99).inset; _ck(_v, 98, 0, currVal_175, currVal_176, currVal_177, currVal_178); var currVal_179 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 110).ngClassUntouched; var currVal_180 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 110).ngClassTouched; var currVal_181 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 110).ngClassPristine; var currVal_182 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 110).ngClassDirty; var currVal_183 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 110).ngClassValid; var currVal_184 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 110).ngClassInvalid; var currVal_185 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 110).ngClassPending; _ck(_v, 106, 0, currVal_179, currVal_180, currVal_181, currVal_182, currVal_183, currVal_184, currVal_185); var currVal_187 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).appearance == "standard"); var currVal_188 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).appearance == "fill"); var currVal_189 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).appearance == "outline"); var currVal_190 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).appearance == "legacy"); var currVal_191 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._control.errorState; var currVal_192 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._canLabelFloat; var currVal_193 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._shouldLabelFloat(); var currVal_194 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._hideControlPlaceholder(); var currVal_195 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._control.disabled; var currVal_196 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._control.autofilled; var currVal_197 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._control.focused; var currVal_198 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).color == "accent"); var currVal_199 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113).color == "warn"); var currVal_200 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._shouldForward("untouched"); var currVal_201 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._shouldForward("touched"); var currVal_202 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._shouldForward("pristine"); var currVal_203 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._shouldForward("dirty"); var currVal_204 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._shouldForward("valid"); var currVal_205 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._shouldForward("invalid"); var currVal_206 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._shouldForward("pending"); var currVal_207 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 113)._animationsEnabled; _ck(_v, 112, 1, [currVal_187, currVal_188, currVal_189, currVal_190, currVal_191, currVal_192, currVal_193, currVal_194, currVal_195, currVal_196, currVal_197, currVal_198, currVal_199, currVal_200, currVal_201, currVal_202, currVal_203, currVal_204, currVal_205, currVal_206, currVal_207]); var currVal_208 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 126).ngClassUntouched; var currVal_209 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 126).ngClassTouched; var currVal_210 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 126).ngClassPristine; var currVal_211 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 126).ngClassDirty; var currVal_212 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 126).ngClassValid; var currVal_213 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 126).ngClassInvalid; var currVal_214 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 126).ngClassPending; var currVal_215 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127)._isServer; var currVal_216 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127).id; var currVal_217 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127).placeholder; var currVal_218 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127).disabled; var currVal_219 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127).required; var currVal_220 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127).readonly; var currVal_221 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127)._ariaDescribedby || null); var currVal_222 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127).errorState; var currVal_223 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 127).required.toString(); _ck(_v, 121, 1, [currVal_208, currVal_209, currVal_210, currVal_211, currVal_212, currVal_213, currVal_214, currVal_215, currVal_216, currVal_217, currVal_218, currVal_219, currVal_220, currVal_221, currVal_222, currVal_223]); var currVal_227 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130).appearance == "standard"); var currVal_228 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130).appearance == "fill"); var currVal_229 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130).appearance == "outline"); var currVal_230 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130).appearance == "legacy"); var currVal_231 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._control.errorState; var currVal_232 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._canLabelFloat; var currVal_233 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._shouldLabelFloat(); var currVal_234 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._hideControlPlaceholder(); var currVal_235 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._control.disabled; var currVal_236 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._control.autofilled; var currVal_237 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._control.focused; var currVal_238 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130).color == "accent"); var currVal_239 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130).color == "warn"); var currVal_240 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._shouldForward("untouched"); var currVal_241 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._shouldForward("touched"); var currVal_242 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._shouldForward("pristine"); var currVal_243 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._shouldForward("dirty"); var currVal_244 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._shouldForward("valid"); var currVal_245 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._shouldForward("invalid"); var currVal_246 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._shouldForward("pending"); var currVal_247 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 130)._animationsEnabled; _ck(_v, 129, 1, [currVal_227, currVal_228, currVal_229, currVal_230, currVal_231, currVal_232, currVal_233, currVal_234, currVal_235, currVal_236, currVal_237, currVal_238, currVal_239, currVal_240, currVal_241, currVal_242, currVal_243, currVal_244, currVal_245, currVal_246, currVal_247]); var currVal_248 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 143).ngClassUntouched; var currVal_249 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 143).ngClassTouched; var currVal_250 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 143).ngClassPristine; var currVal_251 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 143).ngClassDirty; var currVal_252 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 143).ngClassValid; var currVal_253 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 143).ngClassInvalid; var currVal_254 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 143).ngClassPending; var currVal_255 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144)._isServer; var currVal_256 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144).id; var currVal_257 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144).placeholder; var currVal_258 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144).disabled; var currVal_259 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144).required; var currVal_260 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144).readonly; var currVal_261 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144)._ariaDescribedby || null); var currVal_262 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144).errorState; var currVal_263 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 144).required.toString(); _ck(_v, 138, 1, [currVal_248, currVal_249, currVal_250, currVal_251, currVal_252, currVal_253, currVal_254, currVal_255, currVal_256, currVal_257, currVal_258, currVal_259, currVal_260, currVal_261, currVal_262, currVal_263]); var currVal_267 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147).appearance == "standard"); var currVal_268 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147).appearance == "fill"); var currVal_269 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147).appearance == "outline"); var currVal_270 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147).appearance == "legacy"); var currVal_271 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._control.errorState; var currVal_272 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._canLabelFloat; var currVal_273 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._shouldLabelFloat(); var currVal_274 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._hideControlPlaceholder(); var currVal_275 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._control.disabled; var currVal_276 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._control.autofilled; var currVal_277 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._control.focused; var currVal_278 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147).color == "accent"); var currVal_279 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147).color == "warn"); var currVal_280 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._shouldForward("untouched"); var currVal_281 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._shouldForward("touched"); var currVal_282 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._shouldForward("pristine"); var currVal_283 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._shouldForward("dirty"); var currVal_284 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._shouldForward("valid"); var currVal_285 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._shouldForward("invalid"); var currVal_286 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._shouldForward("pending"); var currVal_287 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 147)._animationsEnabled; _ck(_v, 146, 1, [currVal_267, currVal_268, currVal_269, currVal_270, currVal_271, currVal_272, currVal_273, currVal_274, currVal_275, currVal_276, currVal_277, currVal_278, currVal_279, currVal_280, currVal_281, currVal_282, currVal_283, currVal_284, currVal_285, currVal_286, currVal_287]); var currVal_288 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 160).ngClassUntouched; var currVal_289 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 160).ngClassTouched; var currVal_290 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 160).ngClassPristine; var currVal_291 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 160).ngClassDirty; var currVal_292 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 160).ngClassValid; var currVal_293 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 160).ngClassInvalid; var currVal_294 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 160).ngClassPending; var currVal_295 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161)._isServer; var currVal_296 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161).id; var currVal_297 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161).placeholder; var currVal_298 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161).disabled; var currVal_299 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161).required; var currVal_300 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161).readonly; var currVal_301 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161)._ariaDescribedby || null); var currVal_302 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161).errorState; var currVal_303 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 161).required.toString(); _ck(_v, 155, 1, [currVal_288, currVal_289, currVal_290, currVal_291, currVal_292, currVal_293, currVal_294, currVal_295, currVal_296, currVal_297, currVal_298, currVal_299, currVal_300, currVal_301, currVal_302, currVal_303]); var currVal_307 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 165).disabled || null); var currVal_308 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 165)._animationMode === "NoopAnimations"); _ck(_v, 164, 0, currVal_307, currVal_308); }); }
function View_EditUserComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-edit-user", [], null, null, null, View_EditUserComponent_0, RenderType_EditUserComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _edit_user_component__WEBPACK_IMPORTED_MODULE_19__["EditUserComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_20__["AuthenticationService"], _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_21__["UserService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__["MatSnackBar"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var EditUserComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-edit-user", _edit_user_component__WEBPACK_IMPORTED_MODULE_19__["EditUserComponent"], View_EditUserComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/account-components/edit-user/edit-user.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/components/account-components/edit-user/edit-user.component.ts ***!
  \********************************************************************************/
/*! exports provided: EditUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditUserComponent", function() { return EditUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth_collection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_auth.collection */ "./src/app/_auth.collection/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(formbuilder, auth, user, snack) {
        this.auth = auth;
        this.user = user;
        this.snack = snack;
        this.pfButton = true;
        this.usrFBtn = true;
        this.userForm = formbuilder.group({
            username: [""],
            firstname: [""],
            lastname: [""],
            oldpassword: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            email: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]
        });
        this.passwordform = formbuilder.group({
            oldpassword: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            newpassword: [""],
            conpassword: [""]
        });
    } //constructor
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.auth.CurrentUser;
        this.f.firstname.setValue(this.auth.CurrentUser.FirstName);
        this.f.lastname.setValue(this.auth.CurrentUser.LastName);
        this.f.username.setValue(this.auth.CurrentUser.UserName);
        this.f.email.setValue(this.auth.CurrentUser.Email);
        this.f.oldpassword.setValue("");
        this.userForm.disable({ emitEvent: false });
        this.passwordform.statusChanges.subscribe(function (d) {
            var op = _this.passwordform.controls['oldpassword'].value ? true : false;
            var np = _this.passwordform.controls['newpassword'].value ? true : false;
            var cp = _this.passwordform.controls['conpassword'].value ? true : false;
            var all = !(op && np && cp);
            _this.pfButton = all;
        });
        this.userForm.statusChanges.subscribe(function (d) {
            var fn = _this.f['firstname'].value != _this.currentUser.FirstName;
            var ln = _this.f['lastname'].value != _this.currentUser.LastName;
            var all = !(fn || ln);
            _this.usrFBtn = all;
            /*
            if(all)
              this.f['email'].disable({emitEvent:false})
            */
            //enable password form
            if (all) {
                _this.userForm.get("oldpassword").enable({ emitEvent: false });
            }
        });
    };
    Object.defineProperty(EditUserComponent.prototype, "f", {
        get: function () { return this.userForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditUserComponent.prototype, "pf", {
        get: function () { return this.passwordform.controls; },
        enumerable: true,
        configurable: true
    });
    EditUserComponent.prototype.enableControl = function (control, enableAnyway) {
        if (enableAnyway) {
            control.enable({ emitEvent: false });
            return;
        }
        if (control.disabled) {
            control.enable({ emitEvent: false });
        }
        else {
            if (control.enabled) {
                control.disable({ emitEvent: false });
            }
        }
    }; //enableControl()
    EditUserComponent.prototype.editUser = function () {
        var _this = this;
        //check that password was entered 
        if (this.f['oldpassword'].value == "" || this.f['oldpassword'].value == null) {
            this.snack.open("Please enter your password first", "X", { duration: 10000 });
            this.userForm.get("oldpassword").markAsTouched();
            return;
        }
        this.usrFBtn = true;
        var userdto = __assign({}, this.currentUser);
        userdto.FirstName = this.f['firstname'].value;
        userdto.LastName = this.f['lastname'].value;
        userdto.password = this.f['oldpassword'].value;
        this.user.Update(userdto).subscribe(function (user) {
            _this.usrFBtn = false;
            _this.auth.updateCurrentUser(true, user.value);
            _this.f['firstname'].setValue(user.value.FirstName);
            _this.f['lastname'].setValue(user.value.LastName);
            _this.currentUser = user.value;
            _this.userForm.disable({ emitEvent: false });
        }, function (e) {
            _this.snack.open("Error:" + e.errors.errors, "X", { duration: 10000 });
            _this.usrFBtn = false;
        });
    };
    EditUserComponent.prototype.resetEditUser = function () {
        this.f['firstname'].setValue(this.currentUser.FirstName);
        this.f['lastname'].setValue(this.currentUser.LastName);
        this.usrFBtn = true;
    };
    EditUserComponent.prototype.changepassword = function () {
        var _this = this;
        if (this.pf['newpassword'].value != this.pf['conpassword'].value) {
            console.log("incompatiable passwords");
            return;
        }
        var passdto = {
            id: this.currentUser.Id,
            oldpassword: this.pf['oldpassword'].value,
            newpassword: this.pf['newpassword'].value
        };
        this.user.ChangePassword(passdto).subscribe(function (user) {
            _this.auth.updateCurrentUser(true, user.value);
            _this.currentUser = user.value;
            _this.passwordform.disable({ emitEvent: false });
        });
    }; //changepassword()
    return EditUserComponent;
}()); //class



/***/ }),

/***/ "./src/app/components/account-components/login/login.component.css.shim.ngstyle.js":
/*!*****************************************************************************************!*\
  !*** ./src/app/components/account-components/login/login.component.css.shim.ngstyle.js ***!
  \*****************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/components/account-components/login/login.component.ngfactory.js":
/*!**********************************************************************************!*\
  !*** ./src/app/components/account-components/login/login.component.ngfactory.js ***!
  \**********************************************************************************/
/*! exports provided: RenderType_LoginComponent, View_LoginComponent_0, View_LoginComponent_Host_0, LoginComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_LoginComponent", function() { return RenderType_LoginComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_LoginComponent_0", function() { return View_LoginComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_LoginComponent_Host_0", function() { return View_LoginComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponentNgFactory", function() { return LoginComponentNgFactory; });
/* harmony import */ var _login_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component.css.shim.ngstyle */ "./src/app/components/account-components/login/login.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _node_modules_angular_material_progress_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/progress-bar/typings/index.ngfactory */ "./node_modules/@angular/material/progress-bar/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/card/typings/index.ngfactory */ "./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */ "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./login.component */ "./src/app/components/account-components/login/login.component.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _auth_collection_services_alert_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../_auth.collection/_services/alert.service */ "./src/app/_auth.collection/_services/alert.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
























var styles_LoginComponent = [_login_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_LoginComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_LoginComponent, data: {} });

function View_LoginComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[4, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_LoginComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[11, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_LoginComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "mat-progress-bar", [["aria-valuemax", "100"], ["aria-valuemin", "0"], ["class", "mat-progress-bar"], ["mode", "query"], ["role", "progressbar"]], [[1, "aria-valuenow", 0], [1, "mode", 0], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_progress_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["View_MatProgressBar_0"], _node_modules_angular_material_progress_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["RenderType_MatProgressBar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__["MatProgressBar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]], [2, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__["MAT_PROGRESS_BAR_LOCATION"]]], { mode: [0, "mode"] }, null)], function (_ck, _v) { var currVal_3 = "query"; _ck(_v, 1, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).value; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).mode; var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_LoginComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 66, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 65, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 64, "div", [["class", "col-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 63, "mat-card", [["class", "form-card z-index-10 mat-card"]], null, null, null, _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_MatCard_0"], _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCard"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, 0, 58, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_bg"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 19, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 18, "mat-form-field", [["class", "spacing col-12 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 1, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "username"], ["matInput", ""], ["placeholder", "Username"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](26, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_14__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[1, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_LoginComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](29, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, null, 19, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](31, 0, null, null, 18, "mat-form-field", [["class", "spacing col-12 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 8, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 9, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 10, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 12, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 13, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 14, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "password"], ["matInput", ""], ["placeholder", "Password"], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](41, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](43, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](45, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](46, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_14__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[8, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_LoginComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](49, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](50, 0, null, null, 4, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](51, 0, null, null, 3, "div", [["class", "col-2"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](52, 0, null, null, 2, "button", [["class", "w-100"], ["color", "primary"], ["mat-raised-button", ""], ["type", "submit"]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onSubmit() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](53, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_18__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"], color: [1, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Submit"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](55, 0, null, null, 8, "div", [["class", "row justify-content-around"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](56, 0, null, null, 2, "div", [["class", "col"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](57, 0, null, null, 1, "a", [["class", "no-gutters small disable-anchor text-secondary"], ["href", "#"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Forget password?(Disabled for Developing)"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](59, 0, null, null, 4, "button", [["class", "col-1"], ["mat-raised-button", ""], ["type", "button"]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 60).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](60, 16384, null, 0, _angular_router__WEBPACK_IMPORTED_MODULE_19__["RouterLink"], [_angular_router__WEBPACK_IMPORTED_MODULE_19__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_19__["ActivatedRoute"], [8, null], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](61, 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](62, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_18__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Register"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](64, 0, null, 0, 2, "div", [["class", "bottom-progressbar-card z-index-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_LoginComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](66, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.loginform; _ck(_v, 7, 0, currVal_7); var currVal_45 = "username"; _ck(_v, 23, 0, currVal_45); var currVal_46 = "Username"; var currVal_47 = "text"; _ck(_v, 26, 0, currVal_46, currVal_47); var currVal_48 = _co.f["username"].hasError("required"); _ck(_v, 29, 0, currVal_48); var currVal_86 = "password"; _ck(_v, 43, 0, currVal_86); var currVal_87 = "Password"; var currVal_88 = "password"; _ck(_v, 46, 0, currVal_87, currVal_88); var currVal_89 = _co.f["password"].hasError("required"); _ck(_v, 49, 0, currVal_89); var currVal_92 = (!_co.loginform.valid || _co.disSubmit); var currVal_93 = "primary"; _ck(_v, 53, 0, currVal_92, currVal_93); var currVal_96 = _ck(_v, 61, 0, "/register"); _ck(_v, 60, 0, currVal_96); var currVal_97 = _co.disSubmit; _ck(_v, 62, 0, currVal_97); var currVal_98 = _co.disSubmit; _ck(_v, 66, 0, currVal_98); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassUntouched; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassTouched; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassPristine; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassDirty; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassValid; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassInvalid; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassPending; _ck(_v, 5, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).appearance == "standard"); var currVal_9 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).appearance == "fill"); var currVal_10 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).appearance == "outline"); var currVal_11 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).appearance == "legacy"); var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._control.errorState; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._canLabelFloat; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldLabelFloat(); var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._hideControlPlaceholder(); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._control.disabled; var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._control.autofilled; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._control.focused; var currVal_19 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).color == "accent"); var currVal_20 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).color == "warn"); var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("untouched"); var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("touched"); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("pristine"); var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("dirty"); var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("valid"); var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("invalid"); var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("pending"); var currVal_28 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._animationsEnabled; _ck(_v, 11, 1, [currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28]); var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassUntouched; var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassTouched; var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassPristine; var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassDirty; var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassValid; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassInvalid; var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassPending; var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._isServer; var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).id; var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).placeholder; var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).disabled; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).required; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).readonly; var currVal_42 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._ariaDescribedby || null); var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).errorState; var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).required.toString(); _ck(_v, 20, 1, [currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44]); var currVal_49 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).appearance == "standard"); var currVal_50 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).appearance == "fill"); var currVal_51 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).appearance == "outline"); var currVal_52 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).appearance == "legacy"); var currVal_53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._control.errorState; var currVal_54 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._canLabelFloat; var currVal_55 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldLabelFloat(); var currVal_56 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._hideControlPlaceholder(); var currVal_57 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._control.disabled; var currVal_58 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._control.autofilled; var currVal_59 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._control.focused; var currVal_60 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).color == "accent"); var currVal_61 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).color == "warn"); var currVal_62 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("untouched"); var currVal_63 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("touched"); var currVal_64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("pristine"); var currVal_65 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("dirty"); var currVal_66 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("valid"); var currVal_67 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("invalid"); var currVal_68 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("pending"); var currVal_69 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._animationsEnabled; _ck(_v, 31, 1, [currVal_49, currVal_50, currVal_51, currVal_52, currVal_53, currVal_54, currVal_55, currVal_56, currVal_57, currVal_58, currVal_59, currVal_60, currVal_61, currVal_62, currVal_63, currVal_64, currVal_65, currVal_66, currVal_67, currVal_68, currVal_69]); var currVal_70 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassUntouched; var currVal_71 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassTouched; var currVal_72 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassPristine; var currVal_73 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassDirty; var currVal_74 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassValid; var currVal_75 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassInvalid; var currVal_76 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassPending; var currVal_77 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._isServer; var currVal_78 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).id; var currVal_79 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).placeholder; var currVal_80 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).disabled; var currVal_81 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).required; var currVal_82 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).readonly; var currVal_83 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._ariaDescribedby || null); var currVal_84 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).errorState; var currVal_85 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).required.toString(); _ck(_v, 40, 1, [currVal_70, currVal_71, currVal_72, currVal_73, currVal_74, currVal_75, currVal_76, currVal_77, currVal_78, currVal_79, currVal_80, currVal_81, currVal_82, currVal_83, currVal_84, currVal_85]); var currVal_90 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).disabled || null); var currVal_91 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._animationMode === "NoopAnimations"); _ck(_v, 52, 0, currVal_90, currVal_91); var currVal_94 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62).disabled || null); var currVal_95 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62)._animationMode === "NoopAnimations"); _ck(_v, 59, 0, currVal_94, currVal_95); }); }
function View_LoginComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-login", [], null, null, null, View_LoginComponent_0, RenderType_LoginComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 245760, null, 0, _login_component__WEBPACK_IMPORTED_MODULE_20__["LoginComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_19__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_19__["Router"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_21__["MatSnackBar"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_22__["AuthenticationService"], _auth_collection_services_alert_service__WEBPACK_IMPORTED_MODULE_23__["AlertService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var LoginComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-login", _login_component__WEBPACK_IMPORTED_MODULE_20__["LoginComponent"], View_LoginComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/account-components/login/login.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/components/account-components/login/login.component.ts ***!
  \************************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_collection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_auth.collection */ "./src/app/_auth.collection/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");





var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, snake, authenticationService, alertService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.snake = snake;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.disSubmit = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginform = this.formBuilder.group({
            username: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }; //ngOnInit()
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () { return this.loginform.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.disSubmit = true;
        // stop here if form is invalid
        if (this.loginform.invalid) {
            return;
        }
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .subscribe(function (r) {
            console.log("navigate to home");
            if (r.isSuccessful) {
                _this.disSubmit = false;
                _this.router.navigate([_this.returnUrl]);
            }
        }, function (err) {
            if (err.status === 400) {
                _this.snake.open("" + err.error.errors, "X", { duration: 3000 });
            }
            _this.disSubmit = false;
            _this.alertService.error(err);
        });
    }; //onSubmit()
    LoginComponent.prototype.ngOnDestroy = function () {
        location.reload();
    };
    return LoginComponent;
}()); //class



/***/ }),

/***/ "./src/app/components/account-components/manage-account/manage-account.component.css.shim.ngstyle.js":
/*!***********************************************************************************************************!*\
  !*** ./src/app/components/account-components/manage-account/manage-account.component.css.shim.ngstyle.js ***!
  \***********************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".invetaion-code-area[_ngcontent-%COMP%] {\r\n  border: black solid 1px;\r\n  padding: 10px;\r\n}\r\n.invetaion-code-row[_ngcontent-%COMP%] {\r\n  margin-top: 10px;\r\n}\r\n#invetaion-code-area[_ngcontent-%COMP%] {\r\n  color: #28a745;\r\n}\r\n.app-edit-user[_ngcontent-%COMP%] {\r\n  padding-top: 40px;\r\n  padding-bottom: 40px;\r\n}"];



/***/ }),

/***/ "./src/app/components/account-components/manage-account/manage-account.component.ngfactory.js":
/*!****************************************************************************************************!*\
  !*** ./src/app/components/account-components/manage-account/manage-account.component.ngfactory.js ***!
  \****************************************************************************************************/
/*! exports provided: RenderType_ManageAccountComponent, View_ManageAccountComponent_0, View_ManageAccountComponent_Host_0, ManageAccountComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_ManageAccountComponent", function() { return RenderType_ManageAccountComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ManageAccountComponent_0", function() { return View_ManageAccountComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ManageAccountComponent_Host_0", function() { return View_ManageAccountComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageAccountComponentNgFactory", function() { return ManageAccountComponentNgFactory; });
/* harmony import */ var _manage_account_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manage-account.component.css.shim.ngstyle */ "./src/app/components/account-components/manage-account/manage-account.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_list_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/list/typings/index.ngfactory */ "./node_modules/@angular/material/list/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/card/typings/index.ngfactory */ "./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _node_modules_angular_material_expansion_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/expansion/typings/index.ngfactory */ "./node_modules/@angular/material/expansion/typings/index.ngfactory.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/divider/typings/index.ngfactory */ "./node_modules/@angular/material/divider/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/esm5/divider.es5.js");
/* harmony import */ var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */ "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _edit_user_edit_user_component_ngfactory__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../edit-user/edit-user.component.ngfactory */ "./src/app/components/account-components/edit-user/edit-user.component.ngfactory.js");
/* harmony import */ var _edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../edit-user/edit-user.component */ "./src/app/components/account-components/edit-user/edit-user.component.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../_auth.collection/_services/user.service */ "./src/app/_auth.collection/_services/user.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _manage_account_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./manage-account.component */ "./src/app/components/account-components/manage-account/manage-account.component.ts");
/* harmony import */ var _Services_styler_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../Services/styler.service */ "./src/app/Services/styler.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var styles_ManageAccountComponent = [_manage_account_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_ManageAccountComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_ManageAccountComponent, data: {} });

function View_ManageAccountComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 10, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 9, "mat-list-item", [["class", "clearfix mat-list-item"], ["role", "listitem"]], [[2, "mat-list-item-avatar", null], [2, "mat-list-item-with-avatar", null]], [[null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; if (("focus" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._handleFocus() !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._handleBlur() !== false);
        ad = (pd_1 && ad);
    } return ad; }, _node_modules_angular_material_list_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatListItem_0"], _node_modules_angular_material_list_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatListItem"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 1097728, null, 3, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__["MatListItem"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__["MatNavList"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 3, { _lines: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 4, { _avatar: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 5, { _icon: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, 2, 1, "p", [["class", "lead float-left"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](7, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, 2, 2, "button", [["class", "float-right"], ["mat-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.DeleteFriend(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" Delete Friend "]))], null, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._avatar || _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._icon); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._avatar || _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._icon); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = _v.context.$implicit.friendUsername; _ck(_v, 7, 0, currVal_2); var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).disabled || null); var currVal_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9)._animationMode === "NoopAnimations"); _ck(_v, 8, 0, currVal_3, currVal_4); }); }
function View_ManageAccountComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 7, "div", [["class", "invetaion-code-area"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 0, "code", [["id", "invetaion-code-area"]], [[8, "innerHTML", 1]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 2, "button", [["class", "invetaion-code-button"], ["mat-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.styler.CopyToClipboardById("invetaion-code-area") !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Copy"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 2, "button", [["class", "invetaion-code-button"], ["mat-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        _co.GenInvitaionBtn = false;
        var pd_0 = ((_co.invetationCode = "") !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Close"]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.invetationCode; _ck(_v, 1, 0, currVal_0); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).disabled || null); var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3)._animationMode === "NoopAnimations"); _ck(_v, 2, 0, currVal_1, currVal_2); var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6).disabled || null); var currVal_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 6)._animationMode === "NoopAnimations"); _ck(_v, 5, 0, currVal_3, currVal_4); }); }
function View_ManageAccountComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 108, "div", [["class", "container account-page"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 94, "section", [["class", "app-edit-user"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 7, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 6, "div", [["class", "col-md-10"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 5, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 4, "div", [["class", "col-md-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Manage People"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 1, "p", [["class", "text-secondary"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["View people your share the list with, Add new person to sync grocery with or invite a person to sync grocery with "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 85, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 84, "mat-card", [["class", "col-md-10 mat-card"]], null, null, null, _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatCard_0"], _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, 0, 29, "div", [["class", "card-section"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 28, "div", [["class", "row input-row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 4, "div", [["class", "col-md-3 col-sm-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Friends List"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 1, "p", [["class", "text-secondary"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Controll who have access to your Grocery List"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 22, "div", [["class", "col-md-9 col-sm-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 21, "mat-accordion", [["class", " mat-accordion"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 1720320, null, 1, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatAccordion"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { _headers: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MAT_ACCORDION"], null, [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatAccordion"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](25, 16777216, null, null, 17, "mat-expansion-panel", [["class", "mat-expansion-panel"]], [[2, "mat-expanded", null], [2, "mat-expansion-panel-spacing", null]], null, null, _node_modules_angular_material_expansion_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["View_MatExpansionPanel_0"], _node_modules_angular_material_expansion_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["RenderType_MatExpansionPanel"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](26, 1753088, null, 1, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionPanel"], [[3, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MAT_ACCORDION"]], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_13__["UniqueSelectionDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_common__WEBPACK_IMPORTED_MODULE_14__["DOCUMENT"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, { _lazyContent: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](256, null, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MAT_ACCORDION"], undefined, []), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, 0, 8, "mat-expansion-panel-header", [["class", "mat-expansion-panel-header"], ["role", "button"]], [[1, "id", 0], [1, "tabindex", 0], [1, "aria-controls", 0], [1, "aria-expanded", 0], [1, "aria-disabled", 0], [2, "mat-expanded", null], [40, "@expansionHeight", 0]], [[null, "click"], [null, "keydown"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._toggle() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._keydown($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, _node_modules_angular_material_expansion_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["View_MatExpansionPanelHeader_0"], _node_modules_angular_material_expansion_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["RenderType_MatExpansionPanelHeader"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](30, 180224, [[1, 4]], 0, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionPanelHeader"], [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionPanel"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](31, { collapsedHeight: 0, expandedHeight: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](32, { value: 0, params: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](33, 0, null, 0, 2, "mat-panel-title", [["class", "mat-expansion-panel-header-title"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 16384, null, 0, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionPanelTitle"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Show Friends "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](36, 0, null, 1, 1, "mat-panel-description", [["class", "mat-expansion-panel-header-description"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 16384, null, 0, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionPanelDescription"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 1, 1, null, View_ManageAccountComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, 1, 2, "button", [["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.updateList() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](41, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Update List"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](43, 0, null, 0, 1, "mat-divider", [["class", "mat-divider"], ["role", "separator"]], [[1, "aria-orientation", 0], [2, "mat-divider-vertical", null], [2, "mat-divider-horizontal", null], [2, "mat-divider-inset", null]], null, null, _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["View_MatDivider_0"], _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["RenderType_MatDivider"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](44, 49152, null, 0, _angular_material_divider__WEBPACK_IMPORTED_MODULE_16__["MatDivider"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](45, 0, null, 0, 32, "div", [["class", "card-section"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](46, 0, null, null, 31, "div", [["class", "row input-row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](47, 0, null, null, 4, "div", [["class", "col-md-3 col-sm-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](48, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Add A Friend"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](50, 0, null, null, 1, "p", [["class", "text-secondary"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Enter The invetation code of the user who you want to add to pair Grocery list with"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](52, 0, null, null, 25, "div", [["class", "col-md-9 col-sm-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](53, 0, null, null, 24, "div", [["class", "add-friend row justify-content-between"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](54, 0, null, null, 20, "mat-form-field", [["class", "example-full-width col mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](55, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_20__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 6, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 7, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 8, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 9, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 10, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 12, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](63, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["matInput", ""], ["placeholder", "Invitation Code"], ["value", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 64)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 64).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 64)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 64)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69)._onInput() !== false);
        ad = (pd_6 && ad);
    } if (("ngModelChange" === en)) {
        var pd_7 = ((_co.friendCode = $event) !== false);
        ad = (pd_7 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](64, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_21__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](66, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NG_VALUE_ACCESSOR"]]], { model: [0, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](68, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](69, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_22__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_23__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], value: [1, "value"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[6, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_22__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](71, 0, null, 4, 3, "button", [["mat-button", ""], ["matSuffix", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.pasteTofriendCode() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](72, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](73, 16384, [[12, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_18__["MatSuffix"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Paste"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](75, 0, null, null, 2, "button", [["class", "col-2"], ["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.AddFriend(_co.friendCode) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](76, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Add"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](78, 0, null, 0, 1, "mat-divider", [["class", "mat-divider"], ["role", "separator"]], [[1, "aria-orientation", 0], [2, "mat-divider-vertical", null], [2, "mat-divider-horizontal", null], [2, "mat-divider-inset", null]], null, null, _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["View_MatDivider_0"], _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["RenderType_MatDivider"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](79, 49152, null, 0, _angular_material_divider__WEBPACK_IMPORTED_MODULE_16__["MatDivider"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](80, 0, null, 0, 15, "div", [["class", "card-section"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](81, 0, null, null, 14, "div", [["class", "row input-row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](82, 0, null, null, 4, "div", [["class", "col-md-3 col-sm-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](83, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Invite a Friend"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](85, 0, null, null, 1, "p", [["class", "text-secondary"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Create an Invetation code to a Friend to pair Grocery list with"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](87, 0, null, null, 8, "div", [["class", "col-md-9 col-sm-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](88, 0, null, null, 4, "div", [["class", "invite-friend"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](89, 0, null, null, 3, "button", [["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.GenInvitaion() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](90, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_7__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](91, 0, null, 0, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Generate Invitation Code"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](93, 0, null, null, 2, "div", [["class", "invetaion-code-row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ManageAccountComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](95, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](96, 0, null, null, 1, "mat-divider", [["class", "mat-divider"], ["role", "separator"]], [[1, "aria-orientation", 0], [2, "mat-divider-vertical", null], [2, "mat-divider-horizontal", null], [2, "mat-divider-inset", null]], null, null, _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["View_MatDivider_0"], _node_modules_angular_material_divider_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_15__["RenderType_MatDivider"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](97, 49152, null, 0, _angular_material_divider__WEBPACK_IMPORTED_MODULE_16__["MatDivider"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](98, 0, null, null, 10, "section", [["class", "app-edit-user"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](99, 0, null, null, 7, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](100, 0, null, null, 6, "div", [["class", "col-md-10"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](101, 0, null, null, 5, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](102, 0, null, null, 4, "div", [["class", "col-md-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](103, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Your account info"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](105, 0, null, null, 1, "p", [["class", "text-secondary"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["View you account info or update them, your first name and last name are what appears in your grocery to other people you share the list with "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](107, 0, null, null, 1, "app-edit-user", [], null, null, null, _edit_user_edit_user_component_ngfactory__WEBPACK_IMPORTED_MODULE_24__["View_EditUserComponent_0"], _edit_user_edit_user_component_ngfactory__WEBPACK_IMPORTED_MODULE_24__["RenderType_EditUserComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](108, 114688, null, 0, _edit_user_edit_user_component__WEBPACK_IMPORTED_MODULE_25__["EditUserComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_21__["FormBuilder"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_26__["AuthenticationService"], _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_27__["UserService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_28__["MatSnackBar"]], null, null)], function (_ck, _v) { var _co = _v.component; var currVal_9 = _co.friends; _ck(_v, 39, 0, currVal_9); var currVal_53 = _co.friendCode; _ck(_v, 66, 0, currVal_53); var currVal_54 = "Invitation Code"; var currVal_55 = ""; _ck(_v, 69, 0, currVal_54, currVal_55); var currVal_60 = _co.AddfriendBtn; _ck(_v, 76, 0, currVal_60); var currVal_67 = _co.GenInvitaionBtn; _ck(_v, 90, 0, currVal_67); var currVal_68 = _co.invetationCode; _ck(_v, 95, 0, currVal_68); _ck(_v, 108, 0); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).expanded; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._hasSpacing(); _ck(_v, 25, 0, currVal_0, currVal_1); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).panel._headerId; var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).disabled ? (0 - 1) : 0); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._getPanelId(); var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._isExpanded(); var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).panel.disabled; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._isExpanded(); var currVal_8 = _ck(_v, 32, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._getExpandedState(), _ck(_v, 31, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).collapsedHeight, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).expandedHeight)); _ck(_v, 29, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_10 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41).disabled || null); var currVal_11 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41)._animationMode === "NoopAnimations"); _ck(_v, 40, 0, currVal_10, currVal_11); var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 44).vertical ? "vertical" : "horizontal"); var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 44).vertical; var currVal_14 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 44).vertical; var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 44).inset; _ck(_v, 43, 0, currVal_12, currVal_13, currVal_14, currVal_15); var currVal_16 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55).appearance == "standard"); var currVal_17 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55).appearance == "fill"); var currVal_18 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55).appearance == "outline"); var currVal_19 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55).appearance == "legacy"); var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._control.errorState; var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._canLabelFloat; var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._shouldLabelFloat(); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._hideControlPlaceholder(); var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._control.disabled; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._control.autofilled; var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._control.focused; var currVal_27 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55).color == "accent"); var currVal_28 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55).color == "warn"); var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._shouldForward("untouched"); var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._shouldForward("touched"); var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._shouldForward("pristine"); var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._shouldForward("dirty"); var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._shouldForward("valid"); var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._shouldForward("invalid"); var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._shouldForward("pending"); var currVal_36 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 55)._animationsEnabled; _ck(_v, 54, 1, [currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36]); var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 68).ngClassUntouched; var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 68).ngClassTouched; var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 68).ngClassPristine; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 68).ngClassDirty; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 68).ngClassValid; var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 68).ngClassInvalid; var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 68).ngClassPending; var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69)._isServer; var currVal_45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).id; var currVal_46 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).placeholder; var currVal_47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).disabled; var currVal_48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).required; var currVal_49 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).readonly; var currVal_50 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69)._ariaDescribedby || null); var currVal_51 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).errorState; var currVal_52 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).required.toString(); _ck(_v, 63, 1, [currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48, currVal_49, currVal_50, currVal_51, currVal_52]); var currVal_56 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).disabled || null); var currVal_57 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._animationMode === "NoopAnimations"); _ck(_v, 71, 0, currVal_56, currVal_57); var currVal_58 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).disabled || null); var currVal_59 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76)._animationMode === "NoopAnimations"); _ck(_v, 75, 0, currVal_58, currVal_59); var currVal_61 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 79).vertical ? "vertical" : "horizontal"); var currVal_62 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 79).vertical; var currVal_63 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 79).vertical; var currVal_64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 79).inset; _ck(_v, 78, 0, currVal_61, currVal_62, currVal_63, currVal_64); var currVal_65 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 90).disabled || null); var currVal_66 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 90)._animationMode === "NoopAnimations"); _ck(_v, 89, 0, currVal_65, currVal_66); var currVal_69 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 97).vertical ? "vertical" : "horizontal"); var currVal_70 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 97).vertical; var currVal_71 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 97).vertical; var currVal_72 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 97).inset; _ck(_v, 96, 0, currVal_69, currVal_70, currVal_71, currVal_72); }); }
function View_ManageAccountComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-account", [], null, null, null, View_ManageAccountComponent_0, RenderType_ManageAccountComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 245760, null, 0, _manage_account_component__WEBPACK_IMPORTED_MODULE_29__["ManageAccountComponent"], [_auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_26__["AuthenticationService"], _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_27__["UserService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_28__["MatSnackBar"], _Services_styler_service__WEBPACK_IMPORTED_MODULE_30__["StylerService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var ManageAccountComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-account", _manage_account_component__WEBPACK_IMPORTED_MODULE_29__["ManageAccountComponent"], View_ManageAccountComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/account-components/manage-account/manage-account.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/components/account-components/manage-account/manage-account.component.ts ***!
  \******************************************************************************************/
/*! exports provided: ManageAccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageAccountComponent", function() { return ManageAccountComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _auth_collection_models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_auth.collection/_models/user */ "./src/app/_auth.collection/_models/user.ts");
/* harmony import */ var _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_auth.collection/_services/user.service */ "./src/app/_auth.collection/_services/user.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _Services_styler_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Services/styler.service */ "./src/app/Services/styler.service.ts");






var ManageAccountComponent = /** @class */ (function () {
    function ManageAccountComponent(auth, userSrv, snack, styler) {
        this.auth = auth;
        this.userSrv = userSrv;
        this.snack = snack;
        this.styler = styler;
        this.GenInvitaionBtn = false;
        this.AddfriendBtn = false;
    }
    ManageAccountComponent.prototype.ngOnInit = function () {
        this.friends = this.auth.CurrentUser.userFriends;
        this.invetationCode = "";
    };
    ManageAccountComponent.prototype.DeleteFriend = function (friend) {
        var _this = this;
        console.log("DeleteFriend()");
        console.log(friend);
        var invCode = friend.friendEncryptedCode;
        var friendRequestDto = {
            invetationCode: invCode,
            userId: this.auth.CurrentUser.Id
        };
        console.log(friendRequestDto);
        this.userSrv.DeleteFriendship(friendRequestDto).subscribe(function (f) {
            _this.snack.open("" + f.statusText, "x", { duration: 3000 });
            console.log(f);
            _this.updateList(false);
        });
    };
    ManageAccountComponent.prototype.AddFriend = function (invCode) {
        var _this = this;
        this.AddfriendBtn = true;
        console.log("AddFriend()");
        console.log(invCode);
        var friendRequestDto = {
            invetationCode: invCode,
            userId: this.auth.CurrentUser.Id
        };
        console.log(friendRequestDto);
        this.userSrv.AddFriend(friendRequestDto).subscribe(function (f) {
            _this.AddfriendBtn = false;
            _this.snack.open("" + f.statusText, "x", { duration: 3000 });
            console.log(f);
            _this.updateList(false);
        }, function (e) {
            _this.snack.open("" + e.error.errors, "x", { duration: 3000 });
            _this.AddfriendBtn = false;
        });
    };
    ManageAccountComponent.prototype.updateList = function (showSnack) {
        var _this = this;
        if (showSnack === void 0) { showSnack = true; }
        this.auth.ReAuthenticate().subscribe(function (r) {
            console.log(r);
            if (showSnack) {
                _this.snack.open("" + r.statusText, "x", { duration: 3000 });
            }
            if (r.isSuccessful) {
                _this.auth.updateCurrentUser(true, r.value);
                _this.friends = _this.auth.CurrentUser.userFriends;
            }
        }, function (e) {
            _this.snack.open("" + e.error.errors, "x", { duration: 3000 });
        });
    };
    ManageAccountComponent.prototype.GenInvitaion = function () {
        var _this = this;
        this.GenInvitaionBtn = true;
        var resonse = this.userSrv.GenerateInvitaionCode().subscribe(function (r) {
            console.log(r);
            var code = r.value;
            _this.invetationCode = code;
            console.log(code);
            _this.GenInvitaionBtn = false;
        }, function (e) {
            _this.snack.open("" + e.error.errors, "x", { duration: 3000 });
            _this.GenInvitaionBtn = false;
        });
    };
    ManageAccountComponent.prototype.pasteTofriendCode = function () {
        var _this = this;
        var Naveigator = navigator;
        Naveigator.clipboard.readText()
            .then(function (text) {
            _this.friendCode = text;
        })
            .catch(function (err) {
            // maybe user didn't grant access to read from clipboard
            console.log('Something went wrong', err);
        });
    };
    ManageAccountComponent.prototype.ngOnDestroy = function () {
    };
    return ManageAccountComponent;
}());



/***/ }),

/***/ "./src/app/components/account-components/register/register.component.css.shim.ngstyle.js":
/*!***********************************************************************************************!*\
  !*** ./src/app/components/account-components/register/register.component.css.shim.ngstyle.js ***!
  \***********************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/components/account-components/register/register.component.ngfactory.js":
/*!****************************************************************************************!*\
  !*** ./src/app/components/account-components/register/register.component.ngfactory.js ***!
  \****************************************************************************************/
/*! exports provided: RenderType_RegisterComponent, View_RegisterComponent_0, View_RegisterComponent_Host_0, RegisterComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_RegisterComponent", function() { return RenderType_RegisterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_RegisterComponent_0", function() { return View_RegisterComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_RegisterComponent_Host_0", function() { return View_RegisterComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponentNgFactory", function() { return RegisterComponentNgFactory; });
/* harmony import */ var _register_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.component.css.shim.ngstyle */ "./src/app/components/account-components/register/register.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _node_modules_angular_material_progress_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/progress-bar/typings/index.ngfactory */ "./node_modules/@angular/material/progress-bar/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/card/typings/index.ngfactory */ "./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */ "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./register.component */ "./src/app/components/account-components/register/register.component.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../_auth.collection/_services/user.service */ "./src/app/_auth.collection/_services/user.service.ts");
/* harmony import */ var _auth_collection_services_alert_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../_auth.collection/_services/alert.service */ "./src/app/_auth.collection/_services/alert.service.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

























var styles_RegisterComponent = [_register_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_RegisterComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_RegisterComponent, data: {} });

function View_RegisterComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[4, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_RegisterComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[11, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_RegisterComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[18, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_RegisterComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[25, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_RegisterComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[25, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Please enter a valid email"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_RegisterComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[32, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_RegisterComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "mat-progress-bar", [["aria-valuemax", "100"], ["aria-valuemin", "0"], ["class", "mat-progress-bar"], ["mode", "query"], ["role", "progressbar"]], [[1, "aria-valuenow", 0], [1, "mode", 0], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_progress_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["View_MatProgressBar_0"], _node_modules_angular_material_progress_bar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["RenderType_MatProgressBar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__["MatProgressBar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]], [2, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_4__["MAT_PROGRESS_BAR_LOCATION"]]], { mode: [0, "mode"] }, null)], function (_ck, _v) { var currVal_3 = "query"; _ck(_v, 1, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).value; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).mode; var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_RegisterComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 126, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 125, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 124, "div", [["class", "col-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 123, "mat-card", [["class", "form-card z-index-10 mat-card"]], null, null, null, _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_MatCard_0"], _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCard"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, 0, 111, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_bg"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 19, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 18, "mat-form-field", [["class", "col-12 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 1, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "username"], ["matInput", ""], ["placeholder", "Username"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](26, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_14__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[1, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_RegisterComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](29, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, null, 19, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](31, 0, null, null, 18, "mat-form-field", [["class", "col-12 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 8, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 9, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 10, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 12, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 13, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 14, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "firstName"], ["matInput", ""], ["placeholder", "First Name"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 41)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](41, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](43, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](45, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](46, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_14__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[8, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_RegisterComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](49, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](50, 0, null, null, 19, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](51, 0, null, null, 18, "mat-form-field", [["class", "col-12 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](52, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 15, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 16, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 17, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 18, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 19, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 20, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 21, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](60, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "lastName"], ["matInput", ""], ["placeholder", "Last Name"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 61)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 61).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 61)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 61)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](61, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](63, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](65, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](66, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_14__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[15, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_RegisterComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](69, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](70, 0, null, null, 21, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](71, 0, null, null, 20, "mat-form-field", [["class", "col-12 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](72, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 22, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 23, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 24, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 25, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 26, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 27, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 28, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](80, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "email"], ["matInput", ""], ["placeholder", "Email"], ["type", "email"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](81, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](83, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](85, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](86, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_14__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[22, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_RegisterComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](89, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_RegisterComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](91, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](92, 0, null, null, 19, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](93, 0, null, null, 18, "mat-form-field", [["class", "col-12 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](94, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_11__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 29, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 30, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 31, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 32, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 33, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 34, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 35, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](102, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "password"], ["matInput", ""], ["placeholder", "Password"], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 103)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 103).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 103)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 103)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](103, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](105, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](107, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](108, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_14__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[29, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_RegisterComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](111, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](112, 0, null, null, 4, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](113, 0, null, null, 3, "div", [["class", "col-2"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](114, 0, null, null, 2, "button", [["class", "needed"], ["color", "primary"], ["mat-raised-button", ""], ["type", "submit"]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onSubmit() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](115, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_18__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"], color: [1, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" Submit "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](117, 0, null, 0, 6, "div", [["class", "row justify-content-around"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](118, 0, null, null, 4, "button", [["class", "col-1"], ["mat-raised-button", ""], ["type", "button"]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 119).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_16__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](119, 16384, null, 0, _angular_router__WEBPACK_IMPORTED_MODULE_19__["RouterLink"], [_angular_router__WEBPACK_IMPORTED_MODULE_19__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_19__["ActivatedRoute"], [8, null], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](120, 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](121, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_12__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_18__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Login"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](123, 0, null, null, 0, "div", [["class", "col"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](124, 0, null, 0, 2, "div", [["class", "bottom-progressbar-card z-index-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_RegisterComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](126, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.registerForm; _ck(_v, 7, 0, currVal_7); var currVal_45 = "username"; _ck(_v, 23, 0, currVal_45); var currVal_46 = "Username"; var currVal_47 = "text"; _ck(_v, 26, 0, currVal_46, currVal_47); var currVal_48 = _co.f["username"].hasError("required"); _ck(_v, 29, 0, currVal_48); var currVal_86 = "firstName"; _ck(_v, 43, 0, currVal_86); var currVal_87 = "First Name"; var currVal_88 = "text"; _ck(_v, 46, 0, currVal_87, currVal_88); var currVal_89 = _co.f["firstName"].hasError("required"); _ck(_v, 49, 0, currVal_89); var currVal_127 = "lastName"; _ck(_v, 63, 0, currVal_127); var currVal_128 = "Last Name"; var currVal_129 = "text"; _ck(_v, 66, 0, currVal_128, currVal_129); var currVal_130 = _co.f["lastName"].hasError("required"); _ck(_v, 69, 0, currVal_130); var currVal_168 = "email"; _ck(_v, 83, 0, currVal_168); var currVal_169 = "Email"; var currVal_170 = "email"; _ck(_v, 86, 0, currVal_169, currVal_170); var currVal_171 = _co.f["email"].hasError("required"); _ck(_v, 89, 0, currVal_171); var currVal_172 = _co.f["email"].hasError("email"); _ck(_v, 91, 0, currVal_172); var currVal_210 = "password"; _ck(_v, 105, 0, currVal_210); var currVal_211 = "Password"; var currVal_212 = "password"; _ck(_v, 108, 0, currVal_211, currVal_212); var currVal_213 = _co.f["password"].hasError("required"); _ck(_v, 111, 0, currVal_213); var currVal_216 = (!_co.registerForm.valid || _co.disSubmit); var currVal_217 = "primary"; _ck(_v, 115, 0, currVal_216, currVal_217); var currVal_220 = _ck(_v, 120, 0, "/login"); _ck(_v, 119, 0, currVal_220); var currVal_221 = _co.disSubmit; _ck(_v, 121, 0, currVal_221); var currVal_222 = _co.disSubmit; _ck(_v, 126, 0, currVal_222); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassUntouched; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassTouched; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassPristine; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassDirty; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassValid; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassInvalid; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassPending; _ck(_v, 5, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).appearance == "standard"); var currVal_9 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).appearance == "fill"); var currVal_10 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).appearance == "outline"); var currVal_11 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).appearance == "legacy"); var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._control.errorState; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._canLabelFloat; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldLabelFloat(); var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._hideControlPlaceholder(); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._control.disabled; var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._control.autofilled; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._control.focused; var currVal_19 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).color == "accent"); var currVal_20 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).color == "warn"); var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("untouched"); var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("touched"); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("pristine"); var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("dirty"); var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("valid"); var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("invalid"); var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._shouldForward("pending"); var currVal_28 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12)._animationsEnabled; _ck(_v, 11, 1, [currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28]); var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassUntouched; var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassTouched; var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassPristine; var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassDirty; var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassValid; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassInvalid; var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassPending; var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._isServer; var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).id; var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).placeholder; var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).disabled; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).required; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).readonly; var currVal_42 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._ariaDescribedby || null); var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).errorState; var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).required.toString(); _ck(_v, 20, 1, [currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44]); var currVal_49 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).appearance == "standard"); var currVal_50 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).appearance == "fill"); var currVal_51 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).appearance == "outline"); var currVal_52 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).appearance == "legacy"); var currVal_53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._control.errorState; var currVal_54 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._canLabelFloat; var currVal_55 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldLabelFloat(); var currVal_56 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._hideControlPlaceholder(); var currVal_57 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._control.disabled; var currVal_58 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._control.autofilled; var currVal_59 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._control.focused; var currVal_60 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).color == "accent"); var currVal_61 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32).color == "warn"); var currVal_62 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("untouched"); var currVal_63 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("touched"); var currVal_64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("pristine"); var currVal_65 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("dirty"); var currVal_66 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("valid"); var currVal_67 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("invalid"); var currVal_68 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._shouldForward("pending"); var currVal_69 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 32)._animationsEnabled; _ck(_v, 31, 1, [currVal_49, currVal_50, currVal_51, currVal_52, currVal_53, currVal_54, currVal_55, currVal_56, currVal_57, currVal_58, currVal_59, currVal_60, currVal_61, currVal_62, currVal_63, currVal_64, currVal_65, currVal_66, currVal_67, currVal_68, currVal_69]); var currVal_70 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassUntouched; var currVal_71 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassTouched; var currVal_72 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassPristine; var currVal_73 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassDirty; var currVal_74 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassValid; var currVal_75 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassInvalid; var currVal_76 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).ngClassPending; var currVal_77 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._isServer; var currVal_78 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).id; var currVal_79 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).placeholder; var currVal_80 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).disabled; var currVal_81 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).required; var currVal_82 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).readonly; var currVal_83 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._ariaDescribedby || null); var currVal_84 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).errorState; var currVal_85 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).required.toString(); _ck(_v, 40, 1, [currVal_70, currVal_71, currVal_72, currVal_73, currVal_74, currVal_75, currVal_76, currVal_77, currVal_78, currVal_79, currVal_80, currVal_81, currVal_82, currVal_83, currVal_84, currVal_85]); var currVal_90 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).appearance == "standard"); var currVal_91 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).appearance == "fill"); var currVal_92 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).appearance == "outline"); var currVal_93 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).appearance == "legacy"); var currVal_94 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._control.errorState; var currVal_95 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._canLabelFloat; var currVal_96 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._shouldLabelFloat(); var currVal_97 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._hideControlPlaceholder(); var currVal_98 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._control.disabled; var currVal_99 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._control.autofilled; var currVal_100 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._control.focused; var currVal_101 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).color == "accent"); var currVal_102 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).color == "warn"); var currVal_103 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._shouldForward("untouched"); var currVal_104 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._shouldForward("touched"); var currVal_105 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._shouldForward("pristine"); var currVal_106 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._shouldForward("dirty"); var currVal_107 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._shouldForward("valid"); var currVal_108 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._shouldForward("invalid"); var currVal_109 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._shouldForward("pending"); var currVal_110 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52)._animationsEnabled; _ck(_v, 51, 1, [currVal_90, currVal_91, currVal_92, currVal_93, currVal_94, currVal_95, currVal_96, currVal_97, currVal_98, currVal_99, currVal_100, currVal_101, currVal_102, currVal_103, currVal_104, currVal_105, currVal_106, currVal_107, currVal_108, currVal_109, currVal_110]); var currVal_111 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 65).ngClassUntouched; var currVal_112 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 65).ngClassTouched; var currVal_113 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 65).ngClassPristine; var currVal_114 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 65).ngClassDirty; var currVal_115 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 65).ngClassValid; var currVal_116 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 65).ngClassInvalid; var currVal_117 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 65).ngClassPending; var currVal_118 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66)._isServer; var currVal_119 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).id; var currVal_120 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).placeholder; var currVal_121 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).disabled; var currVal_122 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).required; var currVal_123 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).readonly; var currVal_124 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66)._ariaDescribedby || null); var currVal_125 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).errorState; var currVal_126 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).required.toString(); _ck(_v, 60, 1, [currVal_111, currVal_112, currVal_113, currVal_114, currVal_115, currVal_116, currVal_117, currVal_118, currVal_119, currVal_120, currVal_121, currVal_122, currVal_123, currVal_124, currVal_125, currVal_126]); var currVal_131 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).appearance == "standard"); var currVal_132 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).appearance == "fill"); var currVal_133 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).appearance == "outline"); var currVal_134 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).appearance == "legacy"); var currVal_135 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._control.errorState; var currVal_136 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._canLabelFloat; var currVal_137 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldLabelFloat(); var currVal_138 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._hideControlPlaceholder(); var currVal_139 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._control.disabled; var currVal_140 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._control.autofilled; var currVal_141 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._control.focused; var currVal_142 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).color == "accent"); var currVal_143 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).color == "warn"); var currVal_144 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("untouched"); var currVal_145 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("touched"); var currVal_146 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("pristine"); var currVal_147 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("dirty"); var currVal_148 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("valid"); var currVal_149 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("invalid"); var currVal_150 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._shouldForward("pending"); var currVal_151 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._animationsEnabled; _ck(_v, 71, 1, [currVal_131, currVal_132, currVal_133, currVal_134, currVal_135, currVal_136, currVal_137, currVal_138, currVal_139, currVal_140, currVal_141, currVal_142, currVal_143, currVal_144, currVal_145, currVal_146, currVal_147, currVal_148, currVal_149, currVal_150, currVal_151]); var currVal_152 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassUntouched; var currVal_153 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassTouched; var currVal_154 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassPristine; var currVal_155 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassDirty; var currVal_156 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassValid; var currVal_157 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassInvalid; var currVal_158 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 85).ngClassPending; var currVal_159 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._isServer; var currVal_160 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).id; var currVal_161 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).placeholder; var currVal_162 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).disabled; var currVal_163 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).required; var currVal_164 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).readonly; var currVal_165 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86)._ariaDescribedby || null); var currVal_166 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).errorState; var currVal_167 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 86).required.toString(); _ck(_v, 80, 1, [currVal_152, currVal_153, currVal_154, currVal_155, currVal_156, currVal_157, currVal_158, currVal_159, currVal_160, currVal_161, currVal_162, currVal_163, currVal_164, currVal_165, currVal_166, currVal_167]); var currVal_173 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94).appearance == "standard"); var currVal_174 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94).appearance == "fill"); var currVal_175 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94).appearance == "outline"); var currVal_176 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94).appearance == "legacy"); var currVal_177 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._control.errorState; var currVal_178 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._canLabelFloat; var currVal_179 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._shouldLabelFloat(); var currVal_180 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._hideControlPlaceholder(); var currVal_181 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._control.disabled; var currVal_182 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._control.autofilled; var currVal_183 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._control.focused; var currVal_184 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94).color == "accent"); var currVal_185 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94).color == "warn"); var currVal_186 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._shouldForward("untouched"); var currVal_187 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._shouldForward("touched"); var currVal_188 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._shouldForward("pristine"); var currVal_189 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._shouldForward("dirty"); var currVal_190 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._shouldForward("valid"); var currVal_191 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._shouldForward("invalid"); var currVal_192 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._shouldForward("pending"); var currVal_193 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 94)._animationsEnabled; _ck(_v, 93, 1, [currVal_173, currVal_174, currVal_175, currVal_176, currVal_177, currVal_178, currVal_179, currVal_180, currVal_181, currVal_182, currVal_183, currVal_184, currVal_185, currVal_186, currVal_187, currVal_188, currVal_189, currVal_190, currVal_191, currVal_192, currVal_193]); var currVal_194 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107).ngClassUntouched; var currVal_195 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107).ngClassTouched; var currVal_196 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107).ngClassPristine; var currVal_197 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107).ngClassDirty; var currVal_198 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107).ngClassValid; var currVal_199 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107).ngClassInvalid; var currVal_200 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 107).ngClassPending; var currVal_201 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108)._isServer; var currVal_202 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).id; var currVal_203 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).placeholder; var currVal_204 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).disabled; var currVal_205 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).required; var currVal_206 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).readonly; var currVal_207 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108)._ariaDescribedby || null); var currVal_208 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).errorState; var currVal_209 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 108).required.toString(); _ck(_v, 102, 1, [currVal_194, currVal_195, currVal_196, currVal_197, currVal_198, currVal_199, currVal_200, currVal_201, currVal_202, currVal_203, currVal_204, currVal_205, currVal_206, currVal_207, currVal_208, currVal_209]); var currVal_214 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 115).disabled || null); var currVal_215 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 115)._animationMode === "NoopAnimations"); _ck(_v, 114, 0, currVal_214, currVal_215); var currVal_218 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 121).disabled || null); var currVal_219 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 121)._animationMode === "NoopAnimations"); _ck(_v, 118, 0, currVal_218, currVal_219); }); }
function View_RegisterComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-register", [], null, null, null, View_RegisterComponent_0, RenderType_RegisterComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 245760, null, 0, _register_component__WEBPACK_IMPORTED_MODULE_20__["RegisterComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_19__["Router"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_21__["MatSnackBar"], _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_22__["UserService"], _auth_collection_services_alert_service__WEBPACK_IMPORTED_MODULE_23__["AlertService"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_24__["AuthenticationService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var RegisterComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-register", _register_component__WEBPACK_IMPORTED_MODULE_20__["RegisterComponent"], View_RegisterComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/account-components/register/register.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/components/account-components/register/register.component.ts ***!
  \******************************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_auth.collection */ "./src/app/_auth.collection/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");





var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, router, snake, userService, alertService, authenticationService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.snake = snake;
        this.userService = userService;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.disSubmit = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email])]
        });
    };
    Object.defineProperty(RegisterComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.registerForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.disSubmit = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.Register(this.registerForm.value)
            .subscribe(function (r) {
            if (r.isSuccessful) {
                _this.snake.open("Registration successful, logging in...", "X", { duration: 3000 });
                //internal login
                var username = _this.f.username.value;
                var password = _this.f.password.value;
                _this.login(username, password, "check-email");
            }
            else {
                _this.snake.open("Operation unsuccessfull!", "X", { duration: 20000 });
                console.error(r);
                ;
            }
        }, function (err) {
            _this.snake.open("" + err.error.errors, "X", { duration: 20000 });
            _this.disSubmit = false;
            _this.alertService.error(err);
            _this.loading = false;
        });
    };
    RegisterComponent.prototype.login = function (username, password, returnUrl) {
        var _this = this;
        this.authenticationService.login(username, password)
            .subscribe(function (r) {
            console.log("navigate to home");
            if (r.isSuccessful) {
                _this.disSubmit = false;
                _this.router.navigate([returnUrl]);
            }
        }, function (err) {
            _this.snake.open("" + err.error.errors, "X", { duration: 3000 });
            _this.disSubmit = false;
        });
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        //location.reload()
    };
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/components/account-components/userbar/userbar.component.css.shim.ngstyle.js":
/*!*********************************************************************************************!*\
  !*** ./src/app/components/account-components/userbar/userbar.component.css.shim.ngstyle.js ***!
  \*********************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/components/account-components/userbar/userbar.component.ngfactory.js":
/*!**************************************************************************************!*\
  !*** ./src/app/components/account-components/userbar/userbar.component.ngfactory.js ***!
  \**************************************************************************************/
/*! exports provided: RenderType_UserbarComponent, View_UserbarComponent_0, View_UserbarComponent_Host_0, UserbarComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_UserbarComponent", function() { return RenderType_UserbarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_UserbarComponent_0", function() { return View_UserbarComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_UserbarComponent_Host_0", function() { return View_UserbarComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserbarComponentNgFactory", function() { return UserbarComponentNgFactory; });
/* harmony import */ var _userbar_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userbar.component.css.shim.ngstyle */ "./src/app/components/account-components/userbar/userbar.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/menu/typings/index.ngfactory */ "./node_modules/@angular/material/menu/typings/index.ngfactory.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _userbar_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./userbar.component */ "./src/app/components/account-components/userbar/userbar.component.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../_auth.collection/_services/user.service */ "./src/app/_auth.collection/_services/user.service.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


















var styles_UserbarComponent = [_userbar_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_UserbarComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_UserbarComponent, data: {} });

function View_UserbarComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 41, "div", [["class", "userbar"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 4, "button", [["class", "block"], ["mat-icon-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.web.UpdateList$.next({ loading: true }) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, 0, 1, "i", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { ngClass: [0, "ngClass"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 16777216, null, null, 4, "button", [["aria-haspopup", "true"], ["class", "block"], ["mat-icon-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null], [1, "aria-expanded", 0]], [[null, "mousedown"], [null, "keydown"], [null, "click"]], function (_v, en, $event) { var ad = true; if (("mousedown" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8)._handleMousedown($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8)._handleKeydown($event) !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8)._handleClick($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 1196032, null, 0, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuTrigger"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_9__["Overlay"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MAT_MENU_SCROLL_STRATEGY"], [2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenu"]], [8, null], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["Directionality"]], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"]], { menu: [0, "menu"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, 0, 1, "i", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { ngClass: [0, "ngClass"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 30, "mat-menu", [["class", "block"]], null, null, null, _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["View_MatMenu_0"], _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["RenderType_MatMenu"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 1294336, [["userMenu", 4]], 2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenu"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MAT_MENU_DEFAULT_OPTIONS"]], { panelClass: [0, "panelClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { items: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, { lazyContent: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["ɵf23"], null, [_angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenu"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, 0, 3, "div", [["class", "menu-header mat-menu-item"], ["disabled", ""], ["mat-menu-item", ""], ["role", "menuitem"]], [[2, "mat-menu-item-highlighted", null], [2, "mat-menu-item-submenu-trigger", null], [1, "tabindex", 0], [1, "aria-disabled", 0], [1, "disabled", 0]], [[null, "click"], [null, "mouseenter"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17)._checkDisabled($event) !== false);
        ad = (pd_0 && ad);
    } if (("mouseenter" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17)._handleMouseEnter() !== false);
        ad = (pd_1 && ad);
    } return ad; }, _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["View_MatMenuItem_0"], _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["RenderType_MatMenuItem"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 180224, [[1, 4]], 0, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuItem"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["ɵf23"]]], { disabled: [0, "disabled"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, 0, 1, "p", [["class", "menu-header-inner"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](19, null, ["Welcome ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, 0, 8, "button", [["class", "mat-menu-item"], ["mat-menu-item", ""], ["role", "menuitem"], ["routerLink", "/"], ["routerLinkActive", "active-link"]], [[2, "mat-menu-item-highlighted", null], [2, "mat-menu-item-submenu-trigger", null], [1, "tabindex", 0], [1, "aria-disabled", 0], [1, "disabled", 0]], [[null, "click"], [null, "mouseenter"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).onClick() !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._checkDisabled($event) !== false);
        ad = (pd_1 && ad);
    } if (("mouseenter" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._handleMouseEnter() !== false);
        ad = (pd_2 && ad);
    } return ad; }, _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["View_MatMenuItem_0"], _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["RenderType_MatMenuItem"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 16384, [[3, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterLink"], [_angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_12__["ActivatedRoute"], [8, null], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { routerLinkActiveOptions: [0, "routerLinkActiveOptions"], routerLinkActive: [1, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 3, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](25, { exact: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](26, 180224, [[1, 4]], 0, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuItem"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["ɵf23"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](27, 0, null, 0, 1, "span", [["class", "menu-inner"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Home"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, 0, 8, "button", [["class", "mat-menu-item"], ["mat-menu-item", ""], ["role", "menuitem"], ["routerLink", "/account"], ["routerLinkActive", "active-link"]], [[2, "mat-menu-item-highlighted", null], [2, "mat-menu-item-submenu-trigger", null], [1, "tabindex", 0], [1, "aria-disabled", 0], [1, "disabled", 0]], [[null, "click"], [null, "mouseenter"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).onClick() !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._checkDisabled($event) !== false);
        ad = (pd_1 && ad);
    } if (("mouseenter" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._handleMouseEnter() !== false);
        ad = (pd_2 && ad);
    } return ad; }, _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["View_MatMenuItem_0"], _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["RenderType_MatMenuItem"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](30, 16384, [[5, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterLink"], [_angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_12__["ActivatedRoute"], [8, null], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](31, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { routerLinkActiveOptions: [0, "routerLinkActiveOptions"], routerLinkActive: [1, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](34, { exact: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](35, 180224, [[1, 4]], 0, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuItem"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["ɵf23"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](36, 0, null, 0, 1, "span", [["class", "menu-inner"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Friends List"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](38, 0, null, 0, 3, "button", [["class", "mat-menu-item"], ["mat-menu-item", ""], ["role", "menuitem"]], [[2, "mat-menu-item-highlighted", null], [2, "mat-menu-item-submenu-trigger", null], [1, "tabindex", 0], [1, "aria-disabled", 0], [1, "disabled", 0]], [[null, "click"], [null, "mouseenter"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39)._checkDisabled($event) !== false);
        ad = (pd_0 && ad);
    } if (("mouseenter" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39)._handleMouseEnter() !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = (_co.logoutUser() !== false);
        ad = (pd_2 && ad);
    } return ad; }, _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["View_MatMenuItem_0"], _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__["RenderType_MatMenuItem"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 180224, [[1, 4]], 0, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuItem"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["ɵf23"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, 0, 1, "span", [["class", "menu-inner"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Logout"]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 2, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).transform(_co.web.Loading$)); _ck(_v, 2, 0, currVal_2); var currVal_3 = _co.SetLoadingAndrefresh(); _ck(_v, 5, 0, currVal_3); var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12); _ck(_v, 8, 0, currVal_7); var currVal_8 = _co.SetLoadingAndellipsis(); _ck(_v, 10, 0, currVal_8); var currVal_9 = "block"; _ck(_v, 12, 0, currVal_9); var currVal_15 = ""; _ck(_v, 17, 0, currVal_15); var currVal_22 = "/"; _ck(_v, 21, 0, currVal_22); var currVal_23 = _ck(_v, 25, 0, true); var currVal_24 = "active-link"; _ck(_v, 22, 0, currVal_23, currVal_24); var currVal_30 = "/account"; _ck(_v, 30, 0, currVal_30); var currVal_31 = _ck(_v, 34, 0, true); var currVal_32 = "active-link"; _ck(_v, 31, 0, currVal_31, currVal_32); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._animationMode === "NoopAnimations"); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).disabled || null); var currVal_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7)._animationMode === "NoopAnimations"); var currVal_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 8).menuOpen || null); _ck(_v, 6, 0, currVal_4, currVal_5, currVal_6); var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17)._highlighted; var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17)._triggersSubmenu; var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17)._getTabIndex(); var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).disabled.toString(); var currVal_14 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).disabled || null); _ck(_v, 16, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_16 = _co.auth.CurrentUser.FirstName; _ck(_v, 19, 0, currVal_16); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._highlighted; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._triggersSubmenu; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._getTabIndex(); var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).disabled.toString(); var currVal_21 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).disabled || null); _ck(_v, 20, 0, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21); var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._highlighted; var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._triggersSubmenu; var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35)._getTabIndex(); var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).disabled.toString(); var currVal_29 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).disabled || null); _ck(_v, 29, 0, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29); var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39)._highlighted; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39)._triggersSubmenu; var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39)._getTabIndex(); var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).disabled.toString(); var currVal_37 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).disabled || null); _ck(_v, 38, 0, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37); }); }
function View_UserbarComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_UserbarComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.auth.CurrentUser; _ck(_v, 1, 0, currVal_0); }, null); }
function View_UserbarComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-userbar", [], null, null, null, View_UserbarComponent_0, RenderType_UserbarComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _userbar_component__WEBPACK_IMPORTED_MODULE_13__["UserbarComponent"], [_auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_14__["AuthenticationService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__["MatSnackBar"], _angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"], _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_16__["UserService"], _Services_g_list_service__WEBPACK_IMPORTED_MODULE_17__["GListService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var UserbarComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-userbar", _userbar_component__WEBPACK_IMPORTED_MODULE_13__["UserbarComponent"], View_UserbarComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/account-components/userbar/userbar.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/components/account-components/userbar/userbar.component.ts ***!
  \****************************************************************************/
/*! exports provided: UserbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserbarComponent", function() { return UserbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_collection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_auth.collection */ "./src/app/_auth.collection/index.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");






var UserbarComponent = /** @class */ (function () {
    function UserbarComponent(auth, snack, router, usersSrv, web) {
        this.auth = auth;
        this.snack = snack;
        this.router = router;
        this.usersSrv = usersSrv;
        this.web = web;
        //@ViewChild(MatMenuTrigger) userMenu: MatMenuTrigger;
        this.rotate = false;
    }
    UserbarComponent.prototype.ngOnInit = function () {
    };
    UserbarComponent.prototype.SetLoadingAndellipsis = function () {
        var classes = {
            "fas": true,
            "fa-ellipsis-v": true,
            "loading-rotate-start": this.web.Loading,
            "loading-rotate": true,
        };
        return classes;
    };
    UserbarComponent.prototype.SetLoadingAndrefresh = function () {
        var classes = {
            "fas": true,
            "fa-sync-alt": true,
            "loading-rotate-start": this.web.Loading,
            "loading-rotate": true,
        };
        return classes;
    };
    UserbarComponent.prototype.logoutUser = function () {
        this.auth.logout();
        this.snack.open("Logged Out", "x", { duration: 3000 });
        this.router.navigate(['/login']);
    };
    return UserbarComponent;
}());



/***/ }),

/***/ "./src/app/components/card-components/add-card/add-card.component.css.shim.ngstyle.js":
/*!********************************************************************************************!*\
  !*** ./src/app/components/card-components/add-card/add-card.component.css.shim.ngstyle.js ***!
  \********************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/components/card-components/add-card/add-card.component.ngfactory.js":
/*!*************************************************************************************!*\
  !*** ./src/app/components/card-components/add-card/add-card.component.ngfactory.js ***!
  \*************************************************************************************/
/*! exports provided: RenderType_AddCardComponent, View_AddCardComponent_0, View_AddCardComponent_Host_0, AddCardComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AddCardComponent", function() { return RenderType_AddCardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AddCardComponent_0", function() { return View_AddCardComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AddCardComponent_Host_0", function() { return View_AddCardComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCardComponentNgFactory", function() { return AddCardComponentNgFactory; });
/* harmony import */ var _add_card_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-card.component.css.shim.ngstyle */ "./src/app/components/card-components/add-card/add-card.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/card/typings/index.ngfactory */ "./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */ "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _node_modules_angular_material_checkbox_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/checkbox/typings/index.ngfactory */ "./node_modules/@angular/material/checkbox/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _add_card_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./add-card.component */ "./src/app/components/card-components/add-card/add-card.component.ts");
/* harmony import */ var _Services_frormat_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../Services/frormat.service */ "./src/app/Services/frormat.service.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _Services_styler_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../Services/styler.service */ "./src/app/Services/styler.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

























var styles_AddCardComponent = [_add_card_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_AddCardComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_AddCardComponent, data: { "animation": [{ type: 7, name: "ycard", definitions: [{ type: 0, name: "void", styles: { type: 6, styles: { height: 0 }, offset: null }, options: undefined }, { type: 0, name: "*", styles: { type: 6, styles: { height: "*" }, offset: null }, options: undefined }, { type: 1, expr: "void=>*", animation: [{ type: 4, styles: { type: 5, steps: [{ type: 6, styles: { transform: "translate3d(0, -100%, 0)", visibility: "visible", height: 0, offset: 0 }, offset: null }, { type: 6, styles: { transform: "translate3d(0, 0, 0)", height: "*", offset: 1 }, offset: null }] }, timings: "500ms ease" }], options: null }, { type: 1, expr: "*=>void", animation: [{ type: 4, styles: { type: 5, steps: [{ type: 6, styles: { transform: "translateY(0%) scale(1)", opacity: 1, height: "*", offset: 0 }, offset: null }, { type: 6, styles: { transform: "translateY(100%) scale(0)", opacity: 0, height: 0, offset: 1 }, offset: null }] }, timings: "350ms ease" }], options: null }], options: {} }] } });

function View_AddCardComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[4, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_AddCardComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-error", [["class", "mat-error"], ["role", "alert"]], [[1, "id", 0]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, [[11, 4]], 0, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatError"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Required"]))], null, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).id; _ck(_v, 0, 0, currVal_0); }); }
function View_AddCardComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "button", [["class", "add-to-list"], ["mat-raised-button", ""], ["type", "submit"]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.add() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_6__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_8__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Add to List"]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform(_co.web.Loading$)) || _co.web.formItem.invalid); _ck(_v, 1, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_AddCardComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 79, "div", [["class", ""], ["id", "Scrolltarget_1"]], [[24, "@ycard", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 78, "mat-card", [["class", "card grocery-card mat-card"]], null, null, null, _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatCard_0"], _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 76, "form", [["class", "row justify-content-around"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_bg"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 20, "div", [["class", "col-lg-4  col-md-4  col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 19, "div", [["class", "row justify-content-center no-gutters"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 18, "mat-form-field", [["class", "col-10 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_14__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 1, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "name"], ["id", "NameFieldEl"], ["matInput", ""], ["name", "Item Name"], ["placeholder", "Name"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 20)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](24, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_16__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { id: [0, "id"], placeholder: [1, "placeholder"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[1, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_AddCardComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](28, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 39, "mat-card-content", [["class", "col-lg-5 col-md-8 col-12 mat-card-content"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](30, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardContent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](31, 0, null, null, 37, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](32, 0, null, null, 19, "mat-form-field", [["class", "col-5 no-gutters mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](33, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_14__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 8, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 9, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 10, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 12, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 13, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 14, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 0, null, 1, 8, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "no"], ["matInput", ""], ["name", "No"], ["placeholder", "No."], ["type", "number"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "change"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 42)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 42).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 42)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 42)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("change" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 43).onChange($event.target.value) !== false);
        ad = (pd_4 && ad);
    } if (("input" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 43).onChange($event.target.value) !== false);
        ad = (pd_5 && ad);
    } if (("blur" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 43).onTouched() !== false);
        ad = (pd_6 && ad);
    } if (("blur" === en)) {
        var pd_7 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48)._focusChanged(false) !== false);
        ad = (pd_7 && ad);
    } if (("focus" === en)) {
        var pd_8 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48)._focusChanged(true) !== false);
        ad = (pd_8 && ad);
    } if (("input" === en)) {
        var pd_9 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48)._onInput() !== false);
        ad = (pd_9 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](42, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](43, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_bd"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0, p1_0) { return [p0_0, p1_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_bd"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](45, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](47, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](48, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_16__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[8, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 5, 1, null, View_AddCardComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](51, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](52, 0, null, null, 16, "mat-form-field", [["class", "col-5 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_12__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](53, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_14__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 15, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 16, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 17, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 18, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 19, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 20, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 21, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](61, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "type"], ["matInput", ""], ["name", "Type"], ["placeholder", "Type"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 62)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](62, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](64, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](66, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](67, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_5__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_13__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_16__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[15, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](69, 0, null, null, 10, "div", [["class", "col-lg-3 col-12 align-self-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](70, 0, null, null, 9, "div", [["class", "row justify-content-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](71, 0, null, null, 6, "mat-checkbox", [["class", "col-lg-5 col-md-2 col-5 align-self-center mat-checkbox"], ["formControlName", "basic"], ["name", "basic"], ["placeholder", "Timeout"]], [[8, "id", 0], [2, "mat-checkbox-indeterminate", null], [2, "mat-checkbox-checked", null], [2, "mat-checkbox-disabled", null], [2, "mat-checkbox-label-before", null], [2, "_mat-animation-noopable", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, _node_modules_angular_material_checkbox_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["View_MatCheckbox_0"], _node_modules_angular_material_checkbox_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["RenderType_MatCheckbox"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](72, 4374528, null, 0, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_18__["MatCheckbox"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_6__["FocusMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [8, null], [2, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_18__["MAT_CHECKBOX_CLICK_ACTION"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["ANIMATION_MODULE_TYPE"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_18__["MatCheckbox"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](74, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](76, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Basic"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AddCardComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](79, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_8 = _co.web.formItem; _ck(_v, 5, 0, currVal_8); var currVal_46 = "name"; _ck(_v, 22, 0, currVal_46); var currVal_47 = "NameFieldEl"; var currVal_48 = "Name"; _ck(_v, 25, 0, currVal_47, currVal_48); var currVal_49 = _co.web.formItem.get("name").hasError("required"); _ck(_v, 28, 0, currVal_49); var currVal_87 = "no"; _ck(_v, 45, 0, currVal_87); var currVal_88 = "No."; var currVal_89 = "number"; _ck(_v, 48, 0, currVal_88, currVal_89); var currVal_90 = _co.web.formItem.get("no").hasError("required"); _ck(_v, 51, 0, currVal_90); var currVal_128 = "type"; _ck(_v, 64, 0, currVal_128); var currVal_129 = "Type"; var currVal_130 = "text"; _ck(_v, 67, 0, currVal_129, currVal_130); var currVal_144 = "basic"; _ck(_v, 72, 0, currVal_144); var currVal_145 = "basic"; _ck(_v, 74, 0, currVal_145); var currVal_146 = !_co.MakeitNeeded; _ck(_v, 79, 0, currVal_146); }, function (_ck, _v) { var currVal_0 = undefined; _ck(_v, 0, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).ngClassUntouched; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).ngClassTouched; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).ngClassPristine; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).ngClassDirty; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).ngClassValid; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).ngClassInvalid; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).ngClassPending; _ck(_v, 3, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); var currVal_9 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).appearance == "standard"); var currVal_10 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).appearance == "fill"); var currVal_11 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).appearance == "outline"); var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).appearance == "legacy"); var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._control.errorState; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._canLabelFloat; var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._shouldLabelFloat(); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._hideControlPlaceholder(); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._control.disabled; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._control.autofilled; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._control.focused; var currVal_20 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).color == "accent"); var currVal_21 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).color == "warn"); var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._shouldForward("untouched"); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._shouldForward("touched"); var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._shouldForward("pristine"); var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._shouldForward("dirty"); var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._shouldForward("valid"); var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._shouldForward("invalid"); var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._shouldForward("pending"); var currVal_29 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._animationsEnabled; _ck(_v, 10, 1, [currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29]); var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassUntouched; var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassTouched; var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassPristine; var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassDirty; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassValid; var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassInvalid; var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).ngClassPending; var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._isServer; var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).id; var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).placeholder; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).disabled; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).required; var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).readonly; var currVal_43 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25)._ariaDescribedby || null); var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).errorState; var currVal_45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).required.toString(); _ck(_v, 19, 1, [currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45]); var currVal_50 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33).appearance == "standard"); var currVal_51 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33).appearance == "fill"); var currVal_52 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33).appearance == "outline"); var currVal_53 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33).appearance == "legacy"); var currVal_54 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._control.errorState; var currVal_55 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._canLabelFloat; var currVal_56 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._shouldLabelFloat(); var currVal_57 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._hideControlPlaceholder(); var currVal_58 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._control.disabled; var currVal_59 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._control.autofilled; var currVal_60 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._control.focused; var currVal_61 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33).color == "accent"); var currVal_62 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33).color == "warn"); var currVal_63 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._shouldForward("untouched"); var currVal_64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._shouldForward("touched"); var currVal_65 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._shouldForward("pristine"); var currVal_66 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._shouldForward("dirty"); var currVal_67 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._shouldForward("valid"); var currVal_68 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._shouldForward("invalid"); var currVal_69 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._shouldForward("pending"); var currVal_70 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._animationsEnabled; _ck(_v, 32, 1, [currVal_50, currVal_51, currVal_52, currVal_53, currVal_54, currVal_55, currVal_56, currVal_57, currVal_58, currVal_59, currVal_60, currVal_61, currVal_62, currVal_63, currVal_64, currVal_65, currVal_66, currVal_67, currVal_68, currVal_69, currVal_70]); var currVal_71 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 47).ngClassUntouched; var currVal_72 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 47).ngClassTouched; var currVal_73 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 47).ngClassPristine; var currVal_74 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 47).ngClassDirty; var currVal_75 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 47).ngClassValid; var currVal_76 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 47).ngClassInvalid; var currVal_77 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 47).ngClassPending; var currVal_78 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48)._isServer; var currVal_79 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).id; var currVal_80 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).placeholder; var currVal_81 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).disabled; var currVal_82 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).required; var currVal_83 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).readonly; var currVal_84 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48)._ariaDescribedby || null); var currVal_85 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).errorState; var currVal_86 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).required.toString(); _ck(_v, 41, 1, [currVal_71, currVal_72, currVal_73, currVal_74, currVal_75, currVal_76, currVal_77, currVal_78, currVal_79, currVal_80, currVal_81, currVal_82, currVal_83, currVal_84, currVal_85, currVal_86]); var currVal_91 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).appearance == "standard"); var currVal_92 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).appearance == "fill"); var currVal_93 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).appearance == "outline"); var currVal_94 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).appearance == "legacy"); var currVal_95 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._control.errorState; var currVal_96 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._canLabelFloat; var currVal_97 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldLabelFloat(); var currVal_98 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._hideControlPlaceholder(); var currVal_99 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._control.disabled; var currVal_100 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._control.autofilled; var currVal_101 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._control.focused; var currVal_102 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).color == "accent"); var currVal_103 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53).color == "warn"); var currVal_104 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("untouched"); var currVal_105 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("touched"); var currVal_106 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("pristine"); var currVal_107 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("dirty"); var currVal_108 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("valid"); var currVal_109 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("invalid"); var currVal_110 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._shouldForward("pending"); var currVal_111 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 53)._animationsEnabled; _ck(_v, 52, 1, [currVal_91, currVal_92, currVal_93, currVal_94, currVal_95, currVal_96, currVal_97, currVal_98, currVal_99, currVal_100, currVal_101, currVal_102, currVal_103, currVal_104, currVal_105, currVal_106, currVal_107, currVal_108, currVal_109, currVal_110, currVal_111]); var currVal_112 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassUntouched; var currVal_113 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassTouched; var currVal_114 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassPristine; var currVal_115 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassDirty; var currVal_116 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassValid; var currVal_117 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassInvalid; var currVal_118 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassPending; var currVal_119 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._isServer; var currVal_120 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).id; var currVal_121 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).placeholder; var currVal_122 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).disabled; var currVal_123 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).required; var currVal_124 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).readonly; var currVal_125 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67)._ariaDescribedby || null); var currVal_126 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).errorState; var currVal_127 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 67).required.toString(); _ck(_v, 61, 1, [currVal_112, currVal_113, currVal_114, currVal_115, currVal_116, currVal_117, currVal_118, currVal_119, currVal_120, currVal_121, currVal_122, currVal_123, currVal_124, currVal_125, currVal_126, currVal_127]); var currVal_131 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).id; var currVal_132 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).indeterminate; var currVal_133 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).checked; var currVal_134 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).disabled; var currVal_135 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).labelPosition == "before"); var currVal_136 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72)._animationMode === "NoopAnimations"); var currVal_137 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).ngClassUntouched; var currVal_138 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).ngClassTouched; var currVal_139 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).ngClassPristine; var currVal_140 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).ngClassDirty; var currVal_141 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).ngClassValid; var currVal_142 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).ngClassInvalid; var currVal_143 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).ngClassPending; _ck(_v, 71, 1, [currVal_131, currVal_132, currVal_133, currVal_134, currVal_135, currVal_136, currVal_137, currVal_138, currVal_139, currVal_140, currVal_141, currVal_142, currVal_143]); }); }
function View_AddCardComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AddCardComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.web.showAddCard; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddCardComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-add-card", [], null, null, null, View_AddCardComponent_0, RenderType_AddCardComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _add_card_component__WEBPACK_IMPORTED_MODULE_19__["AddCardComponent"], [_Services_frormat_service__WEBPACK_IMPORTED_MODULE_20__["FormatService"], _Services_g_list_service__WEBPACK_IMPORTED_MODULE_21__["GListService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_22__["MatSnackBar"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_23__["AuthenticationService"], _Services_styler_service__WEBPACK_IMPORTED_MODULE_24__["StylerService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddCardComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-add-card", _add_card_component__WEBPACK_IMPORTED_MODULE_19__["AddCardComponent"], View_AddCardComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/card-components/add-card/add-card.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/components/card-components/add-card/add-card.component.ts ***!
  \***************************************************************************/
/*! exports provided: AddCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCardComponent", function() { return AddCardComponent; });
/* harmony import */ var _Services_frormat_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Services/frormat.service */ "./src/app/Services/frormat.service.ts");
/* harmony import */ var _statics_Grocery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../statics/Grocery */ "./src/app/statics/Grocery.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _auth_collection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_auth.collection */ "./src/app/_auth.collection/index.ts");
/* harmony import */ var _Services_styler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Services/styler.service */ "./src/app/Services/styler.service.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};







var AddCardComponent = /** @class */ (function () {
    //---------remove private formBuilder
    function AddCardComponent(formatService, web, snackBar, auth, styler) {
        this.formatService = formatService;
        this.web = web;
        this.snackBar = snackBar;
        this.auth = auth;
        this.styler = styler;
        this.NeededOnly = [{ name: "", moreInformations: [{ bought: false }] }];
    }
    AddCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.web.showAddCard$.subscribe(function (s) {
            if (s = true) {
                _this.styler.scrollById("Scrolltarget_1", 100);
                _this.styler.focusById("NameFieldEl", 500);
            }
        });
    };
    //add method
    AddCardComponent.prototype.add = function () {
        var _this = this;
        if (this.web.formItem.invalid)
            return;
        var name = this.web.formItem.controls.name.value;
        var no = this.web.formItem.controls.no.value;
        var basic = this.web.formItem.controls.basic.value;
        var typeOfNo = this.web.formItem.controls.type.value;
        var timeout = this.timeoutDay * 3600 * 24;
        var bought = false;
        var g = {
            name: name,
            moreInformations: [{ bought: bought, no: no, typeOfNo: typeOfNo }],
            basic: basic,
            timeout: timeout,
            owner: this.auth.CurrentUser.UserName,
            ownerid: this.auth.CurrentUser.Id,
            groceryOrBought: bought
        };
        this.lastAdded = __assign({}, g);
        this.web.Loading$.next(true);
        this.web.request(g, "add").subscribe(function (r) {
            var options = { scrollId: _this.web.ViewIdByname(_this.lastAdded.name), Loading: false };
            _this.web.Loading$.next(false);
            _this.web.UpdateList$.next(options);
            _this.web.showAddCard = false;
            _this.web.clean();
            _this.styler.focusById("home-add-button");
        }, function (e) {
            _this.web.Loading$.next(false);
            _this.snackBar.open("Failed to add item " + e.error, "X", {
                duration: 5000
            });
        });
    };
    return AddCardComponent;
}());



/***/ }),

/***/ "./src/app/components/card-components/button-components/add-button/add-button.component.css.shim.ngstyle.js":
/*!******************************************************************************************************************!*\
  !*** ./src/app/components/card-components/button-components/add-button/add-button.component.css.shim.ngstyle.js ***!
  \******************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".add-grocery-button[_ngcontent-%COMP%]{\r\n    top: auto;\r\n    right: 20px;\r\n    bottom: 10px;\r\n    left: auto;\r\n    position: fixed;\r\n}"];



/***/ }),

/***/ "./src/app/components/card-components/button-components/add-button/add-button.component.ngfactory.js":
/*!***********************************************************************************************************!*\
  !*** ./src/app/components/card-components/button-components/add-button/add-button.component.ngfactory.js ***!
  \***********************************************************************************************************/
/*! exports provided: RenderType_AddButtonComponent, View_AddButtonComponent_0, View_AddButtonComponent_Host_0, AddButtonComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AddButtonComponent", function() { return RenderType_AddButtonComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AddButtonComponent_0", function() { return View_AddButtonComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AddButtonComponent_Host_0", function() { return View_AddButtonComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddButtonComponentNgFactory", function() { return AddButtonComponentNgFactory; });
/* harmony import */ var _add_button_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-button.component.css.shim.ngstyle */ "./src/app/components/card-components/button-components/add-button/add-button.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _add_button_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./add-button.component */ "./src/app/components/card-components/button-components/add-button/add-button.component.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _Services_styler_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../Services/styler.service */ "./src/app/Services/styler.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 











var styles_AddButtonComponent = [_add_button_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_AddButtonComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_AddButtonComponent, data: { "animation": [{ type: 7, name: "plussToCross", definitions: [{ type: 0, name: "true", styles: { type: 6, styles: { transform: "rotate(45deg) scale(1.2)" }, offset: null }, options: undefined }, { type: 0, name: "false", styles: { type: 6, styles: { transform: "rotate(0deg) scale(1)" }, offset: null }, options: undefined }, { type: 1, expr: "true<=>false", animation: [{ type: 4, styles: null, timings: "200ms" }], options: null }], options: {} }] } });

function View_AddButtonComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "button", [["cdkFocusInitial", ""], ["class", "z-index-24 add-grocery-button"], ["id", "home-add-button"], ["mat-fab", ""]], [[24, "@plussToCross", 0], [8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        _co.web.showAddCard$.next(!_co.web.showAddCard);
        var pd_0 = (_co.web.clean() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 1, "i", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { ngClass: [0, "ngClass"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform(_co.web.Loading$)); _ck(_v, 1, 0, currVal_3); var currVal_4 = _co.loadingSpin(); _ck(_v, 4, 0, currVal_4); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.web.showAddCard; var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_AddButtonComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-add-button", [], null, null, null, View_AddButtonComponent_0, RenderType_AddButtonComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _add_button_component__WEBPACK_IMPORTED_MODULE_8__["AddButtonComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_9__["GListService"], _Services_styler_service__WEBPACK_IMPORTED_MODULE_10__["StylerService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddButtonComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-add-button", _add_button_component__WEBPACK_IMPORTED_MODULE_8__["AddButtonComponent"], View_AddButtonComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/card-components/button-components/add-button/add-button.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/components/card-components/button-components/add-button/add-button.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: AddButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddButtonComponent", function() { return AddButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _Services_styler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Services/styler.service */ "./src/app/Services/styler.service.ts");



var AddButtonComponent = /** @class */ (function () {
    function AddButtonComponent(web, styler) {
        this.web = web;
        this.styler = styler;
    }
    AddButtonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.styler.focusById("home-add-button");
        this.web.clickAddCardButton$.subscribe(function (s) {
            if (s = true) {
                _this.styler.click("home-add-button", 500);
            }
        });
    };
    AddButtonComponent.prototype.loadingSpin = function () {
        var classes = {
            "fas": true,
            "fa-plus": true,
            "loading-rotate-start": this.web.Loading,
            "loading-rotate": true,
        };
        return classes;
    };
    return AddButtonComponent;
}());



/***/ }),

/***/ "./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.css.shim.ngstyle.js":
/*!***************************************************************************************************************************!*\
  !*** ./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.css.shim.ngstyle.js ***!
  \***************************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".bought[_ngcontent-%COMP%]{\r\n    background-color: #28ab6f;\r\n    color: white;\r\n}\r\n.needed[_ngcontent-%COMP%]{\r\n    background-color: #de0d0dba;\r\n}\r\n.remove[_ngcontent-%COMP%]{\r\n    margin-right: 15px;\r\n    color:rgb(170, 138, 138);\r\n}\r\n.MoreSection[_ngcontent-%COMP%]{\r\n    display: inline-block\r\n}\r\n.app-g-update[_ngcontent-%COMP%]{\r\n    \r\n}"];



/***/ }),

/***/ "./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.ngfactory.js":
/*!********************************************************************************************************************!*\
  !*** ./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.ngfactory.js ***!
  \********************************************************************************************************************/
/*! exports provided: RenderType_CardButtonsComponent, View_CardButtonsComponent_0, View_CardButtonsComponent_Host_0, CardButtonsComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_CardButtonsComponent", function() { return RenderType_CardButtonsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CardButtonsComponent_0", function() { return View_CardButtonsComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CardButtonsComponent_Host_0", function() { return View_CardButtonsComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardButtonsComponentNgFactory", function() { return CardButtonsComponentNgFactory; });
/* harmony import */ var _card_buttons_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card-buttons.component.css.shim.ngstyle */ "./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _g_update_comp_g_update_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../g-update-comp/g-update.component.ngfactory */ "./src/app/components/card-components/button-components/g-update-comp/g-update.component.ngfactory.js");
/* harmony import */ var _g_update_comp_g_update_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../g-update-comp/g-update.component */ "./src/app/components/card-components/button-components/g-update-comp/g-update.component.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _Services_frormat_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../Services/frormat.service */ "./src/app/Services/frormat.service.ts");
/* harmony import */ var _Services_helpers_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../Services/helpers.service */ "./src/app/Services/helpers.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/menu/typings/index.ngfactory */ "./node_modules/@angular/material/menu/typings/index.ngfactory.js");
/* harmony import */ var _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/form-field/typings/index.ngfactory */ "./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/cdk/text-field */ "./node_modules/@angular/cdk/esm5/text-field.es5.js");
/* harmony import */ var _node_modules_angular_material_checkbox_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/checkbox/typings/index.ngfactory */ "./node_modules/@angular/material/checkbox/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _card_buttons_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./card-buttons.component */ "./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



























var styles_CardButtonsComponent = [_card_buttons_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_CardButtonsComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_CardButtonsComponent, data: { "animation": [{ type: 7, name: "EditAnimation", definitions: [{ type: 1, expr: "void=>*", animation: [{ type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, offset: 1 }, offset: null }] }, timings: "500ms ease" }], options: null }], options: {} }, { type: 7, name: "FadeAnimationIn", definitions: [{ type: 1, expr: "void=>*", animation: { type: 11, selector: ".FadeAnimationIn:enter", animation: [{ type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, offset: 1 }, offset: null }] }, timings: "500ms ease" }], options: { optional: true } }, options: null }], options: {} }] } });

function View_CardButtonsComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 16777216, null, null, 3, "button", [["aria-haspopup", "true"], ["class", "FadeAnimationIn"], ["mat-icon-button", ""]], [[24, "@FadeAnimationIn", 0], [8, "disabled", 0], [2, "_mat-animation-noopable", null], [1, "aria-expanded", 0]], [[null, "mousedown"], [null, "keydown"], [null, "click"]], function (_v, en, $event) { var ad = true; if (("mousedown" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._handleMousedown($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._handleKeydown($event) !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._handleClick($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 1196032, null, 0, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenuTrigger"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__["Overlay"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MAT_MENU_SCROLL_STRATEGY"], [2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenu"]], [8, null], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_9__["Directionality"]], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"]], { menu: [0, "menu"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 0, "i", [["class", "fas fa-ellipsis-v"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, null, null, 0))], function (_ck, _v) { var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v.parent, 6); _ck(_v, 2, 0, currVal_4); }, function (_ck, _v) { var currVal_0 = undefined; var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).menuOpen || null); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3); }); }
function View_CardButtonsComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 17, "div", [["class", "FadeAnimationIn"]], [[24, "@FadeAnimationIn", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "app-g-update", [["class", "app-g-update"]], null, null, null, _g_update_comp_g_update_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["View_GUpdateComponent_0"], _g_update_comp_g_update_component_ngfactory__WEBPACK_IMPORTED_MODULE_10__["RenderType_GUpdateComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 114688, null, 0, _g_update_comp_g_update_component__WEBPACK_IMPORTED_MODULE_11__["GUpdateComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_12__["GListService"], _Services_frormat_service__WEBPACK_IMPORTED_MODULE_13__["FormatService"], _Services_helpers_service__WEBPACK_IMPORTED_MODULE_14__["HelpersService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__["MatSnackBar"]], { Item: [0, "Item"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_CardButtonsComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 12, "mat-menu", [["class", "block"]], null, null, null, _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["View_MatMenu_0"], _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["RenderType_MatMenu"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 1294336, [["userMenu", 4]], 2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenu"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MAT_MENU_DEFAULT_OPTIONS"]], { panelClass: [0, "panelClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { items: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 2, { lazyContent: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["ɵf23"], null, [_angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenu"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, 0, 3, "button", [["class", "mat-menu-item"], ["mat-menu-item", ""], ["role", "menuitem"]], [[2, "mat-menu-item-highlighted", null], [2, "mat-menu-item-submenu-trigger", null], [1, "tabindex", 0], [1, "aria-disabled", 0], [1, "disabled", 0]], [[null, "click"], [null, "mouseenter"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._checkDisabled($event) !== false);
        ad = (pd_0 && ad);
    } if (("mouseenter" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._handleMouseEnter() !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = ((_co.buttonClick = true) !== false);
        ad = (pd_2 && ad);
    } return ad; }, _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["View_MatMenuItem_0"], _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["RenderType_MatMenuItem"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 180224, [[1, 4]], 0, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenuItem"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["DOCUMENT"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["ɵf23"]]], { disabled: [0, "disabled"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_16__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" Edit"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, 0, 3, "button", [["class", "remove mat-menu-item"], ["color", "warn"], ["data-toggle", "modal"], ["mat-menu-item", ""], ["role", "menuitem"]], [[1, "data-target", 0], [2, "mat-menu-item-highlighted", null], [2, "mat-menu-item-submenu-trigger", null], [1, "tabindex", 0], [1, "aria-disabled", 0], [1, "disabled", 0]], [[null, "click"], [null, "mouseenter"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._checkDisabled($event) !== false);
        ad = (pd_0 && ad);
    } if (("mouseenter" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._handleMouseEnter() !== false);
        ad = (pd_1 && ad);
    } return ad; }, _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["View_MatMenuItem_0"], _node_modules_angular_material_menu_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_17__["RenderType_MatMenuItem"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 180224, [[1, 4]], 0, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenuItem"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["DOCUMENT"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["ɵf23"]]], { disabled: [0, "disabled"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_16__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" Delete"]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.Item; _ck(_v, 2, 0, currVal_1); var currVal_2 = !_co.buttonClick; _ck(_v, 4, 0, currVal_2); var currVal_3 = "block"; _ck(_v, 6, 0, currVal_3); var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 11, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).transform(_co.web.Loading$)); _ck(_v, 11, 0, currVal_9); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 15, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).transform(_co.web.Loading$)); _ck(_v, 15, 0, currVal_16); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = undefined; _ck(_v, 0, 0, currVal_0); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._highlighted; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._triggersSubmenu; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._getTabIndex(); var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).disabled.toString(); var currVal_8 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).disabled || null); _ck(_v, 10, 0, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_10 = _co.removeIdConfirm; var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._highlighted; var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._triggersSubmenu; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15)._getTabIndex(); var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).disabled.toString(); var currVal_15 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 15).disabled || null); _ck(_v, 14, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15); }); }
function View_CardButtonsComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 35, "div", [["class", "row justify-content-center"]], [[24, "@FadeAnimationIn", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 25, "div", [["class", "col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 24, "div", [["class", "row justify-content-start"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 16, "mat-form-field", [["class", "col-sm-7 col-8 mat-form-field"]], [[2, "mat-form-field-appearance-standard", null], [2, "mat-form-field-appearance-fill", null], [2, "mat-form-field-appearance-outline", null], [2, "mat-form-field-appearance-legacy", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-form-field-autofilled", null], [2, "mat-focused", null], [2, "mat-accent", null], [2, "mat-warn", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "_mat-animation-noopable", null]], null, null, _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_18__["View_MatFormField_0"], _node_modules_angular_material_form_field_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_18__["RenderType_MatFormField"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 7389184, null, 7, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__["MatFormField"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], [2, _angular_material_core__WEBPACK_IMPORTED_MODULE_20__["MAT_LABEL_GLOBAL_OPTIONS"]], [2, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_9__["Directionality"]], [2, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__["MAT_FORM_FIELD_DEFAULT_OPTIONS"]], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 3, { _control: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 4, { _placeholderChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](335544320, 5, { _labelChild: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { _errorChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { _hintChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 8, { _prefixChildren: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 9, { _suffixChildren: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["matInput", ""], ["name", "Name"], ["placeholder", "Name"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [1, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._onInput() !== false);
        ad = (pd_6 && ad);
    } if (("ngModelChange" === en)) {
        var pd_7 = ((_co.Item.name = $event) !== false);
        ad = (pd_7 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_21__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NG_VALUE_ACCESSOR"]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControl"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 999424, null, 0, _angular_material_input__WEBPACK_IMPORTED_MODULE_22__["MatInput"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControl"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgForm"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["FormGroupDirective"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_20__["ErrorStateMatcher"], [8, null], _angular_cdk_text_field__WEBPACK_IMPORTED_MODULE_23__["AutofillMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]], { placeholder: [0, "placeholder"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, [[3, 4]], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_19__["MatFormFieldControl"], null, [_angular_material_input__WEBPACK_IMPORTED_MODULE_22__["MatInput"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 6, "mat-checkbox", [["class", "col-sm-2  col-4 align-self-center mat-checkbox"], ["name", "basic"], ["placeholder", "Timeout"]], [[8, "id", 0], [2, "mat-checkbox-indeterminate", null], [2, "mat-checkbox-checked", null], [2, "mat-checkbox-disabled", null], [2, "mat-checkbox-label-before", null], [2, "_mat-animation-noopable", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.Item.basic = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_checkbox_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_24__["View_MatCheckbox_0"], _node_modules_angular_material_checkbox_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_24__["RenderType_MatCheckbox"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 4374528, null, 0, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_25__["MatCheckbox"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], [8, null], [2, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_25__["MAT_CHECKBOX_CLICK_ACTION"]], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_25__["MatCheckbox"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgModel"], [[8, null], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NG_VALUE_ACCESSOR"]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgModel"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Basic"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](27, 0, null, null, 8, "div", [["class", "col-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 7, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 3, "button", [["class", "col-11 max-height-button"], ["color", "primary"], ["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.Edit(_co.Item) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](30, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"], color: [1, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_16__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, ["Edit Item"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](33, 0, null, null, 2, "button", [["class", "col-1"], ["color", "primary"], ["mat-icon-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = ((_co.buttonClick = false) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { color: [0, "color"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](35, 0, null, 0, 0, "i", [["class", "fas fa-times"]], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_38 = "Name"; var currVal_39 = _co.Item.name; _ck(_v, 15, 0, currVal_38, currVal_39); var currVal_40 = "Name"; _ck(_v, 18, 0, currVal_40); var currVal_54 = "basic"; _ck(_v, 21, 0, currVal_54); var currVal_55 = "basic"; var currVal_56 = _co.Item.basic; _ck(_v, 23, 0, currVal_55, currVal_56); var currVal_59 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 30, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 31).transform(_co.web.Loading$)); var currVal_60 = "primary"; _ck(_v, 30, 0, currVal_59, currVal_60); var currVal_63 = "primary"; _ck(_v, 34, 0, currVal_63); }, function (_ck, _v) { var currVal_0 = undefined; _ck(_v, 0, 0, currVal_0); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).appearance == "standard"); var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).appearance == "fill"); var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).appearance == "outline"); var currVal_4 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).appearance == "legacy"); var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._control.errorState; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._canLabelFloat; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._shouldLabelFloat(); var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._hideControlPlaceholder(); var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._control.disabled; var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._control.autofilled; var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._control.focused; var currVal_12 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).color == "accent"); var currVal_13 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).color == "warn"); var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._shouldForward("untouched"); var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._shouldForward("touched"); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._shouldForward("pristine"); var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._shouldForward("dirty"); var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._shouldForward("valid"); var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._shouldForward("invalid"); var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._shouldForward("pending"); var currVal_21 = !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4)._animationsEnabled; _ck(_v, 3, 1, [currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21]); var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassUntouched; var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassTouched; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassPristine; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassDirty; var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassValid; var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassInvalid; var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassPending; var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._isServer; var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).id; var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).placeholder; var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).disabled; var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).required; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).readonly; var currVal_35 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18)._ariaDescribedby || null); var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).errorState; var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).required.toString(); _ck(_v, 12, 1, [currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37]); var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).id; var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).indeterminate; var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).checked; var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).disabled; var currVal_45 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).labelPosition == "before"); var currVal_46 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21)._animationMode === "NoopAnimations"); var currVal_47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassUntouched; var currVal_48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassTouched; var currVal_49 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassPristine; var currVal_50 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassDirty; var currVal_51 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassValid; var currVal_52 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassInvalid; var currVal_53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).ngClassPending; _ck(_v, 20, 1, [currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48, currVal_49, currVal_50, currVal_51, currVal_52, currVal_53]); var currVal_57 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).disabled || null); var currVal_58 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._animationMode === "NoopAnimations"); _ck(_v, 29, 0, currVal_57, currVal_58); var currVal_61 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).disabled || null); var currVal_62 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34)._animationMode === "NoopAnimations"); _ck(_v, 33, 0, currVal_61, currVal_62); }); }
function View_CardButtonsComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 5, "div", [["class", "row justify-content-end no-gutters"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_CardButtonsComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 2, "div", [["class", "col-sm"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_CardButtonsComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 17, "div", [["aria-hidden", "true"], ["aria-labelledby", "exampleModalLabel"], ["class", "modal fade"], ["role", "dialog"], ["tabindex", "-1"]], [[8, "id", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 16, "div", [["class", "modal-dialog"], ["role", "document"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 15, "div", [["class", "modal-content"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 2, "div", [["class", "modal-header"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 1, "h5", [["class", "modal-title"], ["id", "exampleModalLabel"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Only delete an item if it was added by mistake"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 2, "div", [["class", "model-body p-3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["If item was bought then click the bought button and don't delete it"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 8, "div", [["class", "modal-footer"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 1, "button", [["class", "btn btn-secondary"], ["data-dismiss", "modal"], ["type", "button"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Close"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 2, "button", [["class", "btn btn-danger"], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.remove(_co.Item) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_16__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Remove"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 2, "button", [["class", "btn btn-danger"], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.DELETE(_co.Item) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_16__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Delete"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.buttonClick; _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.buttonClick; _ck(_v, 5, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.removeConfirmForId; _ck(_v, 6, 0, currVal_2); var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 18, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).transform(_co.web.Loading$)); _ck(_v, 18, 0, currVal_3); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 21, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 22).transform(_co.web.Loading$)); _ck(_v, 21, 0, currVal_4); }); }
function View_CardButtonsComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-card-buttons", [], null, null, null, View_CardButtonsComponent_0, RenderType_CardButtonsComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _card_buttons_component__WEBPACK_IMPORTED_MODULE_26__["CardButtonsComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_12__["GListService"], _Services_frormat_service__WEBPACK_IMPORTED_MODULE_13__["FormatService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__["MatSnackBar"], _Services_helpers_service__WEBPACK_IMPORTED_MODULE_14__["HelpersService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CardButtonsComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-card-buttons", _card_buttons_component__WEBPACK_IMPORTED_MODULE_26__["CardButtonsComponent"], View_CardButtonsComponent_Host_0, { timeoutDay: "timeoutDay", Item: "Item" }, {}, []);



/***/ }),

/***/ "./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: CardButtonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardButtonsComponent", function() { return CardButtonsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _Services_helpers_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Services/helpers.service */ "./src/app/Services/helpers.service.ts");
/* harmony import */ var _statics_Grocery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../statics/Grocery */ "./src/app/statics/Grocery.ts");
/* harmony import */ var _Services_frormat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../Services/frormat.service */ "./src/app/Services/frormat.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");







var CardButtonsComponent = /** @class */ (function () {
    //R
    function CardButtonsComponent(web, formatService, snackBar, helper) {
        this.web = web;
        this.formatService = formatService;
        this.snackBar = snackBar;
        this.helper = helper;
        this.MoreButton = false;
        this.MoreButton$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        //R
        this.lastmoreInformations = { bought: false, no: 1, typeOfNo: "" };
        this.NeededClicked = false;
        this.TheRandomString = this.helper.randomString();
        this.removeIdConfirm = "#" + this.TheRandomString;
        this.removeConfirmForId = this.TheRandomString;
    }
    CardButtonsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.MoreButton$.subscribe(function (b) {
            _this.MoreButton = b;
            if (!b) {
                _this.buttonClick = b;
            }
        });
    };
    CardButtonsComponent.prototype.Edit = function (g) {
        if (g.name == '') {
            return;
        } //if the data is empty
        //->bad code
        g.timeout = this.timeoutDay * 3600 * 24 + (Date.now() / 1000);
        //bad code<-
        this.web.UpdateStatus(g, "edit");
        this.buttonClick = false;
    };
    CardButtonsComponent.prototype.remove = function (grocery) {
        console.log(grocery);
        //checking
        //var groceryRequest=this.formatService.Toremove(grocery)
        if (grocery.moreInformations.length <= 1) {
            this.snackBar.open("Item doesn't have any history To undo", "X", { duration: 9000, });
            $(this.removeIdConfirm).modal('hide');
            return;
        }
        this.web.UpdateStatus(grocery, "remove");
        //Close Dialog
        $(this.removeIdConfirm).modal('hide');
    };
    CardButtonsComponent.prototype.DELETE = function (Item) {
        //sendDelete
        var grocery = Item;
        this.web.UpdateStatus(grocery, "delete");
        //Close Dialog
        $(this.removeIdConfirm).modal('hide');
    };
    CardButtonsComponent.prototype.Bought = function (Item) {
        //Send Bought
        var grocery = this.formatService.Tobought(Item);
        console.log(grocery);
        this.web.UpdateStatus(grocery, "bought");
    };
    //Needed Logic
    CardButtonsComponent.prototype.Needed = function (g) {
        this.NeededClicked = !this.NeededClicked;
        g.timeout = this.timeoutDay * 3600 * 24;
        var grocery = this.formatService.Toneed(g, g.basic, g.timeout, this.lastmoreInformations);
        this.web.UpdateStatus(grocery, "needed");
    };
    return CardButtonsComponent;
}()); //class



/***/ }),

/***/ "./src/app/components/card-components/button-components/g-update-comp/g-update.component.css.shim.ngstyle.js":
/*!*******************************************************************************************************************!*\
  !*** ./src/app/components/card-components/button-components/g-update-comp/g-update.component.css.shim.ngstyle.js ***!
  \*******************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".bought[_ngcontent-%COMP%]{\r\n   \r\n   background-color: #208888;\r\n    color: white;\r\n}\r\n.needed[_ngcontent-%COMP%]{\r\n    background-color: #de0d0dba;\r\n}\r\n.remove[_ngcontent-%COMP%]{\r\n    margin-right: 15px;\r\n    color:rgb(170, 138, 138);\r\n}\r\n.add[_ngcontent-%COMP%]{\r\n    margin-right: 15px;\r\n    color:rgb(170, 138, 138);\r\n}"];



/***/ }),

/***/ "./src/app/components/card-components/button-components/g-update-comp/g-update.component.ngfactory.js":
/*!************************************************************************************************************!*\
  !*** ./src/app/components/card-components/button-components/g-update-comp/g-update.component.ngfactory.js ***!
  \************************************************************************************************************/
/*! exports provided: RenderType_GUpdateComponent, View_GUpdateComponent_0, View_GUpdateComponent_Host_0, GUpdateComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_GUpdateComponent", function() { return RenderType_GUpdateComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GUpdateComponent_0", function() { return View_GUpdateComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GUpdateComponent_Host_0", function() { return View_GUpdateComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUpdateComponentNgFactory", function() { return GUpdateComponentNgFactory; });
/* harmony import */ var _g_update_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./g-update.component.css.shim.ngstyle */ "./src/app/components/card-components/button-components/g-update-comp/g-update.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _g_update_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./g-update.component */ "./src/app/components/card-components/button-components/g-update-comp/g-update.component.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _Services_frormat_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../Services/frormat.service */ "./src/app/Services/frormat.service.ts");
/* harmony import */ var _Services_helpers_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../Services/helpers.service */ "./src/app/Services/helpers.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 













var styles_GUpdateComponent = [_g_update_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_GUpdateComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_GUpdateComponent, data: {} });

function View_GUpdateComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "button", [["class", "bought"], ["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        _co.Bought();
        var pd_0 = ((_co.boughtClicked = !_co.boughtClicked) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" Bought"]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform(_co.web.Loading$)); _ck(_v, 1, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_GUpdateComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "button", [["class", "needed"], ["color", "primary"], ["mat-raised-button", ""]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.Needed() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["ANIMATION_MODULE_TYPE"]]], { disabled: [0, "disabled"], color: [1, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpid"](131072, _angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]]), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" Needed"]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunv"](_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).transform(_co.web.Loading$)); var currVal_3 = "primary"; _ck(_v, 1, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1).disabled || null); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._animationMode === "NoopAnimations"); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_GUpdateComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_GUpdateComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_GUpdateComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.Item.groceryOrBought; _ck(_v, 1, 0, currVal_0); var currVal_1 = _co.Item.groceryOrBought; _ck(_v, 3, 0, currVal_1); }, null); }
function View_GUpdateComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-g-update", [], null, null, null, View_GUpdateComponent_0, RenderType_GUpdateComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _g_update_component__WEBPACK_IMPORTED_MODULE_8__["GUpdateComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_9__["GListService"], _Services_frormat_service__WEBPACK_IMPORTED_MODULE_10__["FormatService"], _Services_helpers_service__WEBPACK_IMPORTED_MODULE_11__["HelpersService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__["MatSnackBar"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var GUpdateComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-g-update", _g_update_component__WEBPACK_IMPORTED_MODULE_8__["GUpdateComponent"], View_GUpdateComponent_Host_0, { Item: "Item" }, {}, []);



/***/ }),

/***/ "./src/app/components/card-components/button-components/g-update-comp/g-update.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/components/card-components/button-components/g-update-comp/g-update.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: GUpdateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUpdateComponent", function() { return GUpdateComponent; });
/* harmony import */ var _Services_helpers_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Services/helpers.service */ "./src/app/Services/helpers.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _statics_Grocery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../statics/Grocery */ "./src/app/statics/Grocery.ts");
/* harmony import */ var _Services_frormat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../Services/frormat.service */ "./src/app/Services/frormat.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};






var GUpdateComponent = /** @class */ (function () {
    function GUpdateComponent(web, formatService, helper, snack) {
        this.web = web;
        this.formatService = formatService;
        this.helper = helper;
        this.snack = snack;
        this.lastmoreInformations = {
            bought: false,
            no: 1,
            typeOfNo: ""
        };
        this.timeoutDay = 0;
        this.boughtClicked = false;
        //Remove
        this.TheRandomString = this.helper.randomString();
        this.removeIdConfirm = "#" + this.TheRandomString;
        this.removeConfirmForId = this.TheRandomString;
    }
    GUpdateComponent.prototype.ngOnInit = function () {
        this.lastmoreInformations = this.Item.moreInformations[this.Item.moreInformations.length - 1];
    };
    GUpdateComponent.prototype.Bought = function () {
        var _this = this;
        //(click) Bought button
        var g = __assign({}, this.Item);
        // g.timeout =  this.timeoutDay*3600*24  ;
        var grocery = this.formatService.Tobought(g);
        this.web.Loading$.next(true);
        this.web.request(grocery, "bought").subscribe(function (response) {
            console.log("request().subscribe()");
            console.log(response);
            _this.snack.open("" + response.statusText, "X", { duration: 5000 });
            _this.web.UpdateList$.next({ loading: false, refresh: true });
            _this.web.Loading$.next(false);
        }, function (e) {
            console.log(e);
            _this.web.Loading$.next(false);
            _this.snack.open("Request failed", "X", { duration: 5000 });
            console.log("Request failed");
        });
    };
    //Needed Logic
    GUpdateComponent.prototype.Needed = function () {
        var _this = this;
        this.web.Loading$.next(true);
        //(click) Needed button
        var g = __assign({}, this.Item);
        this.boughtClicked = !this.boughtClicked;
        var grocery = this.formatService.Toneed(g, g.basic, g.timeout, this.lastmoreInformations);
        this.web.request(grocery, "needed").subscribe(function (response) {
            _this.snack.open("" + response.statusText, "X", { duration: 2000 });
            _this.web.UpdateList$.next({ loading: false, refresh: true });
            _this.web.Loading$.next(false);
        }, function () {
            _this.snack.open("Request failed", "X", { duration: 2000 });
            _this.web.Loading$.next(false);
        });
    };
    return GUpdateComponent;
}());



/***/ }),

/***/ "./src/app/components/card-components/item-card/item-card.component.css.shim.ngstyle.js":
/*!**********************************************************************************************!*\
  !*** ./src/app/components/card-components/item-card/item-card.component.css.shim.ngstyle.js ***!
  \**********************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".card[_ngcontent-%COMP%] {\r\n    color: black;\r\n    background-color: white;\r\n}\r\n\r\n.card-subtitle[_ngcontent-%COMP%]{\r\n    color: black;\r\n}\r\n\r\n.MeOwner[_ngcontent-%COMP%]{\r\n    color: red;\r\n}"];



/***/ }),

/***/ "./src/app/components/card-components/item-card/item-card.component.ngfactory.js":
/*!***************************************************************************************!*\
  !*** ./src/app/components/card-components/item-card/item-card.component.ngfactory.js ***!
  \***************************************************************************************/
/*! exports provided: RenderType_ItemCardComponent, View_ItemCardComponent_0, View_ItemCardComponent_Host_0, ItemCardComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_ItemCardComponent", function() { return RenderType_ItemCardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ItemCardComponent_0", function() { return View_ItemCardComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ItemCardComponent_Host_0", function() { return View_ItemCardComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemCardComponentNgFactory", function() { return ItemCardComponentNgFactory; });
/* harmony import */ var _item_card_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item-card.component.css.shim.ngstyle */ "./src/app/components/card-components/item-card/item-card.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/@angular/material/card/typings/index.ngfactory */ "./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _button_components_card_buttons_comp_card_buttons_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../button-components/card-buttons-comp/card-buttons.component.ngfactory */ "./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.ngfactory.js");
/* harmony import */ var _button_components_card_buttons_comp_card_buttons_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../button-components/card-buttons-comp/card-buttons.component */ "./src/app/components/card-components/button-components/card-buttons-comp/card-buttons.component.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _Services_frormat_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../Services/frormat.service */ "./src/app/Services/frormat.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _Services_helpers_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../Services/helpers.service */ "./src/app/Services/helpers.service.ts");
/* harmony import */ var _item_card_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./item-card.component */ "./src/app/components/card-components/item-card/item-card.component.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 













var styles_ItemCardComponent = [_item_card_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_ItemCardComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_ItemCardComponent, data: { "animation": [{ type: 7, name: "simp", definitions: [{ type: 1, expr: "* => *", animation: [{ type: 11, selector: ":leave", animation: [{ type: 12, timings: "1s", animation: [{ type: 4, styles: { type: 6, styles: { opacity: 0 }, offset: null }, timings: "0.5s" }] }], options: { optional: true } }, { type: 11, selector: ":enter", animation: [{ type: 6, styles: { opacity: 0 }, offset: null }, { type: 12, timings: "1s", animation: [{ type: 4, styles: { type: 6, styles: { opacity: 1 }, offset: null }, timings: "0.5s" }] }], options: { optional: true } }], options: null }], options: {} }, { type: 7, name: "Mylist", definitions: [{ type: 1, expr: "* => *", animation: [{ type: 11, selector: ":enter", animation: { type: 6, styles: { opacity: 0 }, offset: null }, options: { optional: true } }, { type: 11, selector: ":enter", animation: { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, transform: "translateY(-75px)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateY(0)", offset: 1 }, offset: null }] }, timings: "2000ms ease" }, options: { optional: true } }], options: null }], options: {} }] } });

function View_ItemCardComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-card-subtitle", [["class", "card-subtitle mat-card-subtitle"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardSubtitle"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, [" ", " ", " "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.lastmore == null) ? null : _co.lastmore.no); var currVal_1 = ((_co.lastmore == null) ? null : _co.lastmore.typeOfNo); _ck(_v, 2, 0, currVal_0, currVal_1); }); }
function View_ItemCardComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "mat-card-subtitle", [["class", "card-subtitle mat-card-subtitle"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardSubtitle"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, [" Usually every ", " "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.FormatedTimout; _ck(_v, 2, 0, currVal_0); }); }
function View_ItemCardComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 23, "mat-card", [["class", "card grocery-card mat-card"]], [[24, "@simp", 0], [8, "id", 0]], null, null, _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["View_MatCard_0"], _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCard"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, 0, 21, "div", [["class", "row justify-content-between"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 17, "div", [["class", "col-sm-auto col-xs-12"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 14, "mat-card-header", [["class", "mat-card-header"]], null, null, null, _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["View_MatCardHeader_0"], _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_3__["RenderType_MatCardHeader"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardHeader"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, 1, 3, "mat-card-title", [["class", "mat-card-title"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardTitle"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 1, "h3", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.GetDetails(_co.Item.id) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](9, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 1, 1, null, View_ItemCardComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, 1, 4, "mat-card-subtitle", [["class", "mat-card-subtitle"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { ngClass: [0, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardSubtitle"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 0, "i", [["class", "fas fa-user-circle"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](16, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, 1, 1, null, View_ItemCardComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 1, "mat-card-content", [["class", "type1 mat-card-content"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 16384, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__["MatCardContent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 2, "div", [["class", "col-sm-auto col-xs-12 align-self-end"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](22, 0, null, null, 1, "app-card-buttons", [], null, null, null, _button_components_card_buttons_comp_card_buttons_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__["View_CardButtonsComponent_0"], _button_components_card_buttons_comp_card_buttons_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__["RenderType_CardButtonsComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 114688, null, 0, _button_components_card_buttons_comp_card_buttons_component__WEBPACK_IMPORTED_MODULE_6__["CardButtonsComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_7__["GListService"], _Services_frormat_service__WEBPACK_IMPORTED_MODULE_8__["FormatService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__["MatSnackBar"], _Services_helpers_service__WEBPACK_IMPORTED_MODULE_10__["HelpersService"]], { Item: [0, "Item"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_3 = !_co.Item.groceryOrBought; _ck(_v, 11, 0, currVal_3); var currVal_4 = _co.setClasses(); _ck(_v, 13, 0, currVal_4); var currVal_6 = _co.Item.groceryOrBought; _ck(_v, 18, 0, currVal_6); var currVal_7 = _co.Item; _ck(_v, 23, 0, currVal_7); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.web.Glist == null) ? null : _co.web.Glist.length); var currVal_1 = _co.web.ViewIdByname(_co.Item.name); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = _co.Item.name; _ck(_v, 9, 0, currVal_2); var currVal_5 = _co.ItemOwner.username; _ck(_v, 16, 0, currVal_5); }); }
function View_ItemCardComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-item-card", [], null, null, null, View_ItemCardComponent_0, RenderType_ItemCardComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _item_card_component__WEBPACK_IMPORTED_MODULE_11__["ItemCardComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_7__["GListService"], _Services_helpers_service__WEBPACK_IMPORTED_MODULE_10__["HelpersService"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_12__["AuthenticationService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var ItemCardComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-item-card", _item_card_component__WEBPACK_IMPORTED_MODULE_11__["ItemCardComponent"], View_ItemCardComponent_Host_0, { ItemOrginal: "ItemOrginal" }, {}, []);



/***/ }),

/***/ "./src/app/components/card-components/item-card/item-card.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/components/card-components/item-card/item-card.component.ts ***!
  \*****************************************************************************/
/*! exports provided: ItemCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemCardComponent", function() { return ItemCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _statics_Grocery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../statics/Grocery */ "./src/app/statics/Grocery.ts");
/* harmony import */ var _Services_helpers_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Services/helpers.service */ "./src/app/Services/helpers.service.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");





var ItemCardComponent = /** @class */ (function () {
    function ItemCardComponent(web, helper, auth) {
        this.web = web;
        this.helper = helper;
        this.auth = auth;
        //FormatedTimout:string;
        this.lastmore = {
            bought: false
        };
    }
    ItemCardComponent.prototype.ngOnInit = function () {
        this.Item = this.ItemOrginal;
        this.GEtLastMore();
        //this.FormatedTimout=this.SecondsToDays(this.Item.timeout) ;
        /*
        this.web.GuessTimeout(this.Item.id).subscribe(
           (response)=>{
             this.avrageTimeout=response;
            this. GEtLastMore();
        })
        */
    };
    Object.defineProperty(ItemCardComponent.prototype, "FormatedTimout", {
        get: function () {
            return this.helper.SecodsToDate(this.Item.timeout);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemCardComponent.prototype, "ItemOwner", {
        get: function () {
            var obj = { own: false, username: "" };
            if (this.auth.CurrentUser.UserName == this.Item.owner) {
                obj.own = true;
            }
            obj.username = this.Item.owner;
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    //Get Details
    ItemCardComponent.prototype.setClasses = function () {
        var classes = {
            MeOwner: this.ItemOwner.own
        };
        return classes;
    };
    ItemCardComponent.prototype.GetDetails = function (index) {
        this.web.getGroceryDetails(index).subscribe(function (res) {
            console.log(res);
        });
    };
    //--------------Helper Methods
    ItemCardComponent.prototype.GEtLastMore = function () {
        var lastmoreServer = this.Item.moreInformations[this.Item.moreInformations.length - 1];
        this.lastmore = lastmoreServer ? lastmoreServer : this.lastmore;
    };
    return ItemCardComponent;
}());



/***/ }),

/***/ "./src/app/components/list/list.component.css.shim.ngstyle.js":
/*!********************************************************************!*\
  !*** ./src/app/components/list/list.component.css.shim.ngstyle.js ***!
  \********************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".card[_ngcontent-%COMP%]{\r\n   \r\n   margin-top: 15px;\r\n}\r\n.ul[_ngcontent-%COMP%]{\r\n    padding: 0;\r\n}\r\n.bar[_ngcontent-%COMP%]{\r\n  \r\n    padding-top: 0;\r\n    height: 40px;\r\n}\r\n.matbar[_ngcontent-%COMP%]{\r\n    background-color: #208888;\r\n}\r\n.matbar2[_ngcontent-%COMP%]{\r\n    background-color: #208888;\r\n    color: #000;\r\n}\r\n.mat-divider[_ngcontent-%COMP%]{\r\n    height: 20px;\r\n}"];



/***/ }),

/***/ "./src/app/components/list/list.component.ngfactory.js":
/*!*************************************************************!*\
  !*** ./src/app/components/list/list.component.ngfactory.js ***!
  \*************************************************************/
/*! exports provided: RenderType_ListComponent, View_ListComponent_0, View_ListComponent_Host_0, ListComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_ListComponent", function() { return RenderType_ListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ListComponent_0", function() { return View_ListComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ListComponent_Host_0", function() { return View_ListComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListComponentNgFactory", function() { return ListComponentNgFactory; });
/* harmony import */ var _list_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.component.css.shim.ngstyle */ "./src/app/components/list/list.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_toolbar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/toolbar/typings/index.ngfactory */ "./node_modules/@angular/material/toolbar/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _card_components_item_card_item_card_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../card-components/item-card/item-card.component.ngfactory */ "./src/app/components/card-components/item-card/item-card.component.ngfactory.js");
/* harmony import */ var _card_components_item_card_item_card_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../card-components/item-card/item-card.component */ "./src/app/components/card-components/item-card/item-card.component.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _Services_helpers_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Services/helpers.service */ "./src/app/Services/helpers.service.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _card_components_button_components_add_button_add_button_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../card-components/button-components/add-button/add-button.component.ngfactory */ "./src/app/components/card-components/button-components/add-button/add-button.component.ngfactory.js");
/* harmony import */ var _card_components_button_components_add_button_add_button_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../card-components/button-components/add-button/add-button.component */ "./src/app/components/card-components/button-components/add-button/add-button.component.ts");
/* harmony import */ var _Services_styler_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../Services/styler.service */ "./src/app/Services/styler.service.ts");
/* harmony import */ var _card_components_add_card_add_card_component_ngfactory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../card-components/add-card/add-card.component.ngfactory */ "./src/app/components/card-components/add-card/add-card.component.ngfactory.js");
/* harmony import */ var _card_components_add_card_add_card_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../card-components/add-card/add-card.component */ "./src/app/components/card-components/add-card/add-card.component.ts");
/* harmony import */ var _Services_frormat_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../Services/frormat.service */ "./src/app/Services/frormat.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _list_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./list.component */ "./src/app/components/list/list.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



















var styles_ListComponent = [_list_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_ListComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_ListComponent, data: { "animation": [{ type: 7, name: "listAnimate", definitions: [{ type: 1, expr: "* => *", animation: [{ type: 11, selector: ".card_item:enter", animation: { type: 6, styles: { height: 0 }, offset: null }, options: { optional: true } }, { type: 11, selector: ".card_item:leave", animation: { type: 6, styles: { height: "*" }, offset: null }, options: { optional: true } }, { type: 11, selector: ".card_item:enter", animation: { type: 12, timings: "200ms ease", animation: { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { transform: "translate3d(0, -100%, 0)", visibility: "visible", height: 0, offset: 0 }, offset: null }, { type: 6, styles: { transform: "translate3d(0, 0, 0)", height: "*", offset: 1 }, offset: null }] }, timings: "300ms ease" } }, options: { optional: true } }, { type: 11, selector: ".card_item:leave", animation: { type: 12, timings: "100ms ease", animation: { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 1, height: "*", offset: 0 }, offset: null }, { type: 6, styles: { height: 0, opacity: 0, offset: 1 }, offset: null }] }, timings: "500ms ease" } }, options: { optional: true } }], options: null }], options: {} }, { type: 7, name: "neededAnimation", definitions: [{ type: 1, expr: "* => *", animation: [{ type: 11, selector: ".card_item:enter", animation: { type: 6, styles: { height: 0 }, offset: null }, options: { optional: true } }, { type: 11, selector: ".card_item:leave", animation: { type: 6, styles: { height: "*" }, offset: null }, options: { optional: true } }, { type: 11, selector: ".card_item:enter", animation: { type: 12, timings: "200ms ease", animation: { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { transform: "translate3d(0, -100%, 0)", visibility: "visible", height: 0, offset: 0 }, offset: null }, { type: 6, styles: { transform: "translate3d(0, 0, 0)", height: "*", offset: 1 }, offset: null }] }, timings: "300ms ease" } }, options: { optional: true } }, { type: 11, selector: ".card_item:leave", animation: { type: 12, timings: "100ms ease", animation: { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 1, height: "*", offset: 0 }, offset: null }, { type: 6, styles: { height: 0, opacity: 0, offset: 1 }, offset: null }] }, timings: "500ms ease" } }, options: { optional: true } }], options: null }], options: {} }] } });

function View_ListComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 6, "mat-toolbar", [["class", "container-fluid matbar mat-toolbar"], ["color", "primary"]], [[2, "mat-toolbar-multiple-rows", null], [2, "mat-toolbar-single-row", null]], null, null, _node_modules_angular_material_toolbar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatToolbar_0"], _node_modules_angular_material_toolbar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatToolbar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4243456, null, 1, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__["MatToolbar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { _toolbarRows: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 1, 3, "mat-toolbar-row", [["class", "mat-toolbar-row"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, [[1, 4]], 0, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__["MatToolbarRow"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["the Grocery List"]))], function (_ck, _v) { var currVal_2 = "primary"; _ck(_v, 1, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._toolbarRows.length > 0); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._toolbarRows.length === 0); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_ListComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "card_item"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "app-item-card", [], null, null, null, _card_components_item_card_item_card_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_ItemCardComponent_0"], _card_components_item_card_item_card_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_ItemCardComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 114688, null, 0, _card_components_item_card_item_card_component__WEBPACK_IMPORTED_MODULE_7__["ItemCardComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_8__["GListService"], _Services_helpers_service__WEBPACK_IMPORTED_MODULE_9__["HelpersService"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"]], { ItemOrginal: [0, "ItemOrginal"] }, null)], function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 2, 0, currVal_0); }, null); }
function View_ListComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "card_item"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "app-item-card", [], null, null, null, _card_components_item_card_item_card_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["View_ItemCardComponent_0"], _card_components_item_card_item_card_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["RenderType_ItemCardComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 114688, null, 0, _card_components_item_card_item_card_component__WEBPACK_IMPORTED_MODULE_7__["ItemCardComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_8__["GListService"], _Services_helpers_service__WEBPACK_IMPORTED_MODULE_9__["HelpersService"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"]], { ItemOrginal: [0, "ItemOrginal"] }, null)], function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 2, 0, currVal_0); }, null); }
function View_ListComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 10, "div", [["class", "NeededListContainer"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 6, "mat-toolbar", [["class", "container-fluid matbar2 mat-toolbar"], ["color", "primary"]], [[2, "mat-toolbar-multiple-rows", null], [2, "mat-toolbar-single-row", null]], null, null, _node_modules_angular_material_toolbar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatToolbar_0"], _node_modules_angular_material_toolbar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatToolbar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 4243456, null, 1, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__["MatToolbar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { _toolbarRows: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, 1, 3, "mat-toolbar-row", [["class", "mat-toolbar-row"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 16384, [[2, 4]], 0, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__["MatToolbarRow"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["the Bought List"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 2, "ul", [["class", "ul list-unstyled list-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ListComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_2 = "primary"; _ck(_v, 2, 0, currVal_2); var currVal_3 = _co.web.NeededOnly; _ck(_v, 10, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._toolbarRows.length > 0); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2)._toolbarRows.length === 0); _ck(_v, 1, 0, currVal_0, currVal_1); }); }
function View_ListComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 17, "div", [["class", "container position-relative"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "app-add-button", [], null, null, null, _card_components_button_components_add_button_add_button_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__["View_AddButtonComponent_0"], _card_components_button_components_add_button_add_button_component_ngfactory__WEBPACK_IMPORTED_MODULE_11__["RenderType_AddButtonComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 114688, null, 0, _card_components_button_components_add_button_add_button_component__WEBPACK_IMPORTED_MODULE_12__["AddButtonComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_8__["GListService"], _Services_styler_service__WEBPACK_IMPORTED_MODULE_13__["StylerService"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 11, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 10, "div", [["class", "ListContainer"]], [[24, "@listAnimate", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ListComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 3, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 2, "ul", [["class", "ul list-unstyled list-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 1, "app-add-card", [], null, null, null, _card_components_add_card_add_card_component_ngfactory__WEBPACK_IMPORTED_MODULE_14__["View_AddCardComponent_0"], _card_components_add_card_add_card_component_ngfactory__WEBPACK_IMPORTED_MODULE_14__["RenderType_AddCardComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 114688, null, 0, _card_components_add_card_add_card_component__WEBPACK_IMPORTED_MODULE_15__["AddCardComponent"], [_Services_frormat_service__WEBPACK_IMPORTED_MODULE_16__["FormatService"], _Services_g_list_service__WEBPACK_IMPORTED_MODULE_8__["GListService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__["MatSnackBar"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"], _Services_styler_service__WEBPACK_IMPORTED_MODULE_13__["StylerService"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 3, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 2, "ul", [["class", "ul list-unstyled list-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ListComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 2, "div", [["class", "ListContainer"]], [[24, "@neededAnimation", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ListComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; _ck(_v, 2, 0); var currVal_1 = (_co.web.BoughtOnly && (((_co.web.BoughtOnly == null) ? null : _co.web.BoughtOnly.length) > 0)); _ck(_v, 6, 0, currVal_1); _ck(_v, 10, 0); var currVal_2 = _co.web.BoughtOnly; _ck(_v, 14, 0, currVal_2); var currVal_4 = (_co.web.NeededOnly && (((_co.web.NeededOnly == null) ? null : _co.web.NeededOnly.length) > 0)); _ck(_v, 17, 0, currVal_4); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.web.BoughtOnly == null) ? null : _co.web.BoughtOnly.length); _ck(_v, 4, 0, currVal_0); var currVal_3 = ((_co.web.NeededOnly == null) ? null : _co.web.NeededOnly.length); _ck(_v, 15, 0, currVal_3); }); }
function View_ListComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-g-list", [], null, null, null, View_ListComponent_0, RenderType_ListComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 245760, null, 0, _list_component__WEBPACK_IMPORTED_MODULE_18__["ListComponent"], [_Services_g_list_service__WEBPACK_IMPORTED_MODULE_8__["GListService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var ListComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-g-list", _list_component__WEBPACK_IMPORTED_MODULE_18__["ListComponent"], View_ListComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/list/list.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/list/list.component.ts ***!
  \***************************************************/
/*! exports provided: ListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListComponent", function() { return ListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");


//import { jos } from "../myanimations";
var ListComponent = /** @class */ (function () {
    //public web;
    function ListComponent(web) {
        this.web = web;
        this.NeededOnly = this.web.NeededOnly;
        this.Show = false;
        this.loaded = false;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loaded = true;
        var ExcuteOnSuccess = function () {
            console.log("this.web.Glist");
            console.log(_this.web.Glist);
            if (!_this.web.Glist || _this.web.Glist.length == 0)
                if (!_this.web.showAddCard)
                    _this.web.clickAddCardButton$.next(true);
        };
        this.web.UpdateList$.next({ loading: true, ExcuteOnSuccess: ExcuteOnSuccess });
    };
    ListComponent.prototype.testRefresh = function (num, sequential) {
        var _this = this;
        if (sequential === void 0) { sequential = false; }
        var t0 = performance.now();
        console.log("started", t0);
        var requestNumber = 0;
        var getRequest = function (func) {
            if (func === void 0) { func = null; }
            _this.web.getGroceries().subscribe(function (response) {
                requestNumber++;
                func();
            }, function (e) {
                console.log("g-list error");
                console.error(e);
                requestNumber++;
            });
        };
        var batch = function () {
            for (var i = 0; i < num; i++) {
                getRequest(function () {
                    console.log(requestNumber);
                    if (requestNumber <= num) {
                        var t1 = performance.now();
                        console.log(num + " Requests took " + (t1 - t0) + "  milliseconds," + (t1 - t0) /
                            1000 + " Secounds, avrage " + (t1 - t0) /
                            1000 /
                            num + " Secound per request");
                    }
                });
            }
        };
        var seq = function () {
            var requestnumCheck = function () {
                if (requestNumber <= num) {
                    console.log(requestNumber);
                    getRequest(requestnumCheck);
                }
                else {
                    var t1 = performance.now();
                    console.log(num + " Requests took " + (t1 - t0) + "  milliseconds," + (t1 - t0) /
                        1000 + " Secounds, avrage " + (t1 - t0) /
                        1000 /
                        num + " Secound per request");
                }
            };
            getRequest(requestnumCheck);
        };
        if (seq) {
            seq();
        }
        if (!seq) {
            batch();
        }
    };
    ListComponent.prototype.ngOnDestroy = function () {
        console.log("glist Destroyed");
    };
    return ListComponent;
}()); //class



/***/ }),

/***/ "./src/app/components/topnav/topnav.component.css.shim.ngstyle.js":
/*!************************************************************************!*\
  !*** ./src/app/components/topnav/topnav.component.css.shim.ngstyle.js ***!
  \************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".blackbox[_ngcontent-%COMP%]{\r\n    background-color: red;\r\n    width: 100px;\r\n    height: 100px;\r\n    display: block;\r\n    position: absolute\r\n}"];



/***/ }),

/***/ "./src/app/components/topnav/topnav.component.ngfactory.js":
/*!*****************************************************************!*\
  !*** ./src/app/components/topnav/topnav.component.ngfactory.js ***!
  \*****************************************************************/
/*! exports provided: RenderType_TopnavComponent, View_TopnavComponent_0, View_TopnavComponent_Host_0, TopnavComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_TopnavComponent", function() { return RenderType_TopnavComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_TopnavComponent_0", function() { return View_TopnavComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_TopnavComponent_Host_0", function() { return View_TopnavComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopnavComponentNgFactory", function() { return TopnavComponentNgFactory; });
/* harmony import */ var _topnav_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./topnav.component.css.shim.ngstyle */ "./src/app/components/topnav/topnav.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _account_components_userbar_userbar_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../account-components/userbar/userbar.component.ngfactory */ "./src/app/components/account-components/userbar/userbar.component.ngfactory.js");
/* harmony import */ var _account_components_userbar_userbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../account-components/userbar/userbar.component */ "./src/app/components/account-components/userbar/userbar.component.ts");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_auth.collection/_services/user.service */ "./src/app/_auth.collection/_services/user.service.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");
/* harmony import */ var _node_modules_angular_material_toolbar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/toolbar/typings/index.ngfactory */ "./node_modules/@angular/material/toolbar/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../node_modules/@angular/material/button/typings/index.ngfactory */ "./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _topnav_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./topnav.component */ "./src/app/components/topnav/topnav.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


















var styles_TopnavComponent = [_topnav_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_TopnavComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_TopnavComponent, data: {} });

function View_TopnavComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "float-right"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "app-userbar", [["class", "left"]], null, null, null, _account_components_userbar_userbar_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_UserbarComponent_0"], _account_components_userbar_userbar_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_UserbarComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 114688, null, 0, _account_components_userbar_userbar_component__WEBPACK_IMPORTED_MODULE_3__["UserbarComponent"], [_auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"], _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"], _Services_g_list_service__WEBPACK_IMPORTED_MODULE_8__["GListService"]], null, null)], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
function View_TopnavComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 14, "mat-toolbar", [["class", "navbar-container mat-toolbar"]], [[2, "mat-toolbar-multiple-rows", null], [2, "mat-toolbar-single-row", null]], null, null, _node_modules_angular_material_toolbar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["View_MatToolbar_0"], _node_modules_angular_material_toolbar_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_9__["RenderType_MatToolbar"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4243456, null, 1, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__["MatToolbar"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__["Platform"], _angular_common__WEBPACK_IMPORTED_MODULE_12__["DOCUMENT"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { _toolbarRows: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 1, 11, "mat-toolbar-row", [["class", "mat-toolbar-row"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, [[1, 4]], 0, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__["MatToolbarRow"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 9, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 8, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 4, "div", [["class", "col-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 3, "button", [["class", "float-left nav-logo"], ["mat-button", ""], ["routerLink", "/"]], [[8, "disabled", 0], [2, "_mat-animation-noopable", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__["View_MatButton_0"], _node_modules_angular_material_button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_13__["RenderType_MatButton"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 16384, null, 0, _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLink"], [_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"], [8, null], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButton"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__["Platform"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_15__["FocusMonitor"], [2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__["ANIMATION_MODULE_TYPE"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, 0, [" Fridge Notes"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 2, "div", [["class", "col-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_TopnavComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_4 = "/"; _ck(_v, 9, 0, currVal_4); var currVal_5 = _co.auth.CurrentUser.UserName; _ck(_v, 14, 0, currVal_5); }, function (_ck, _v) { var currVal_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._toolbarRows.length > 0); var currVal_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 1)._toolbarRows.length === 0); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).disabled || null); var currVal_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10)._animationMode === "NoopAnimations"); _ck(_v, 8, 0, currVal_2, currVal_3); }); }
function View_TopnavComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-topnav", [], null, null, null, View_TopnavComponent_0, RenderType_TopnavComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _topnav_component__WEBPACK_IMPORTED_MODULE_17__["TopnavComponent"], [_auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"], _Services_g_list_service__WEBPACK_IMPORTED_MODULE_8__["GListService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var TopnavComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-topnav", _topnav_component__WEBPACK_IMPORTED_MODULE_17__["TopnavComponent"], View_TopnavComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/topnav/topnav.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/topnav/topnav.component.ts ***!
  \*******************************************************/
/*! exports provided: TopnavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopnavComponent", function() { return TopnavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _Services_g_list_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Services/g-list.service */ "./src/app/Services/g-list.service.ts");



var TopnavComponent = /** @class */ (function () {
    function TopnavComponent(auth, web) {
        this.auth = auth;
        this.web = web;
        this.animate = false;
    }
    //JSONCSS=JSONCSS
    TopnavComponent.prototype.ngOnInit = function () { };
    TopnavComponent.prototype.triggerLoading = function () {
        if (this.web.Loading == false) {
            this.web.Loading$.next(true);
            console.log(true, "start");
            return;
        }
        if (this.web.Loading == true) {
            this.web.Loading$.next(false);
            console.log(false, "ended");
            return;
        }
    };
    return TopnavComponent;
}());



/***/ }),

/***/ "./src/app/email-verification/email-verification.component.css.shim.ngstyle.js":
/*!*************************************************************************************!*\
  !*** ./src/app/email-verification/email-verification.component.css.shim.ngstyle.js ***!
  \*************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".verify-email-card[_ngcontent-%COMP%]{\r\n    margin-top: 30px;\r\n}"];



/***/ }),

/***/ "./src/app/email-verification/email-verification.component.ngfactory.js":
/*!******************************************************************************!*\
  !*** ./src/app/email-verification/email-verification.component.ngfactory.js ***!
  \******************************************************************************/
/*! exports provided: RenderType_EmailVerificationComponent, View_EmailVerificationComponent_0, View_EmailVerificationComponent_Host_0, EmailVerificationComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_EmailVerificationComponent", function() { return RenderType_EmailVerificationComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_EmailVerificationComponent_0", function() { return View_EmailVerificationComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_EmailVerificationComponent_Host_0", function() { return View_EmailVerificationComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailVerificationComponentNgFactory", function() { return EmailVerificationComponentNgFactory; });
/* harmony import */ var _email_verification_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./email-verification.component.css.shim.ngstyle */ "./src/app/email-verification/email-verification.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/@angular/material/card/typings/index.ngfactory */ "./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _email_verification_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./email-verification.component */ "./src/app/email-verification/email-verification.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _auth_collection_services_Roles_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_auth.collection/_services/Roles.service */ "./src/app/_auth.collection/_services/Roles.service.ts");
/* harmony import */ var _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_auth.collection/_services/user.service */ "./src/app/_auth.collection/_services/user.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










var styles_EmailVerificationComponent = [_email_verification_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_EmailVerificationComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_EmailVerificationComponent, data: {} });

function View_EmailVerificationComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 2, "mat-card", [["class", "row justify-content-center verify-email-card mat-card"]], null, null, null, _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatCard_0"], _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCard"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 0, "div", [], [[8, "innerHTML", 1]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.Htmlmessage; _ck(_v, 3, 0, currVal_0); }); }
function View_EmailVerificationComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-email-verification", [], null, null, null, View_EmailVerificationComponent_0, RenderType_EmailVerificationComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _email_verification_component__WEBPACK_IMPORTED_MODULE_4__["EmailVerificationComponent"], [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"], _auth_collection_services_Roles_service__WEBPACK_IMPORTED_MODULE_7__["RolesService"], _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__["MatSnackBar"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var EmailVerificationComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-email-verification", _email_verification_component__WEBPACK_IMPORTED_MODULE_4__["EmailVerificationComponent"], View_EmailVerificationComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/email-verification/email-verification.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/email-verification/email-verification.component.ts ***!
  \********************************************************************/
/*! exports provided: EmailVerificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailVerificationComponent", function() { return EmailVerificationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _auth_collection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_auth.collection */ "./src/app/_auth.collection/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_collection_services_Roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_auth.collection/_services/Roles.service */ "./src/app/_auth.collection/_services/Roles.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var EmailVerificationComponent = /** @class */ (function () {
    function EmailVerificationComponent(router, route, auth, rolesSrv, userSrv, snack) {
        this.router = router;
        this.route = route;
        this.auth = auth;
        this.rolesSrv = rolesSrv;
        this.userSrv = userSrv;
        this.snack = snack;
        this.checkemailMassage = "Sending Verification ...";
        this.Htmlmessage = this.checkemailMassage;
    }
    EmailVerificationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.route.queryParams.subscribe(function (params) {
                            // Defaults to 0 if no query param provided.
                            _this.ConfirmeId = params['Id'];
                            _this.ConfirmeVerCode = params['verCode'];
                        })];
                    case 1:
                        _a.sent();
                        if (!(this.ConfirmeId && this.ConfirmeVerCode)) return [3 /*break*/, 3];
                        this.Htmlmessage = "Verifing Account...";
                        return [4 /*yield*/, this.sendConfirmation().subscribe(function (r) {
                                if (r.isSuccessful) {
                                    _this.Htmlmessage = "Email verified Successfully";
                                    _this.router.navigate(['/login']);
                                }
                            }, function (e) {
                                _this.Htmlmessage = "Email verification failed";
                                console.log(e);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.Htmlmessage = "Bad arguments";
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }; //ngOnInit()
    EmailVerificationComponent.prototype.sendConfirmation = function () {
        return this.userSrv.ConfirmEmailAccount(this.ConfirmeId, this.ConfirmeVerCode);
    };
    return EmailVerificationComponent;
}()); //class



/***/ }),

/***/ "./src/app/registration-check-emails/registration-check-emails.component.css.shim.ngstyle.js":
/*!***************************************************************************************************!*\
  !*** ./src/app/registration-check-emails/registration-check-emails.component.css.shim.ngstyle.js ***!
  \***************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".check-email-card[_ngcontent-%COMP%]{\r\n    margin-top: 30px;\r\n}"];



/***/ }),

/***/ "./src/app/registration-check-emails/registration-check-emails.component.ngfactory.js":
/*!********************************************************************************************!*\
  !*** ./src/app/registration-check-emails/registration-check-emails.component.ngfactory.js ***!
  \********************************************************************************************/
/*! exports provided: RenderType_RegistrationCheckEmailsComponent, View_RegistrationCheckEmailsComponent_0, View_RegistrationCheckEmailsComponent_Host_0, RegistrationCheckEmailsComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_RegistrationCheckEmailsComponent", function() { return RenderType_RegistrationCheckEmailsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_RegistrationCheckEmailsComponent_0", function() { return View_RegistrationCheckEmailsComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_RegistrationCheckEmailsComponent_Host_0", function() { return View_RegistrationCheckEmailsComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationCheckEmailsComponentNgFactory", function() { return RegistrationCheckEmailsComponentNgFactory; });
/* harmony import */ var _registration_check_emails_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registration-check-emails.component.css.shim.ngstyle */ "./src/app/registration-check-emails/registration-check-emails.component.css.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/@angular/material/card/typings/index.ngfactory */ "./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _registration_check_emails_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./registration-check-emails.component */ "./src/app/registration-check-emails/registration-check-emails.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _auth_collection_services_Roles_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_auth.collection/_services/Roles.service */ "./src/app/_auth.collection/_services/Roles.service.ts");
/* harmony import */ var _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_auth.collection/_services/user.service */ "./src/app/_auth.collection/_services/user.service.ts");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










var styles_RegistrationCheckEmailsComponent = [_registration_check_emails_component_css_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_RegistrationCheckEmailsComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_RegistrationCheckEmailsComponent, data: {} });

function View_RegistrationCheckEmailsComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 2, "mat-card", [["class", "row justify-content-center check-email-card mat-card"]], null, null, null, _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MatCard_0"], _node_modules_angular_material_card_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MatCard"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 49152, null, 0, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCard"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, 0, 0, "div", [], [[8, "innerHTML", 1]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.Htmlmessage; _ck(_v, 3, 0, currVal_0); }); }
function View_RegistrationCheckEmailsComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-registration-check-emails", [], null, null, null, View_RegistrationCheckEmailsComponent_0, RenderType_RegistrationCheckEmailsComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _registration_check_emails_component__WEBPACK_IMPORTED_MODULE_4__["RegistrationCheckEmailsComponent"], [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"], _auth_collection_services_Roles_service__WEBPACK_IMPORTED_MODULE_7__["RolesService"], _auth_collection_services_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__["MatSnackBar"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var RegistrationCheckEmailsComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-registration-check-emails", _registration_check_emails_component__WEBPACK_IMPORTED_MODULE_4__["RegistrationCheckEmailsComponent"], View_RegistrationCheckEmailsComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/registration-check-emails/registration-check-emails.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/registration-check-emails/registration-check-emails.component.ts ***!
  \**********************************************************************************/
/*! exports provided: RegistrationCheckEmailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationCheckEmailsComponent", function() { return RegistrationCheckEmailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_collection_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_auth.collection/_services/authentication.service */ "./src/app/_auth.collection/_services/authentication.service.ts");
/* harmony import */ var _auth_collection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_auth.collection */ "./src/app/_auth.collection/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_collection_services_Roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_auth.collection/_services/Roles.service */ "./src/app/_auth.collection/_services/Roles.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var RegistrationCheckEmailsComponent = /** @class */ (function () {
    function RegistrationCheckEmailsComponent(router, route, auth, rolesSrv, userSrv, snack) {
        this.router = router;
        this.route = route;
        this.auth = auth;
        this.rolesSrv = rolesSrv;
        this.userSrv = userSrv;
        this.snack = snack;
        this.currentuser = auth.CurrentUser;
        this.checkemailMassage = "Please Check Your email <h3>" + this.currentuser.Email + "</h3> to Complete registration, Make sure to check spam folder too\n    \n    ";
    }
    RegistrationCheckEmailsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("updateCurrentUserFromServer()");
                this.RestartUserFromServer(_auth_collection__WEBPACK_IMPORTED_MODULE_2__["MyRoles"].unverfied, "/", this.currentuser);
                return [2 /*return*/];
            });
        });
    }; //ngInit()
    RegistrationCheckEmailsComponent.prototype.RestartUserFromServer = function (role, naviagte, userdro) {
        var _this = this;
        var reponse = this.auth.updateCurrentUserFromServer();
        var interv = setInterval(function (d) {
            if (reponse.closed) {
                console.log("reponse.closed", userdro);
                var hasRole = _this.rolesSrv.hasRole(userdro, role);
                if (hasRole)
                    _this.Htmlmessage = _this.checkemailMassage;
                else
                    _this.router.navigate([naviagte]);
                clearInterval(interv);
            }
        }, 500);
    };
    return RegistrationCheckEmailsComponent;
}()); //class



/***/ }),

/***/ "./src/app/statics/Grocery.ts":
/*!************************************!*\
  !*** ./src/app/statics/Grocery.ts ***!
  \************************************/
/*! exports provided: Grocery, MoreInformation, Keyframe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grocery", function() { return Grocery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoreInformation", function() { return MoreInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Keyframe", function() { return Keyframe; });
var Grocery = /** @class */ (function () {
    function Grocery() {
    }
    return Grocery;
}());

var MoreInformation = /** @class */ (function () {
    function MoreInformation() {
    }
    return MoreInformation;
}());

var Keyframe = /** @class */ (function () {
    function Keyframe() {
    }
    return Keyframe;
}());



/***/ }),

/***/ "./src/app/statics/config.ts":
/*!***********************************!*\
  !*** ./src/app/statics/config.ts ***!
  \***********************************/
/*! exports provided: _BaseUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_BaseUrl", function() { return _BaseUrl; });
//export const _BaseUrl = "https://linux-docker-4.herokuapp.com/api/GroceriesApi";
//export const _BaseUrl = "http://localhost:6291";
//export const _BaseUrl = "https://localhost:50001";
//export const _BaseUrl = "http://localhost:5000";
var _BaseUrl = "https://linux-docker-5.herokuapp.com";
//export const _BaseUrl = "https://linux-docker-5.herokuapp.com/api/GroceriesApi";


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module.ngfactory */ "./src/app/app.module.ngfactory.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["platformBrowser"]().bootstrapModuleFactory(_app_app_module_ngfactory__WEBPACK_IMPORTED_MODULE_3__["AppModuleNgFactory"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Data\Dev\Projects\fridge-notes\fridge-notes\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map