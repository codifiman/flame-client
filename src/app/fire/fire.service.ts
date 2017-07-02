// fire service
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ClientTokenService } from '../client-token/client-token.service';
import { FlameAPIService } from '../flame-api/flame-api.service';
import { LockService } from '../lock/lock.service';

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
  ) { }

  private getPath(channel) {
    return `${this.basePath}${channel}`;
  }

  public setChannel(channel, action): void {
    if (action === FIRE) {
      this.turnChannelOn(channel);
      this.lock.stopTimeout();
    }

    else if (action === RELEASE) {
      this.turnChannelOff(channel);
      this.lock.startTimeout();
    }

    else {
      this.lock.startTimeout();
    }
  }

  public turnChannelOn(channel): Observable<Response> {
    const path = this.getPath(channel);
    const payload = {
      state: true,
      lockId: this.token.clientToken
    };

    console.log(`Turning on channel ${channel}.`, payload);

    const postChannelOn = this.flameAPI.post(path, payload);
    postChannelOn.subscribe((res: Response) => {
      if (res.status === 200) {
        console.log('Channel successfully turned on.');
      }
    });

    return postChannelOn;
  }

  public turnChannelOff(channel): Observable<Response> {
    const path = this.getPath(channel);
    const payload = {
      state: false,
      lockId: this.token.clientToken
    };

    console.log(`Turning off channel ${channel}.`, payload);

    const postChannelOff = this.flameAPI.post(path, payload);
    postChannelOff.subscribe((res: Response) => {
      if (res.status === 200) {
        console.log('Channel successfully turned off.');
      }
    });

    return postChannelOff;
  }
}
