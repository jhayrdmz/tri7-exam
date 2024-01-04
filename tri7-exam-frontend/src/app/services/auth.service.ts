import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpService } from './http.service';

interface User {
  token: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<User | null>;

  constructor(
    private http: HttpService,
    private router: Router,
    private permissionsService: NgxPermissionsService
  ) {
    this.user = of(null);
  }

  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http
        .post('/auth/login', {
          username,
          password,
        })
        .then((res: any) => {
          if (res.data) {
            localStorage.setItem('token', res.data.access_token);
            this.updateUserData(res.data.user);
          }
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    return token !== null;
  }

  getLoggedInUser() {
    return new Promise((resolve, reject) => {
      this.http.get('/user/me').then(
        (res: any) => {
          this.updateUserData(res.data.user);
          resolve(true);
        },
        () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          reject(false);
        }
      );
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    this.permissionsService.flushPermissions();
  }

  private updateUserData(user: User) {
    this.user = of(user);
    localStorage.setItem('permissions', JSON.stringify([user.role]));
    this.permissionsService.loadPermissions([user.role]);
  }
}
