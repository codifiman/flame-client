// arm-switch.component
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LOCKED, UNLOCKED, LOCKED_OUT, ARM, DISARM, RESET } from '../lock/lock.service';

type LockState = 'LOCKED' | 'UNLOCKED';
type Action = 'ARM' | 'DISARM' | 'RESET';

@Component({
  selector:    'f-arm-switch',
  templateUrl: './arm-switch.component.html',
  styleUrls:   [
    './arm-switch.component.slide.css',
    './arm-switch.component.slider.css',
    './arm-switch.component.css'
  ]
})
export class ArmSwitchComponent {
  @Input() lock: LockState;
  @Output() onEvent = new EventEmitter<Action>();

  get buttonClasses() {
    return {
      armed: this.lock === LOCKED,
      ready: this.lock === UNLOCKED,
      lockedout: this.lock === LOCKED_OUT
    };
  }

  get buttonText(): string {
    const phrases = {
      [LOCKED]: 'Armed',
      [UNLOCKED]: 'Inactive',
      [LOCKED_OUT]: 'Busy',
    };

    return phrases[this.lock] || 'Hello!';
  }

  private toggleButton(): void {
    if (this.lock === LOCKED_OUT) return

    if (this.lock === LOCKED) {
      this.onEvent.emit(DISARM);
    } else {
      this.onEvent.emit(ARM);
    }
  }
}
