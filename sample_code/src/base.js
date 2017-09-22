"use strict";
exports.__esModule = true;
/**
 * Created by sekiguchikai on 2017/09/19.
 */
var rxjs_1 = require("rxjs");
// Observable.createは、ObservableのコンストラクタのエイリアスでObservableのオブジェクトを生成する
// 引数に、subscribe関数を渡す
// Observableはcreateで作れるけど、基本的にcreateを使って、Observableを生成することはあまりない
// ofとかの別のoperatorから生成する
var observable = rxjs_1.Observable.create(function subscribe(observer) {
    try {
        // データを通知し、値を送信する
        // 引数は、実際にObserverに送信されるデータを表している。
        observer.next(0);
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        // 正常に完了したことを通知する
        // これが呼ばれた後にnext()しても意味がない
        observer.complete();
    }
    catch (err) {
        // エラーを通知する
        observer.error(err);
    }
});
console.log('開始');
// observable.subscribeの戻り値として、subscriptionを返却
// observable.subscribeの内部的に、Observerのオブジェクトが生成されていて、
var subscription = observable.subscribe(function (val) { return console.log(val); });
// 進行中の実行をキャンセル
// TODO ここはよく検討してから
// subscription.unsubscribe();
console.log('終了');
