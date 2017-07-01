// arm-switch.component
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LOCKED, UNLOCKED } from '../lock/lock.service';

type LockState = 'LOCKED' | 'UNLOCKED';
type Action = 'ARM' | 'DISARM' | 'RESET';

export const ARM = 'ARM';
export const DISARM = 'DISARM';
export const RESET = 'RESET';

@Component({
  selector:    'f-arm-switch',
  templateUrl: './arm-switch.component.html',
  styleUrls:   ['./arm-switch.component.css']
})
export class ArmSwitchComponent {
  @Input() lock: LockState;
  @Output() onEvent = new EventEmitter<Action>();

  get buttonClasses(): object {
    return {
      armed:   this.lock === LOCKED,
      ready:   this.lock === UNLOCKED,
    };
  }

  get buttonText(): string {
    if (this.lock === LOCKED) { return 'Off'; }
    else { return 'Arm'; }
  }

  private toggleButton(): void {
    if (this.lock === LOCKED) {
      this.onEvent.emit(DISARM);
    }
    else {
      this.onEvent.emit(ARM);
      setTimeout(() => this.onEvent.emit(RESET), 5000);
    }
  }
}
