import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Store} from '../common/store.service';

 
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    beginnerCourses: [];

    advancedCourses: [];


    constructor(private store:Store) {

    }

    ngOnInit() {
        // Creating our own HTTP Observable
        const http$ = createHttpObservable('/api/courses/');

        // Pipe function allows chaining observables
        const courses$ = http$
            .pipe(
                map(response => Object.values(response["payload"]))
            );

        courses$.subscribe(
            courses => {
                this.beginnerCourses = courses.filter(course => course.category == 'BEGINNER');
                this.advancedCourses = courses.filter(course => course.category == 'BEGINNER');
            },
            noop,
            () => console.log('completed')
        );

        // const courses$ = this.store.courses$;

        // this.beginnerCourses$ = this.store.selectBeginnerCourses();

        // this.advancedCourses$ = this.store.selectAdvancedCourses();

    }

}
