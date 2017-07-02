import { Observable } from 'rxjs/Observable';
import { LockService, LOCKED, UNLOCKED } from './lock.service';
import "rxjs/add/observable/of";

fdescribe('LockService', () => {
  describe('arm', () => {
    it("should update the lock state", (done) => {
      const api = {
        post: () => Observable.of({ status: 200 }),
        get: () => Observable.of({ status: 200, data: { state: UNLOCKED }}),
      };
      const lock = new LockService(<any>{}, <any>api);

      lock.arm()
        .subscribe(null, null, () => {
          expect(lock.lockState).toEqual(LOCKED)
          done();
        });
    });
    it("shouldn't change the state of the lock on an error", (done) => {
      const api = {
        post: () => Observable.of({ status: 409 }),
        get: () => Observable.of({ state: UNLOCKED }),
      };
      const lock = new LockService(<any>{}, <any>api);

      lock.arm()
        .subscribe(null, null, () => {
          expect(lock.lockState).toEqual(UNLOCKED)
          done();
        });
    });
  })

});
