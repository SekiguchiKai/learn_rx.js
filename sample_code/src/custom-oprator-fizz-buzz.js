"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
/**
 * Created by sekiguchikai on 2017/10/10.
 */
var fizzBuzzFunc = function (input) {
    return rxjs_1.Observable.create(function (observer) {
        // subscribeの引数は、Observerオブジェクト
        input.subscribe({
            next: function (v) {
                if ((v % 3 === 0) && (v % 5 === 0)) {
                    console.log('Fizz Buzz!');
                }
                else if (v % 3 === 0) {
                    console.log('Fizz!');
                }
                else if (v % 5 === 0) {
                    console.log('Buzz!');
                }
                else {
                    console.log(v);
                }
            },
            error: function (err) { return observer.error(err); },
            complete: function () { return observer.complete(); }
        });
    });
    // return output;
};
var input = rxjs_1.Observable.range(1, 100);
var output = fizzBuzzFunc(input);
output.subscribe();
