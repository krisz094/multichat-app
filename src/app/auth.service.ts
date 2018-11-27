import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ConstsService } from './consts.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { User } from './entities/user';
import { MessagingService } from './messaging.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      return true;
    } else {
      return false;
    }
  }
  tryLocalLogin() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const loggedInUser = new User();
      this.messaging.setLoggedInUser(loggedInUser);
    }
  }
  register(email, nickname, password) {
    return new Promise((res, rej) => {
      this.http.post(`${this.consts.baseUrl}/api/user/register`, { email, nickname, password }, {})
        .then(resp => {
          const authToken = resp.data.replace(/\"/g, '');
          localStorage.setItem('authToken', authToken);
          const loggedInUser = new User();
          this.messaging.setLoggedInUser(loggedInUser);
          return res(resp);
        })
        .catch(err => {
          return rej(err);
        });
    });
  }
  login(email, password) {
    return new Promise((res, rej) => {

      this.http.post(`${this.consts.baseUrl}/api/user/login`, { email, password }, {})
        .then(resp => {
          const authToken = resp.data.replace(/\"/g, '');
          localStorage.setItem('authToken', authToken);
          const loggedInUser = new User();
          this.messaging.setLoggedInUser(loggedInUser);
          return res(resp);
        })
        .catch(err => {
          return rej(err);
        });
    });
  }
  logout() {
    localStorage.removeItem('authToken');
    this.messaging.setLoggedInUser(null);
  }
  constructor(private http: HTTP,
    private consts: ConstsService,
    private messaging: MessagingService,
    private nav: NavController) {
  }
}
