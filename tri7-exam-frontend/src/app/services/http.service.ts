import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private createHttpHeaders() {
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  post(url?: string, data?: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.apiUrl + url, data, {
          headers: this.createHttpHeaders(),
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  get(url?: string, data?: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.apiUrl + url, {
          headers: this.createHttpHeaders(),
          params: data,
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
