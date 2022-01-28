import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
        // Dollar in the variable tells its an observable
        const interval$ = timer(3000, 1000);

        // Only become a stream if you subscribe to it (subscribe() method)
        interval$.subscribe(value => {
            console.log('stream 1 ' + value);
        });

        // Source and event to subscribe to (returns stream not instance)
        const click$ = fromEvent(document, 'click');

        click$.subscribe(event => console.log(event));
    }
}






