// fire service
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ClientTokenService } from '../client-token/client-token.service';
import { FlameAPIService } from '../flame-api/flame-api.service';
import { LockService } from '../lock/lock.service';
import { TimeoutService } from '../timeout.service';

export const FIRE = 'FIRE';
export const RELEASE = 'RELEASE';
export const RESET = 'RESET';

@Injectable()
export class FireService {
  private basePath = '/burner/channel/';

  constructor (
    private token: ClientTokenService,
    private flameAPI: FlameAPIService,
    private lock: LockService,
    private timeoutService: TimeoutService
  ) { }

  private getPath(channel) {
    return `${this.basePath}${channel}`;
  }

  public setChannel(channel, action): void {
    this.timeoutService.resetTimeout();
    if (action === FIRE) {
      this.turnChannelOn(channel);
    } else if (action === RELEASE) {
      this.turnChannelOff(channel);
    }
  }

  public turnChannelOn(channel): Observable<Response> {
    const path = this.getPath(channel);
    const payload = {
      state: true,
      lockId: this.token.clientToken
    };

    const postChannelOn = this.flameAPI.post(path, payload);
    postChannelOn.subscribe();

    return postChannelOn;
  }

  public turnChannelOff(channel): Observable<Response> {
    const path = this.getPath(channel);
    const payload = {
      state: false,
      lockId: this.token.clientToken
    };

    const postChannelOff = this.flameAPI.post(path, payload);
    postChannelOff.subscribe();

    return postChannelOff;
  }
}
