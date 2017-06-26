// fire service
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ClientTokenService } from '../client-token.service';
import { FlameAPIService } from '../flame-api.service';

@Injectable()
export class FireService {
  private basePath = '/burner/channels/';

  constructor (
    private token: ClientTokenService,
    private flameAPI: FlameAPIService
  ) { }

  private getPath(channel) {
    return `${this.basePath}${channel}`;
  }

  public turnChannelOn(channel): Observable<Response> {
    const path = this.getPath(channel);
    const payload = {
      state: true,
      lockId: this.token.clientToken
    };

    console.log(`Turning on channel ${channel}.`, payload);

    return this.flameAPI.post(path, payload);
  }

  public turnChannelOff(channel): Observable<Response> {
    const path = this.getPath(channel);
    const payload = {
      state: false,
      lockId: this.token.clientToken
    };

    console.log(`Turning off channel ${channel}.`, payload);

    return this.flameAPI.post(path, payload);
  }
}
