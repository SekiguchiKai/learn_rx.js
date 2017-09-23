"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
/**
 * Created by sekiguchikai on 2017/09/23.
 */
// 0~5のObservableを生成
var observable = rxjs_1.Observable.interval(20);
// Subjectのインスタンスを生成
var subject = new rxjs_1.Subject();
// Subjectを元にObservableを生成(Multicasted Observablesではないことに注意!)
var refCountedmultiCastedObservable = observable.multicast(subject).refCount();
// 冗長だが、わかりやすくするためObserverのオブジェクトをここで生成
var observer1 = {
    next: function (value) {
        console.log("observer1 : " + value);
    }
};
var observer2 = {
    next: function (value) {
        console.log("observer2 : " + value);
    }
};
console.log('observer1 subscribed');
var subscription1 = refCountedmultiCastedObservable.subscribe(observer1);
console.log('observer2 subscribed');
var subscription2 = refCountedmultiCastedObservable.subscribe(observer2);
setTimeout(function () {
    console.log('observer1 unsubscribed');
    subscription1.unsubscribe();
}, 50);
setTimeout(function () {
    console.log('observer2 unsubscribed');
    subscription2.unsubscribe();
}, 100);
