import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { response } from 'express';
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
        // Creating our own HTTP Observable
        const http$ = new Observable(observer => {
            // Fetch from api
            fetch('/api/courses/')
                .then(response => {
                    return response.json();
                })
                .then(body => {
                    // Complete our observable
                    observer.next(body);
                    observer.complete();
                })
                .catch(error => {
                    // Catch if error
                    observer.error(error);
                });
        });

        http$.subscribe(
            courses => console.log(courses),
            noop,
            () => console.log('completed')
        );
    }
}






