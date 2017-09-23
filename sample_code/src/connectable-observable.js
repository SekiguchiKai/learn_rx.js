"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
/**
 * Created by sekiguchikai on 2017/09/23.
 */
// 20ミリ秒感覚で、連続した数字のObservableを生成
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
// 冗長だが、わかりやすくするためObserverのオブジェクトをここで生成
var observer2 = {
    next: function (value) {
        console.log("observer2 : " + value);
    }
};
console.log('observer1 subscribed');
console.log('最初のObserver(observer1)がsubscribeしたので、multicasted Observableの実行が開始された');
var subscription1 = refCountedmultiCastedObservable.subscribe(observer1);
console.log('observer2 subscribed');
var subscription2 = refCountedmultiCastedObservable.subscribe(observer2);
// 50ms後にunsubscribe
setTimeout(function () {
    console.log('observer1 unsubscribed');
    subscription1.unsubscribe();
}, 50);
// 100ms後にunsubscribe
setTimeout(function () {
    console.log('observer2 unsubscribed');
    subscription2.unsubscribe();
}, 100);
setTimeout(function () {
    console.log('最後のObserver(observer2)がunsubscribeしたので、multicasted Observableの実行が停止された');
}, 100);
