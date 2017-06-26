// lock service
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ClientTokenService } from './client-token.service';
import { FlameAPIService } from './flame-api.service';

export const LOCKED = 'LOCKED';
export const UNLOCKED = 'UNLOCKED';

interface LockState {
  state: string;
  lockId: string;
}

@Injectable()
export class LockService {
  private lockPath = '/burner/lock';
  private lock = {
    lockId: '',
    state:  LOCKED
  };

  constructor (
    private token: ClientTokenService,
    private flameAPI: FlameAPIService
  ) {
    this.getLockStatus();
  }

  private getLockStatus(): void {
    this.flameAPI.get(this.lockPath)
      .subscribe((lock) => Object.assign(this.lock, lock));
  }

  // Queries
  public get isLockedByUser(): boolean {
    return this.lock.lockId === this.token.clientToken;
  }

  public get isLockedByOtherUser(): boolean {
    return this.lock.lockId && !this.isLockedByUser;
  }

  public get isLocked(): boolean {
    return this.lock.state === LOCKED
  }

  public get lockState(): string {
    return this.lock.state;
  }

  public resetLock(): void {
    this.lock = {
      state:  UNLOCKED,
      lockId: ''
    };
  }

  // Actions
  public arm(): void {
    const payload = {
      state:  LOCKED,
      lockId: this.token.clientToken
    };

    console.log("arming device", payload);

    this.flameAPI.post(this.lockPath, payload)
      .subscribe((res: Response) => {
        if (res.status === 200) {
          this.lock = payload;
        }
      });
  }

  public disarm(): void {
    const payload = {
      state:  UNLOCKED,
      lockId: this.token.clientToken,
    };

    console.log("disarming device", payload);

    this.flameAPI.post(this.lockPath, payload)
      .subscribe((res: Response) => {
        if (res.status === 200) {
          this.lock = {
            state: UNLOCKED,
            lockId: ''
          };
        }
      });
  }
}
