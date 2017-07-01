import { Observable } from 'rxjs/Observable';
import { LockService, LOCKED, UNLOCKED } from './lock.service';
import "rxjs/add/observable/of";

fdescribe('LockService', () => {
  describe('arm', () => {
    it("should update the lock state", () => {
      const api = {
        post: () => Observable.of({ status: 200 }),
        get: () => Observable.of({ state: UNLOCKED }),
      };
      const lock = new LockService(<any>{}, <any>api);

      lock.arm()
        .subscribe(null, null, () => (
          expect(lock.lockState).toEqual(LOCKED)
        ));
    });
    it("shouldn't change the state of the lock on an error", () => {
      const api = {
        post: () => Observable.of({ status: 409 }),
        get: () => Observable.of({ state: UNLOCKED }),
      };
      const lock = new LockService(<any>{}, <any>api);

      lock.arm()
        .subscribe(null, null, () => (
          expect(lock.lockState).toEqual(UNLOCKED)
        ));
    });
  })

});
