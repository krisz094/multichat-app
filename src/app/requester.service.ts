import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ConstsService } from './consts.service';

@Injectable({
  providedIn: 'root'
})
export class RequesterService {

  public getAuthHeader() {
    return { 'Authorization': 'Bearer ' + localStorage.getItem('authToken') };
  }

  public fetchFriends(): Promise<any[]> {
    return new Promise((res, rej) => {
      this.http.get(`${this.consts.baseUrl}/api/user/friends`, {}, this.getAuthHeader())
        .then(resp => {
          return res(JSON.parse(resp.data));
        })
        .catch(err => {
          return rej(err.error);
        });
    });
  }

  public fetchFriendRequests(): Promise<any[]> {
    return new Promise((res, rej) => {
      this.http.get(`${this.consts.baseUrl}/api/user/friends/requests`, {}, this.getAuthHeader())
        .then(resp => {
          return res(JSON.parse(resp.data));
        })
        .catch(err => {
          return rej(err.error);
        });
    });
  }

  public fetchThreads(friendshipId): Promise<any[]> {
    return new Promise((res, rej) => {
      this.http.get(`${this.consts.baseUrl}/api/friendship/threads`,
        { friendshipId },
        this.getAuthHeader())
        .then(resp => {
          console.log(resp);
          return res(JSON.parse(resp.data));
        })
        .catch(err => {
          console.log(err);
          return rej(err.error);
        });
    });
  }

  public fetchMessages(threadId): Promise<any[]> {
    return new Promise((res, rej) => {
      this.http.get(`${this.consts.baseUrl}/api/thread`, { threadId }, this.getAuthHeader())
        .then(resp => {
          return res(JSON.parse(resp.data));
        })
        .catch(err => {
          return rej(err.error);
        });
    });
  }

  public createThread(friendshipId) {
    return new Promise((res, rej) => {
      this.http.post(`${this.consts.baseUrl}/api/thread/create`,
        { friendshipId },
        this.getAuthHeader())
        .then(resp => {
          return res(JSON.parse(resp.data));
        })
        .catch(err => {
          return rej(err.error);
        });
    });
  }

  public sendMessage(threadId, text) {
    return new Promise((res, rej) => {
      this.http.post(`${this.consts.baseUrl}/api/message/send`, { threadId, text }, this.getAuthHeader())
        .then(resp => {
          return res();
        })
        .catch(err => {
          return rej(err.error);
        });
    });
  }

  public sendFriendRequest(email) {
    return new Promise((res, rej) => {
      this.http.post(`${this.consts.baseUrl}/api/friendship`, { email }, this.getAuthHeader())
        .then(resp => {
          return res(JSON.parse(resp.data));
        })
        .catch(err => {
          return rej(err.error);
        });
    });
  }

  public acceptFriendRequest(friendshipId) {
    return new Promise((res, rej) => {
      this.http.put(`${this.consts.baseUrl}/api/friendship`, { friendshipId }, this.getAuthHeader())
        .then(resp => {
          return res(JSON.parse(resp.data));
        })
        .catch(err => {
          return rej(err.error);
        });
    });
  }

  public deleteFriendRequest(friendshipId) {
    return new Promise((res, rej) => {
      this.http.delete(`${this.consts.baseUrl}/api/user/friends/requests`, { friendshipId }, this.getAuthHeader())
        .then(resp => {
          return res(JSON.parse(resp.data));
        })
        .catch(err => {
          return rej(err.error);
        });
    });
  }



  constructor(private http: HTTP, private consts: ConstsService) { }
}
