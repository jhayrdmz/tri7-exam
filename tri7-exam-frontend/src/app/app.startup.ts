import { Injectable, Injector } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable()
export class AppStartup {
  constructor(private injector: Injector) {}

  load(): Promise<boolean> {
    let auth = this.injector.get(AuthService);

    return new Promise((resolve) => {
      if (auth.isLoggedIn()) {
        auth
          .getLoggedInUser()
          .then(() => resolve(true))
          .finally(() => resolve(true));
      } else {
        resolve(true);
      }
    });
  }
}
