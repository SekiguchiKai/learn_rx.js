# RxJSの基本をまとめてみた~Scheduler編~


## 今回の範囲
今回は、Schedulerの基本部分についてまとめる。
[RxJSの公式ドキュメント](http://reactivex.io/rxjs/manual/overview.html#scheduler)をかなり参考にさせていただいた。
ObservableやObserverって何?という方は、まず[こちら](https://qiita.com/Sekky0905/items/93bd4804a2003ed0aa8d)を、Subjectって何?って方は
[こちら](https://qiita.com/Sekky0905/items/a6534da15ce5f18e2c51)を読んでください。

## Schedulerとは
> A scheduler controls when a subscription starts and when notifications are delivered.

(意訳)
Schedulerは、subscription(購読)の開始時と通知の配送時の管理を行っている。
引用元 : [RxJSの公式ドキュメント](http://reactivex.io/rxjs/manual/overview.html#scheduler)

## Schedulerの3つのComponent

### A Scheduler is a data structure.
> A Scheduler is a data structure. It knows how to store and queue tasks based on priority or other criteria.

(意訳)
Schedulerはデータ構造である。
Schedulerは、タスクの蓄積方法と優先順位や他の基準に基づいて、タスクを先入先出しする。
引用元 : [RxJSの公式ドキュメント](http://reactivex.io/rxjs/manual/overview.html#scheduler)


### A Scheduler is an execution context.
> A Scheduler is an execution context. It denotes where and when the task is executed (e.g. immediately, or in another callback mechanism such as setTimeout or process.nextTick, or the animation frame).

(意訳)
Schedulerは、実行のコンテクスト(文脈)である。
それはつまり、いつどこでタスクが実行されるかということを示す。
(例えば、即座にだったり、setTimeoutやnextTick処理、アニメーションフレームなどの他のコールバックメカニズムのように)



引用元 : [RxJSの公式ドキュメント](http://reactivex.io/rxjs/manual/overview.html#scheduler)

### A Scheduler has a (virtual) clock.
> A Scheduler has a (virtual) clock. 
It provides a notion of "time" by a getter method now() on the scheduler. Tasks being scheduled on a particular scheduler will adhere only to the time denoted by that clock.

(意訳)
Schedulerは、(事実上の)クロック(同期をとるための周期的な信号)である。
Scheduler上でgetterメソッドnow()で、時間の概念を提供する。
特定のScheduler上でスケジュール化されたタスクは、クロックによって示された時間にのみつく。

引用元 : [RxJSの公式ドキュメント](http://reactivex.io/rxjs/manual/overview.html#scheduler)

## ObserverOn
> Wraps the source sequence in order to run its observer callbacks on the specified scheduler.
  This only invokes observer callbacks on a scheduler. 
  In case the subscription and/or unsubscription actions have side-effects that require to be run on a scheduler, use subscribeOn.

(意訳)
(ObserverOnは)特定のScheduler上で、Observerのコールバックを実行するために(データの)ソースのシーケンスをラップする(包む)。
ObserverOnは、Scheduler上でObserverのコールバックを発動させるだけである。
subscriptionと(や)unsubscriptionのアクションが、Scheduler上で実行される必要があるような副作用を持っている場合は、subscribeOnを使ってください。


引用元 : [RxJS/observeon.md at master · Reactive-Extensions/RxJS](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/observeon.md)




## 関連記事
[RxJSの基本をまとめてみた~基本的な概念編(Observable、Observer、Subscriptionなど)~ - Qiita](https://qiita.com/Sekky0905/items/93bd4804a2003ed0aa8d)
[Rxの基本をまとめてみた(コードはRxJS)~Subjectの基本編~ - Qiita](https://qiita.com/Sekky0905/items/a6534da15ce5f18e2c51)

## 参考にさせていただいたサイト
[RxJSの公式ドキュメント](http://reactivex.io/rxjs/manual/overview.html#scheduler)
[RxJS/observeon.md at master · Reactive-Extensions/RxJS](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/observeon.md)