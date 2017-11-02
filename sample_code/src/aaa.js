"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var observable = rxjs_1.Observable.interval(100);
// let subscription =
observable.subscribe(function (x) { return console.log(x); });
// subscription.unsubscribe(); 
