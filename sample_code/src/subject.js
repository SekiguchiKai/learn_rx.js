"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
/**
 * Created by sekiguchikai on 2017/09/22.
 */
// Subjectのインスタンスを生成
var subject = new rxjs_1.Subject;
// 冗長だけれども理解の促進のためにObserverのオブジェクトをここで生成
var observer1 = { next: function (value) { return console.log("observer1\u3067\u3059\u3088 : " + value); } };
var observer2 = { next: function (value) { return console.log("observer2\u3067\u3059\u3088 : " + value); } };
// Observableとしてのsubscribeメソッド
// 引数にObserverオブジェクトを与えている
// 2つのObserverオブジェクトをSubjectのObserverのリスト追加する。
// これで、2つのObserver(実際は、Subject)にマルチキャストすることができるようになった
subject.subscribe(observer1);
subject.subscribe(observer2);
// ObserverとしてのSubject
subject.next('A');
subject.next('B');
// =======================================
console.log('=====================');
console.log('SubjectはObservableも、Observerにもなれるので、なんと!こんなこともできる!');
// subjectのインスタンスを生成
var subject2 = new rxjs_1.Subject();
// subject.subscribe(observe)でSubjectのObserverリストに登録
subject2.subscribe({
    next: function (value) { return console.log("observerA\u3067\u3059\u3088 : " + value); }
});
subject2.subscribe({
    next: function (value) { return console.log("observerB\u3067\u3059\u3088 : " + value); }
});
// 1から5までの数字を作成
var observable = rxjs_1.Observable.range(1, 5);
// SubjectはObserverでもあるんだ!
observable.subscribe(subject2);
