// client token service
import { Injectable } from '@angular/core';
import { v4 } from 'uuid';

@Injectable()
export class ClientTokenService {
  private token = '';

  private initToken() {
    // Fetch a potentially-existing token from localStorage
    let token = window.localStorage.getItem('token');

    // If no token in storage, generate one and stuff it in localStorage
    if (!token) {
      token = v4();
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
