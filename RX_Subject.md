# RxJSの基本をまとめてみた~Subject編~


## 今回の範囲
今回は、Subjectの基本部分についてまとめる。
[RxJSの公式ドキュメント](http://reactivex.io/rxjs/)をかなり参考にさせていただいた。
ObservableやObserverって何?という方は、まず[こちら](https://qiita.com/Sekky0905/items/93bd4804a2003ed0aa8d)を読んでください。

## Subjectとは
Subjectとは、ObservableとObserverのどちらとしても使える実装。
なので、SubjectはObserverとして1つ以上のObservableをsubscribeできるし、
Observableとして、新しいデータを生成したり、Observerにデータを通知することができる。

後述するが、マルチキャストが可能だという特徴もある。

### Subject as an Observable.
Observableとして扱えるので、普通にObserverにsubscribeしてもらえる。
#### multi cast
Subjectは、複数のObserverに対してデータをマルチキャストすることができる。
通常のObservableは、1つのObserverに対してしかデータを通知することができない。(ユニキャスト)

Subjectの内部で、与えられたObserverをObserverのリストに登録しているだけである。
これはEventListerみたいなもので、ハンドラーをどんどんEventListerに追加していくようなものである。


### Subject as an Observer.
Observerとして扱えるので、 `next()` 、 `error()` 、 `complete()` メソッドを持っている。
#### multi cast
値を `next()` メソッドの引数に与えれば、Subjectに登録しておいた複数のObserverにマルチキャストしてくれる。

### Subjectを使用してみた
Subjectは、ObserverにもObservableにもなれるという例1。

```ts
import {Subject, Observable} from "rxjs";

 // Subjectのインスタンスを生成
 let subject = new Subject;
 
 // 冗長だけれども理解の促進のためにObserverのオブジェクトをここで生成
 let observer1 = {next: (value) => console.log(`observer1ですよ : ${value}`)};
 let observer2 = {next: (value) => console.log(`observer2ですよ : ${value}`)};
 
 // ObservableとしてのSubjectのsubscribeメソッド
 // 引数にObserverオブジェクトを与えている
 // 2つのObserverオブジェクトをSubjectのObserverのリスト追加する。
 // これで、2つのObserver(実際は、Subject)にマルチキャストすることができるようになった
 subject.subscribe(observer1);
 subject.subscribe(observer2);
 
 // ObserverとしてのSubject
 subject.next('A');
 subject.next('B');

```


Subjectは、ObserverにもObservableにもなれるという例2。

```ts
import {Subject, Observable} from "rxjs";

// subjectのインスタンスを生成
let subject = new Subject();

// subject.subscribe(observe)でSubjectのObserverリストに登録
subject.subscribe({
    next: (value) => console.log(`observerAですよ : ${value}`)
});

subject.subscribe({
    next: (value) => console.log(`observerBですよ : ${value}`)
});

// 1から5までの数字を作成
let observable = Observable.range(1, 5);

// SubjectはObserverでもあるんだ!
observable.subscribe(subject);
```

Subjectを使用して、ユニキャストのObservableの実行をユニキャストにしている。

参考 : 
[Overview - Subject](http://reactivex.io/rxjs/manual/overview.html#subject)

## Cold Observable vs Hot Observable
Observableには、ColdなObservableとHotなObservableが存在する。

###  Cold Observable 
普通に生成されるは基本的にCold Observableとなる。
Cold Observableは、1つのにObserverのみにsubscribeされる。

### Hot Observable
特別のHot Observableに変換されるオペレータによってColdから変換されて生成されるか、本記事で説明するSubjectによって生成される。
また後述するConnectableObservableは、Cold Observableからオペレータを使用して変換されたHot Observableである。

参考: 
須田智之 (2017/2/16)『RxJavaリアクティブプログラミング』 翔泳社
[ReactiveX - Observable](http://reactivex.io/documentation/observable.html)


## Multicasted Observables
実は、Subscribeではなく、Observableもmulti castすることができる。
multi castするObservableをMulticasted Observableというらしい。
ただし、実際はObservableが内部的にSubjectを使用しているだけである。
同一Observableシーケンスに複数のObserverを繋げるために、Multicasted Observablesは、内部的にSubjectを使用しているのである。

参考:
[Overview - multicasted-observable](http://reactivex.io/rxjs/manual/overview.html#multicasted-observables)

### ConnectableObservable
Multicasted Observablesを生成するには、 `Observable.multicast(subject);` を使用する。
このObservableのmulticastメソッドの戻り値は、`ConnectableObservable` というオブジェクトになる。
この `ConnectableObservable` は、Observableと似ているが、subscribeの際には、Subjectのように動作する。
また、この `ConnectableObservable` は、`connect()` というメソッドを持っていてる。

参考 : 
[ConnectableObservable | RxJS API Document](http://reactivex.io/rxjs/class/es6/observable/ConnectableObservable.js~ConnectableObservable.html)

#### ConnectableObservable.connect()
`ConnectableObservable` の `connect()` メソッドは、内部的には `observable.subscribe(subject)` を行っていて、複数のObserverによって共有されているObservableを
cancelする際に使用するunsubscribeを持ったSubscriptionを戻り値として返す。
ConnectableObservableは「Hot」なObservableである。
従って、subscribeの呼び出しでは処理が開始されず、このconnectメソッドを呼び出すことによって、処理を開始することができる。

### 実装してみた

```ts 
import {Observable, Subject} from "rxjs";

// 0~5のObservableを生成
let observable = Observable.range(0, 5);
// Subjectを生成
let subject = new Subject();
// Subjectを元にMulticasted Observablesを生成
let multiCastedObservable = observable.multicast(subject);

// 冗長だが、わかりやすくするためObserverのオブジェクトをここで生成
let observer1 = {
    next : (value) => {console.log(`observer1 : ${value}`)}
};

let observer2 = {
    next : (value) => {console.log(`observer2 : ${value}`)}
};

// 同一Multicasted Observablesを複数のObserver(observer1とobserver2)がsubscribe
// ここで内部的に実際に使用されているのは、Subjectのsubscribeメソッドである
multiCastedObservable.subscribe(observer1);
multiCastedObservable.subscribe(observer2);

// ここで内部的に実際に行われているのは、Observable.subscribe(subject);
multiCastedObservable.connect();
```

### 実行結果

```
observer1 : 0
observer2 : 0
observer1 : 1
observer2 : 1
observer1 : 2
observer2 : 2
observer1 : 3
observer2 : 3
observer1 : 4
observer2 : 4
```

### ConnectableObservable.refCount()
refCountメソッドを使用すると、connectメソッドを明示的に呼び出す必要がなくなる。

> refCount makes the multicasted Observable automatically start executing when the first subscriber arrives, and stop executing when the last subscriber leaves.

引用元 : 
[Overview - Reference counting](http://reactivex.io/rxjs/manual/overview.html#reference-counting)

【意訳】
refCountは、最初のSubscriber(購読者、要するにObserverのこと)が到着した時に、自動でmulticasted Observableの実行を開始し、最後のSubscriber(購読者、要するにObserverのこと)が去った後、
multicasted Observableの実行を自動で停止する。

=> これは、要するに最初のObserverがsubscribeした時点で、Observableの実行を開始して、Observerがunsubscribeした時点で、Observableの実行を終了する。

refCountの戻り値として生成されるのは、ConnectableObservableではなく、Hot Observableである。
そのObservableは、subscribeが呼び出されると処理を開始する。unsubscribeされたり、処理が完了した場合は、再度subscribeすれば、処理が再度なされる。


### 実装してみた

この例では、observer1とobserver2の2つのObserverを使用している。
上記の通り、refCountは、「最初のObserverがsubscribeした時点で、Observableの実行を開始して、Observerがunsubscribeした時点で、Observableの実行を終了する。」
ということなので、以下のコードは以下のように実行される。

1. observer1がsubscribeする
2. 最初のObserver(observer1)がsubscribeしたので、multicasted Observableの実行が開始される
3. observer2がsubscribeする
4. 50ミリ秒後にobserver1がunsubscribeする(observer2はまだunsubscribeをしていないので、multicasted Observableの実行状態は続いている)
5. 100ミリ秒後にobserver2がunsubscribeする
6. 最後のObserver(observer2)がunsubscribeしたので、multicasted Observableの実行が停止される

```ts
import {Observable, Subject} from "rxjs";

// 20ミリ秒感覚で、連続した数字のObservableを生成
let observable = Observable.interval(20);
// Subjectのインスタンスを生成
let subject = new Subject();
// Subjectを元にObservableを生成(Multicasted Observablesではないことに注意!)
let refCountedmultiCastedObservable = observable.multicast(subject).refCount();

// 冗長だが、わかりやすくするためObserverのオブジェクトをここで生成
let observer1 = {
    next: (value) => {
        console.log(`observer1 : ${value}`)
    }
};

// 冗長だが、わかりやすくするためObserverのオブジェクトをここで生成
let observer2 = {
    next: (value) => {
        console.log(`observer2 : ${value}`)
    }
};

console.log('observer1 subscribed');
console.log('最初のObserver(observer1)がsubscribeしたので、multicasted Observableの実行が開始された');
let subscription1 = refCountedmultiCastedObservable.subscribe(observer1);

console.log('observer2 subscribed');
let subscription2 = refCountedmultiCastedObservable.subscribe(observer2);

// 50ms後にunsubscribe
setTimeout(() => {
        console.log('observer1 unsubscribed');
        subscription1.unsubscribe();
    }, 50
);

// 100ms後にunsubscribe
setTimeout(() => {
        console.log('observer2 unsubscribed');
        subscription2.unsubscribe();
    }, 100
);

setTimeout(() => {
    console.log('最後のObserver(observer2)がunsubscribeしたので、multicasted Observableの実行が停止された');
}, 100);
```

### 実行結果

```
observer1 subscribed
最初のObserver(observer1)がsubscribeしたので、multicasted Observableの実行が開始された
observer2 subscribed
observer1 : 0
observer2 : 0
observer1 : 1
observer2 : 1
observer1 unsubscribed
observer2 : 2
observer2 : 3
observer2 unsubscribed
最後のObserver(observer2)がunsubscribeしたので、multicasted Observableの実行が停止された
```

## 参考

### 参考文献
須田智之 (2017/2/16)『RxJavaリアクティブプログラミング』 翔泳社

### 参考にさせていただいたサイト
[RxJS API Document](http://reactivex.io/rxjs/)
[ReactiveX - Observable](http://reactivex.io/documentation/observable.html)

### 関連記事
[RxJSの基本をまとめてみた~基本的な概念編(Observable、Observer、Subscriptionなど)~ - Qiita](https://qiita.com/Sekky0905/items/93bd4804a2003ed0aa8d)