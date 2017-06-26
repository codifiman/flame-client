// fire-button.component
import { Component, Input } from '@angular/core';

import { FireService } from './fire.service';

@Component({
  selector:    'f-fire-button',
  templateUrl: './fire-button.component.html',
  styleUrls:   ['./fire-button.component.css']
})
export class FireButtonComponent {
  private state = false;
  @Input() channel: number;

  constructor(private fire: FireService) { }

  toggleChannel() {
    if (this.state) {
    // Turn button off
      this.fire.turnChannelOff(this.channel)
        .subscribe((res) => console.log('off response', res));

    } else {
    // Turn button on
      this.fire.turnChannelOn(this.channel)
        .subscribe((res) => console.log('on response', res));
    }
  }
}
