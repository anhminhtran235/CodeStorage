import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient) { }

  login(user: User)
  {
    return this.http.post(this.baseUrl + 'login', user).pipe(
      map((response: any) =>
        {
          const res = response;
          localStorage.setItem('token', res.token);
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
        })
    );
  }

  register(user: User)
  {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn()
  {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
