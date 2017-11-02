import {Observable} from "rxjs";
let observable = Observable.interval(100);
// let subscription =
observable.subscribe(x => console.log(x));
// subscription.unsubscribe();
