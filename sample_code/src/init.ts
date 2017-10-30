import {Observable, Observer} from "rxjs";
/**
 * Created by sekiguchikai on 2017/10/30.
 */

// create
Observable.create((observer)=> {
    try {
        observer.next('0');
        observer.next('1');
        observer.next('2');
        observer.complete();
    } catch (err) {
        observer.error(err);
    }
}).subscribe(
    value => console.log(`next: ${value}`),
    error => console.log(`error: ${error}`),
    () => console.log(`complete`)
);

// 