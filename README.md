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

( 参考文献 :
[「RxJS」初心者入門 - JavaScriptの非同期処理の常識を変えるライブラリ](https://liginc.co.jp/web/js/151272) )
(参考文献 : 須田智之 (2017/2/16)『RxJavaリアクティブプログラミング』 翔泳社)

## ProducerとConsumerとは
リアクティブプログラミングには、ProducerとConsumerという2つの立場が存在する。
データストリーム

### Producer
データを生成し、そのデータを通知する責務を持つ。

### Consumer
データを受信し、必要な処理を行う責任を持つ。

#
データストリームにデータが流れてくる
このデータストリームは、Observable sequencesと呼ばれる。
ObservableにはLINQ query operatorsってのがあって、ここで諸々の処理を行う
この処理を終えた後に、Observableが購読者であるObserverに対して、通知を行う。
通知を受けたObserverは、データを受け取って諸々の処理を行う
生産者がデータを生成することもある

(参考文献 : [Rx (Reactive Extensions) - Home](https://rx.codeplex.com/))

