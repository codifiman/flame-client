// lock service
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { FlameAPIService } from './flame-api.service';
import { ClientTokenService } from './client-token.service';

export const LOCKED = 'LOCKED';
export const UNLOCKED = 'UNLOCKED';

interface LockState {
  state: string;
  lockId: string;
}

@Injectable()
export class LockService {
  private lockPath = '/burner/lock';
  private clientToken = '';
  private lock = {
    lockId: '',
    state:  LOCKED
  };

  constructor (
    private clientTokenService: ClientTokenService,
    private flameAPI: FlameAPIService
  ) {
    this.clientToken = clientTokenService.clientToken;
    this.getLockStatus()
    .subscribe((lock) => this.lock = lock);
  }

  // Queries
  public get isLockedByUser(): boolean {
    return this.lock.lockId === this.clientToken;
  }

  public get isLockedByOtherUser(): boolean {
    return this.lock.lockId && !this.isLockedByUser;
  }

  public get isLocked(): boolean {
    return this.lock.state === LOCKED
  }

  public get lockThing(): object {
    return this.lock;
  }

  public get lockState(): string {
    return this.lock.state;
  }

  private getLockStatus(): Observable<LockState> {
    //return this.flameAPI.post('/burner/channel/0', { state: true, lockId: '1234567890' });
    return this.flameAPI.get(this.lockPath)
  }

  // Actions
  public arm(): void {
    const payload = {
      state:  LOCKED,
      lockId: this.clientToken
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
      lockId: this.clientToken,
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
