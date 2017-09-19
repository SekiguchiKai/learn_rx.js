import {Observable} from "rxjs";
/**
 * Created by sekiguchikai on 2017/09/18.
 */
Observable.range(1, 100).map((val)=> {
    if (val % 15 === 0) {
        return 'Fizz Buzz!';
    } else if (val % 3 === 0) {
        return 'Fizz!';
    } else if (val % 5 === 0) {
        return 'Buzz!';
    } else {
        return val;
    }
}).subscribe((val)=> {
    console.log(val);
});
