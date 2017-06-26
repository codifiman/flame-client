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

  get buttonClasses(): object {
    return {
      armed:   this.lockService.isLockedByUser,
      blocked: this.lockService.isLockedByOtherUser,
      ready:   !this.lockService.isLocked
    };
  }

  get buttonText(): string {
    if (this.lockService.isLockedByUser === true) { return 'Off'; }
    else if (this.lockService.isLockedByOtherUser) { return 'Busy'; }
    else { return 'Arm'; }
  }

  private toggleButton(): void {
    if (!this.lockService.isLocked) {
      this.lockService.arm();
      setTimeout(this.lockService.resetLock.bind(this.lockService), 5000);
    }
    else if (this.lockService.isLockedByUser) {
      this.lockService.disarm();
    }
  }
}
