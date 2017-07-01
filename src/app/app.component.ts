import { Component } from '@angular/core';
import { ClientTokenService } from './client-token/client-token.service';
import { LockService } from './lock/lock.service';
import { ARM, DISARM } from './arm-switch/arm-switch.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  lock;

  constructor(lock: LockService) {
    this.lock = lock;
  }

  private handleArmEvent(event): void {
    if (event === ARM) {
      this.lock.arm();
    }
    else if (event === DISARM) {
      this.lock.disarm();
    }
    else {
      this.lock.reset();
    }
  }
}
