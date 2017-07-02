import { Component } from '@angular/core';
import { ClientTokenService } from './client-token/client-token.service';
import { LockService } from './lock/lock.service';
import { FireService } from './fire/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private lock: LockService, private fire: FireService) { }

  private handleArmEvent(event): void {
    this.lock.setLock(event);
  }

  private handleFireEvent({ channel, action }): void {
    this.fire.setChannel(channel, action);
  }
}
