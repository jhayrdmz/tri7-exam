import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  constructor(private http: HttpClient) {}

  query(endpoint: string, filter?: any): Observable<any[]> {
    let params = new HttpParams();

    if (typeof filter === 'object') {
      Object.keys(filter)
        .sort()
        .forEach((key) => {
          const value = filter[key];
          if (value !== null && value.toString() !== 'null' && value !== '') {
            params = params.set(key, value.toString());
          }
        });
    }

    return this.http
      .get(
        environment.apiUrl.replace(/^\/|\/$/g, '') +
          '/' +
          endpoint.replace(/^\/|\/$/g, ''),
        {
          headers: new HttpHeaders({
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }),
          params: params,
        }
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
