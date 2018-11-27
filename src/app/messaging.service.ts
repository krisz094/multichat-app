import { Injectable } from '@angular/core';
import { User } from './entities/user';
import { RequesterService } from './requester.service';
import { Friendship } from './entities/friendship';
import { Thread } from './entities/thread';
import { Message } from './entities/message';
import { isEqual } from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  loggedInUser: User;
  setLoggedInUser(user: User) {
    this.loggedInUser = user;
  }
  refreshFriends() {
    this.req.fetchFriends()
      .then(friends => {
        const newFriends = friends.map(reqFriendship => {
          const friendship = new Friendship();
          friendship.id = reqFriendship.friendshipId;
          const friend = new User();
          friendship.friend = friend;
          friend.id = reqFriendship.friend.id;
          friend.email = reqFriendship.friend.email;
          friend.nickname = reqFriendship.friend.nickname;
          return friendship;
        });
        if (!isEqual(newFriends, this.loggedInUser.friends)) {
          this.loggedInUser.friends = newFriends;
        }
        console.log(friends);
      });
  }
  refreshThreads(friendshipId): Promise<Thread[]> {
    return new Promise((res, rej) => {
      this.req.fetchThreads(friendshipId)
        .then(threads => {
          console.log(threads);
          /* this.loggedInUser.friends.find(friend => friend.id === friendshipId).threads = */
          const mappedThreads = threads.map(thread => {
            const actualThread = new Thread();
            actualThread.topic = /** thread.name */'Some Topic';
            actualThread.id = thread.id;
            return actualThread;
          });
          return res(mappedThreads/* this.loggedInUser.friends.find(friend => friend.id === friendshipId).threads */);
        })
        .catch(err => {
          return rej(err);
        });
    });
  }
  createThread(friendshipId): Promise<any> {
    return new Promise((res, rej) => {
      this.req.createThread(friendshipId)
        .then(() => {
          return res();
        })
        .catch(err => {
          return rej(err);
        });
    });
  }

  refreshFriendRequests(): Promise<any[]> {
    return new Promise((res, rej) => {
      this.req.fetchFriendRequests()
        .then(requests => {
          const actualRequests = requests.map(request => {
            const actualFriendship = new Friendship();
            actualFriendship.id = request.friendshipId;
            actualFriendship.friend = new User();
            actualFriendship.friend.email = request.friend.email;
            actualFriendship.friend.nickname = request.friend.nickname;
            return actualFriendship;
          });
          return res(actualRequests);
        })
        .catch(err => rej);
    });
  }
  acceptFriendRequest(friendshipId): Promise<any> {
    return new Promise((res, rej) => {
      this.req.acceptFriendRequest(friendshipId)
        .then(() => {
          return res();
        })
        .catch(err => {
          return rej(err);
        });
    });
  }
  sendFriendRequest(email): Promise<any> {
    return new Promise((res, rej) => {
      this.req.sendFriendRequest(email)
        .then(() => {
          return res();
        })
        .catch(err => {
          return rej(err);
        });
    });
  }
  sendMessage(threadId, message): Promise<any> {
    return new Promise((res, rej) => {
      this.req.sendMessage(threadId, message)
        .then(() => {
          return res();
        })
        .catch(err => {
          return rej(err);
        });
    });
  }
  refreshMessages(threadId): Promise<any[]> {
    return new Promise((res, rej) => {
      this.req.fetchMessages(threadId)
        .then(messages => {
          const actualMessages = messages.map(msg => {
            const actualMessage = new Message();
            actualMessage.sentByYou = msg.sentByYou;
            actualMessage.text = msg.text;
            return actualMessage;
          });
          return res(actualMessages);
        })
        .catch(err => {
          return rej(err);
        });
    });
  }
  constructor(private req: RequesterService) { }
}
