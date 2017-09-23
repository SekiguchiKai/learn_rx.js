"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
/**
 * Created by sekiguchikai on 2017/09/23.
 */
// 0~5のObservableを生成
var observable = rxjs_1.Observable.range(0, 5);
// Subjectを生成
var subject = new rxjs_1.Subject();
// Subjectを元にMulticasted Observablesを生成
var multiCastedObservable = observable.multicast(subject);
// 冗長だが、わかりやすくするためObserverのオブジェクトをここで生成
var observer1 = {
    next: function (value) { console.log("observer1 : " + value); }
};
var observer2 = {
    next: function (value) { console.log("observer2 : " + value); }
};
// 同一Multicasted Observablesを複数のObserver(observer1とobserver2)がsubscribe
// ここで内部的に実際に使用されているのは、Subjectのsubscribeメソッドである
multiCastedObservable.subscribe(observer1);
multiCastedObservable.subscribe(observer2);
// ここで内部的に実際に行われているのは、Observable.subscribe(subject);
multiCastedObservable.connect();
