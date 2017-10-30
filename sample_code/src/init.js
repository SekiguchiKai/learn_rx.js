"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
/**
 * Created by sekiguchikai on 2017/10/30.
 */
rxjs_1.Observable.create(function (observer) {
    try {
        observer.next('0');
        observer.next('1');
        observer.next('2');
        observer.complete();
    }
    catch (err) {
        observer.error(err);
    }
}).subscribe(function (value) { return console.log("onNext: " + value); }, function (error) { return console.log("onError: " + error); }, function () { return console.log("onCompleted"); });
