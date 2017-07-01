// client token service
import { Injectable } from '@angular/core';
import uuidv4 from 'uuid/v4';

@Injectable()
export class ClientTokenService {
  private token = '';

  private initToken() {
    // Fetch a potentially-existing token from localStorage
    let token = window.localStorage.getItem('token');

    // If no token in storage, generate one and stuff it in localStorage
    if (!token) {
      token = uuidv4();
      window.localStorage.setItem('token', token);
    }

    return token;
  }

  get clientToken() {
    if (!this.token) {
      this.token = this.initToken();
    }

    return this.token;
  }
}
