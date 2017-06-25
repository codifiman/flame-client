// Flame API
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FlameAPIService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: Http) { }

  getUrl(path) {
    return `${this.baseUrl}${path}`;
  }

  get(path) {
    return this.http.get(this.getUrl(path))
      .map((res: Response) => res.json());
  }

  post(path: string, data: object) {
    const options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });

    return this.http.post(this.getUrl(path), JSON.stringify(data), options)
      .map((res: Response) => res);
  }

  getSystemStatus() {
    return this.get('/status');
  }
}
