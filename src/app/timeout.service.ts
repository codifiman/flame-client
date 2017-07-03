import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/delay';

@Injectable()
export class TimeoutService {
  private duration: number;
  private startTime: number;
  private observable: Observable<any>;

  startTimeout(duration: number): Observable<void> {
    this.duration = duration;
    this.startTime = new Date().getTime();
    this.observable = Observable.timer(duration);
    return this.observable;
  }

  resetTimeout(): void {
    const now = new Date().getTime();
    const remainingTime = this.startTime + this.duration - now;
    this.startTime = now;
    const delay = this.duration - remainingTime;
    this.observable.delay(delay);
  }
}
