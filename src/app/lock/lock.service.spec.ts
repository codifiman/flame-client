import { Observable } from 'rxjs/Observable';
import { LockService, LOCKED, UNLOCKED, LOCKED_OUT } from './lock.service';

import 'rxjs/add/observable/never';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

fdescribe('LockService', () => {
  describe('arm', () => {
    it('should update the lock state', (done) => {
      const api = {
        post: () => Observable.of({ json: () => ({ status: 200 }) }),
        get: () => Observable.of({ data: { state: UNLOCKED }}),
      };
      const timeout = {
        startTimeout: () => Observable.never()
      };
      const lock = new LockService(<any>{}, <any>api, <any>timeout);

      lock.arm()
        .subscribe(null, null, () => {
          expect(lock.lockState).toEqual(LOCKED)
          done();
        });
    });

    it('should set lock state to locked out on 409', () => {
      const api = {
        get: () => Observable.of({ data: { state: LOCKED } }),
        post: () => Observable.throw({ status: 409 })
      };
      const timeout = {
        startTimeout: () => Observable.never()
      };
      const lock = new LockService(<any>{}, <any>api, <any>timeout);

      lock.arm().subscribe(null, () => expect(lock.lockState).toEqual(LOCKED_OUT))
    });
  })

});
