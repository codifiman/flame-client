// client token service
import { Injectable } from '@angular/core';
import uuidv4 from 'uuid/v4';

@Injectable()
export class ClientTokenService {
  private token = '';

  constructor() {
    this.token = this.initToken();
    console.log('token', this.token);
  }

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
    return this.token;
  }
}
