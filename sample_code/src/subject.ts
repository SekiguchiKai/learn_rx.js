import {Subject, Observable} from "rxjs";
/**
 * Created by sekiguchikai on 2017/09/22.
 */

// Subjectのインスタンスを生成
let subject = new Subject;

// 冗長だけれども理解の促進のためにObserverのオブジェクトをここで生成
let observer1 = {next: (value) => console.log(`observer1ですよ : ${value}`)};
let observer2 = {next: (value) => console.log(`observer2ですよ : ${value}`)};

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
let subject2 = new Subject();

// subject.subscribe(observe)でSubjectのObserverリストに登録
subject2.subscribe({
    next: (value) => console.log(`observerAですよ : ${value}`)
});

subject2.subscribe({
    next: (value) => console.log(`observerBですよ : ${value}`)
});

// 1から5までの数字を作成
let observable = Observable.range(1, 5);

// SubjectはObserverでもあるんだ!
observable.subscribe(subject2);




