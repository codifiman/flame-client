// Flame API
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FlameAPIService {
  private baseUrl = 'http://192.168.42.1';
  constructor(private http: Http) { }

  getUrl(path) {
    return `${this.baseUrl}${path}`;
  }

  get(path) {
    return this.http.get(this.getUrl(path))
      .map((res: Response) => {
        return {
          status: res.status,
          data:   res.json()
        };
      })
      .catch((err: Response | any) => {
        return Observable.throw({
          status: err.status,
          data:   err.json()
        });
      });
  }

  post(path: string, data: object) {
    const options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });

    return this.http.post(this.getUrl(path), JSON.stringify(data), options)
      .map(res => res.json());
  }

  getSystemStatus() {
    return this.get('/status');
  }
}
