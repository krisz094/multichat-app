import { Component, OnInit } from '@angular/core';
import { Friendship } from '../entities/friendship';
import { MessagingService } from '../messaging.service';
import { ToastererService } from '../toasterer.service';

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.page.html',
  styleUrls: ['./friendrequests.page.scss'],
})
export class FriendrequestsPage implements OnInit {

  friendRequests: Friendship[];
  recipientEmail: string;

  constructor(private messaging: MessagingService, private toast: ToastererService) { }

  refreshFriendRequests() {
    this.messaging.refreshFriendRequests()
      .then(requests => {
        this.friendRequests = requests;
      })
      .catch(err => {
        this.toast.presentToast(err.error);
      });
  }

  acceptFriendRequest(id) {
    this.messaging.acceptFriendRequest(id)
      .then(() => {
        this.toast.presentToast('Accepted friend request');
        this.refreshFriendRequests();
      })
      .catch(err => {
        this.toast.presentToast(err.error);
      });
  }

  sendFriendRequest() {
    const mail = this.recipientEmail.trim();
    if (mail.length === 0) {
      return;
    }
    this.messaging.sendFriendRequest(mail)
      .then(resp => {
        this.toast.presentToast('Sent friend request to ' + mail);
      })
      .catch(err => {
        this.toast.presentToast(err);
      });
  }

  ngOnInit() {
    this.refreshFriendRequests();
  }

}
