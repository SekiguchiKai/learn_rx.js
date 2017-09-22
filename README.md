# learn_rx.js
To learn Rx.js.

# Rx.jsとは
JavaScript向けのReactive Extensions ライブラリ。
https://github.com/reactivex/rxjs

##

> The Reactive Extensions (Rx) is a library for composing asynchronous and
 event-based programs using observable sequences and LINQ-style query operators.

(意訳)
Reactive Extensions (Rx)は、非同期を構成し、observableのシーケンスとLINQ-styleのクエリオペレータを使用した
イベントベースのプログラムである。

引用元 : [Rx (Reactive Extensions) - Home](https://rx.codeplex.com/)


# リアクティブプログラミングって何
リアクティブプログラミングについて様々な説明のされ方があるが、以下の説明が一番ピンときた。

> リアクティブプログラミングとは、通知されてくるデータを受け取るたびに関連したプログラムが反応し(リアクション)して、処理を
行うようにするプログラミングの考え方です。

(引用元 : 須田智之 (2017/2/16)『RxJavaリアクティブプログラミング』 翔泳社)

## データストリーム
このリアクティブプログラミングでは、データがあらかじめ決まっているのではなく、随時データが生成され、その都度そのデータが
送信されてくる。
この随時データが生成されてその都度流れてくるデータの流れをデータストリームという。
リアクティブプログラミングでは、あらかじめ用意されている固定長のデータだけではなく、随時発生するデータを処理することができる。

( 参考文献 :
[「RxJS」初心者入門 - JavaScriptの非同期処理の常識を変えるライブラリ](https://liginc.co.jp/web/js/151272) )
(参考文献 : 須田智之 (2017/2/16)『RxJavaリアクティブプログラミング』 翔泳社)

## ProducerとConsumerとは
リアクティブプログラミングには、ProducerとConsumerという2つの立場が存在する。


### Producer
データを生成し、そのデータを通知する責務を持つ。
Rx.jsではObservableがこれに当たる。

>  An Observable emits items or sends notifications to its observers by calling the observers’ methods.

(引用元 : [ReactiveX - Observable](http://reactivex.io/documentation/observable.html))
【意訳】Observableは、アイテム(データなど)を排出し、observerのメソッドを呼び出すことによって、自身のobserverに通知を送信する。




### Consumer
データを受信し、必要な処理を行う責任を持つ。
Rx.jsではObserverがこれに当たる。

> In ReactiveX an observer subscribes to an Observable. Then that observer reacts to whatever item or sequence of items the Observable emits.

(引用元 : [ReactiveX - Observable](http://reactivex.io/documentation/observable.html))
【意訳】ReactiveXでは、ObserverはObservableを購読する。それから、ObserverはObservableがが生成するいかなるアイテム(データなど)やアイテム(データなど)のシーケンスに対して反応する。




#
データストリームにデータが流れてくる
このデータストリームは、Observable sequencesと呼ばれる。
ObservableにはLINQ query operatorsってのがあって、ここで諸々の処理を行う
この処理を終えた後に、Observableが購読者であるObserverに対して、通知を行う。
通知を受けたObserverは、データを受け取って諸々の処理を行う
生産者がデータを生成することもある

(参考文献 : [Rx (Reactive Extensions) - Home](https://rx.codeplex.com/))

====
# Observable

##


subscribe
> It is not a coincidence that observable.subscribe and subscribe in Observable.create(function subscribe(observer) {...}) have the same name. In the library, they are different, but for practical purposes you can consider them conceptually equal.
> This shows how subscribe calls are not shared among multiple Observers of the same Observable. When calling observable.subscribe with an Observer, the function subscribe in Observable.create(function subscribe(observer) {...}) is run for that given Observer. Each call to observable.subscribe triggers its own independent setup for that given Observer.
(引用元 : [Overview](http://reactivex.io/rxjs/manual/overview.html#creating-observables))
(意訳)
同一名称の `observable.subscribe` と `Observable.create(function subscribe(observer) {...})` の中のsubscribeは、一致しない。
これは、同一のObservableの複数のObserverの間で、subscribeの呼び出しが、共有されていないことを意味する。
Observerによって、 `observable.subscribe` が呼び出された時には、`Observable.create(function subscribe(observer) {...})` の中の
`subscribe` 関数が、(引数で)与えられたObserverに対して動作する。
何の `observable.subscribe` に対する呼び出しも、与えられたObserverに対して、自身の独自の設定を引き起こす。

