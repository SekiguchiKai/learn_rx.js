import {Observable, Scheduler} from "rxjs";
/**
 * Created by sekiguchikai on 2017/11/02.
 */
// observableを定義
let observable = Observable.create((proxyObserver) => {
    proxyObserver.next();
    proxyObserver.next();
    proxyObserver.next();
    proxyObserver.complete();
}).observeOn(Scheduler.async);

// Observerを定義
let secoundObserver = {
    next: x => console.log(x),
    error: err => console.log(`err has occured : ${err}`),
    complete: ()=> console.log('completed!')
};


