// lock service
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/concatMap';

import { ClientTokenService } from '../client-token/client-token.service';
import { FlameAPIService } from '../flame-api/flame-api.service';

type LockState = 'LOCKED' | 'UNLOCKED' | 'LOCKED_OUT';
type LockEvent = 'ARM' | 'DISARM' | 'RESET';

interface LockStatusResponse {
  status: number,
  data:   {
    state: LockState
  },
};

export const LOCKED: LockState = 'LOCKED';
export const UNLOCKED: LockState = 'UNLOCKED';
export const LOCKED_OUT: LockState = 'LOCKED_OUT';

export const ARM: LockEvent = 'ARM';
export const DISARM: LockEvent = 'DISARM';
export const RESET: LockEvent = 'RESET';

@Injectable()
export class LockService {
  private lockpath = '/burner/lock';
  private lockstate = UNLOCKED;
  private timeout;
  private lockCheckStream: Observable<Response>;

  constructor (
    private token: ClientTokenService,
    private flameAPI: FlameAPIService
  ) {
    this.lockCheckStream = Observable
      .interval(1000)
      .concatMap(() => this.flameAPI.get(this.lockpath))

    this.getLockStatus();
  }

  private getLockStatus(): void {
    this.flameAPI.get(this.lockpath)
      .subscribe(res => {
        if (res.data.state === LOCKED) {
          this.lockstate = LOCKED_OUT;
          this.pollUntilAvailable();
        } else {
          this.lockstate = UNLOCKED;
        }
      });
  }

  private pollUntilAvailable(): void {
    const subscription = this.lockCheckStream.subscribe(res => {
      if (res['data'].state === UNLOCKED) {
        this.lockstate = UNLOCKED;
        subscription.unsubscribe();
      }
    })
  }

  public startTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => this.lockstate = UNLOCKED, 10000);
  }

  public stopTimeout(): void {
    clearTimeout(this.timeout);
  }

  public get lockState(): LockState {
    return this.lockstate;
  }

  // Actions
  public setLock(event: LockEvent): void {
    switch (event) {
      case ARM:
        this.arm();
        this.startTimeout();
        break;
      case DISARM:
        this.disarm();
        break;
      default:
        this.lockstate = UNLOCKED;
        break;
    }
  }

  public arm(): Observable<Response> {
    return this.httpReq({
      state:  LOCKED,
      lockId: this.token.clientToken
    });
  }

  public disarm(): Observable<Response> {
    return this.httpReq({
      state:  UNLOCKED,
      lockId: this.token.clientToken,
    });
  }

  private httpReq(payload): Observable<Response> {
    const obs = this.flameAPI.post(this.lockpath, payload);
    obs.subscribe(
      res => this.lockstate = payload.state,
      res => {
        if (res.status === 409) {
          this.lockstate = LOCKED_OUT;
          this.pollUntilAvailable();
        }
      })
    return obs;
  }
}
