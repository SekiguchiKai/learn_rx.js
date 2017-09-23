import {Observable, Subject} from "rxjs";
/**
 * Created by sekiguchikai on 2017/09/23.
 */

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