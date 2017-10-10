import {Observable} from "rxjs";
/**
 * Created by sekiguchikai on 2017/10/10.
 */
let fizzBuzzFunc = (input) => {
    // Observableを生成して返す
    return Observable.create((observer)=> {
        // subscribeの引数は、Observerオブジェクト
        input.subscribe({
            next: (v) => {
                if ((v % 3 === 0) && (v % 5 === 0)) {
                    console.log('Fizz Buzz!');
                } else if (v % 3 === 0) {
                    console.log('Fizz!');
                } else if (v % 5 === 0) {
                    console.log('Buzz!');
                } else {
                    console.log(v);
                }
            },
            error: (err) => observer.error(err),
            complete: () => observer.complete()
        });
    });
};

let input = Observable.range(1, 100);
let output = fizzBuzzFunc(input);
output.subscribe();
