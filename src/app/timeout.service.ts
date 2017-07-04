import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimeoutService {
  private duration: number;
  private startTime: number;
  private observable: Observable<any>;

  startTimeout(duration: number): Observable<void> {
    this.startTime = new Date().getTime()
    this.duration = duration

    if (this.observable) return this.observable

    this.observable = new Observable(subscriber => {
      function onTimeout() {
        const now = new Date().getTime()
        const remainingTime = this.startTime + duration - now
        if (remainingTime > 0) {
          setTimeout(onTimeout.bind(this), remainingTime)
        } else {
          subscriber.next()
          subscriber.complete()
        }
      }
      setTimeout(onTimeout.bind(this), duration)
    })

    return this.observable
  }

  resetTimeout(): void {
    this.startTime = new Date().getTime()
  }
}
