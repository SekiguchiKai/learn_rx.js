import {Observable, Subject} from "rxjs";
/**
 * Created by sekiguchikai on 2017/09/23.
 */
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


