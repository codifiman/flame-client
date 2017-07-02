// lock service
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ClientTokenService } from '../client-token/client-token.service';
import { FlameAPIService } from '../flame-api/flame-api.service';

type LockState = 'LOCKED' | 'UNLOCKED';
type LockEvent = 'ARM' | 'DISARM' | 'RESET';

interface LockStatusResponse {
  status: number,
  data:   {
    state: LockState
  },
};

export const LOCKED: LockState = 'LOCKED';
export const UNLOCKED: LockState = 'UNLOCKED';
export const ARM: LockEvent = 'ARM';
export const DISARM: LockEvent = 'DISARM';
export const RESET: LockEvent = 'RESET';

@Injectable()
export class LockService {
  private lockpath: string = '/burner/lock';
  private lockstate: LockState = UNLOCKED;
  private timeout;

  constructor (
    private token: ClientTokenService,
    private flameAPI: FlameAPIService
  ) {
    this.getLockStatus();
  }

  private getLockStatus(): void {
    this.flameAPI.get(this.lockpath)
      .subscribe((res) => {
        if (res.status === 200) {
          this.lockstate = res.data.state;
        }
      });
  }

  public startTimeout(): void {
    console.log('starting timeout');
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => this.lockstate = UNLOCKED, 10000);
  }

  public stopTimeout(): void {
    console.log('stopping timeout');
    clearTimeout(this.timeout);
  }

  public get lockState(): LockState {
    return this.lockstate;
  }

  // Actions
  public setLock(event: LockEvent): void {
    if (event === ARM) {
      this.arm();
      this.startTimeout();
    }

    else if (event === DISARM) {
      this.disarm();
    }

    else {
      this.lockstate = UNLOCKED;
    }
  }

  public arm(): Observable<Response> {
    const payload = {
      state:  LOCKED,
      lockId: this.token.clientToken
    };

    console.log("arming device", payload);

    const postArm = this.flameAPI.post(this.lockpath, payload);
    postArm.subscribe((res: Response) => {
        if (res.status === 200) {
          this.lockstate = payload.state;
        }
      });

    return postArm;
  }

  public disarm(): Observable<Response> {
    const payload = {
      state:  UNLOCKED,
      lockId: this.token.clientToken,
    };

    console.log("disarming device", payload);

    const postDisarm = this.flameAPI.post(this.lockpath, payload)
    postDisarm.subscribe((res: Response) => {
        if (res.status === 200) {
          this.lockstate = payload.state;
        }
      });

    return postDisarm;
  }
}
