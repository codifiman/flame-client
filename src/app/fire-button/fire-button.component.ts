// fire-button.component
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LOCKED, UNLOCKED } from '../lock/lock.service';
import { FIRE, RELEASE, RESET } from '../fire/fire.service';

type ChannelState = boolean;
type LockState = 'LOCKED' | 'UNLOCKED';
interface Action {
  channel: number,
  action:  'FIRE' | 'RELEASE'
};

@Component({
  selector:    'f-fire-button',
  templateUrl: './fire-button.component.html',
  styleUrls:   ['./fire-button.component.css']
})
export class FireButtonComponent {
  channelOn: ChannelState = false;

  @Input() lock: LockState;
  @Input() channel: number;
  @Output() onEvent = new EventEmitter<Action>();

  get buttonClasses(): object {
    return {
      armed: this.lock === LOCKED,
      on:    this.channelOn,
    };
  }

  private prevent(e): void {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
  }

  turnOn(event): void {
    this.prevent(event);

    if (this.lock === LOCKED && !this.channelOn) {
      this.onEvent.emit({ channel: this.channel, action: FIRE });
      this.channelOn = true;
      setTimeout(() => this.channelOn = false, 8000);
    }
  }

  turnOff(event): void {
    this.prevent(event);

    if (this.lock === LOCKED && this.channelOn) {
      this.onEvent.emit({ channel: this.channel, action: RELEASE });
      this.channelOn = false;
    }
  }
}
