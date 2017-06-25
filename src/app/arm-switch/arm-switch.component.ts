// arm-switch.component
import { Component } from '@angular/core';

import { LockService, LOCKED, UNLOCKED } from '../lock.service';

@Component({
  selector:    'f-arm-switch',
  templateUrl: './arm-switch.component.html',
  styleUrls:   ['./arm-switch.component.css']
})
export class ArmSwitchComponent {
  constructor(private lockService: LockService) { }

  get buttonClasses() {
    console.log('lock', this.lockService.lockThing);

    return {
      armed:   this.lockService.isLockedByUser,
      blocked: this.lockService.isLockedByOtherUser,
      ready:   !this.lockService.isLocked
    };
  }

  private toggleButton() {
    if (!this.lockService.isLocked) {
      this.lockService.arm();
    }
    else if (this.lockService.isLockedByUser) {
      this.lockService.disarm();
    }
  }
}
