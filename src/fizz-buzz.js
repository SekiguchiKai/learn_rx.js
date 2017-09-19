"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
/**
 * Created by sekiguchikai on 2017/09/18.
 */
rxjs_1.Observable.range(1, 100).map(function (val) {
    if (val % 15 === 0) {
        return 'Fizz Buzz!';
    }
    else if (val % 3 === 0) {
        return 'Fizz!';
    }
    else if (val % 5 === 0) {
        return 'Buzz!';
    }
    else {
        return val;
    }
}).subscribe(function (val) {
    console.log(val);
});
