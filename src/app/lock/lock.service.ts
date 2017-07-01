// lock service
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ClientTokenService } from '../client-token/client-token.service';
import { FlameAPIService } from '../flame-api/flame-api.service';

type LockState = 'LOCKED' | 'UNLOCKED';

interface LockStatusResponse {
  state: LockState
};

export const LOCKED: LockState = 'LOCKED';
export const UNLOCKED: LockState = 'UNLOCKED';


@Injectable()
export class LockService {
  private lockpath: string = '/burner/lock';
  private lockstate: LockState = LOCKED;

  constructor (
    private token: ClientTokenService,
    private flameAPI: FlameAPIService
  ) {
    this.getLockStatus();
  }

  private getLockStatus(): void {
    this.flameAPI.get(this.lockpath)
      .subscribe((res: LockStatusResponse) => {
        this.lockstate = res.state;
      });
  }

  public get lockState(): LockState {
    return this.lockstate;
  }

  public reset(): void {
    this.lockstate = UNLOCKED;
  }

  // Actions
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
