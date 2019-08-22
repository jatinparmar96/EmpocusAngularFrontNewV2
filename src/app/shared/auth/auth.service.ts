import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthService {
  jwtHelper = new JwtHelperService();
  token: string;

  constructor(
    private apiService: ApiService,
  ) { }

  signupUser(user: any) {
    return new Promise((register, error) => {
      this.apiService.post('auth/signup', user).then((data) => {
        let user: any = data;
        this.token = user;
        this.updateToken(user.token)
        register(user);
      }).catch((er) => {
        error(er.error.error.errors);
      })
    })
  }

  signinUser(user: any) {
    return new Promise((login, reject) => {
      this.apiService.post('auth/login', user).then((data) => {
        let user: any = data;
        if (user.status) {
          this.token = user;
          this.updateToken(user.token)
        }

        else {
          this.token = null;
        }
        login(user);

      }).catch((error) => {
        this.token = null;
        reject(error);
      })
    })
  }
  updateToken(token) {
    let decode_user = this.jwtHelper.decodeToken(token);
    localStorage.setItem('x-auth-token', token);
    return decode_user;
  }
  logout() {
    this.token = null;
    localStorage.removeItem('x-auth-token');
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    this.token = localStorage.getItem('x-auth-token');
    let isExpired: boolean = !(this.jwtHelper.isTokenExpired(this.token));
    if (this.token !== null && isExpired) {
      return true;
    }
    else {
      return false;
    }
  }
}
