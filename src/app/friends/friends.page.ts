import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { MessagingService } from '../messaging.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  loggedInUser: User;
  interval;

  constructor(private messaging: MessagingService, private navCtrl: NavController) { }

  openThreadsOfFriend(friendId) {
    // this.router.navi(`/threads/${friendId}`);
    this.navCtrl.navigateForward(`/threads/${friendId}`);
  }

  ngOnInit() {
    this.loggedInUser = this.messaging.loggedInUser;
    this.messaging.refreshFriends();

  }

  ionViewDidLeave() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  ionViewDidEnter() {
    this.interval = setInterval(() => {
      this.messaging.refreshFriends();
    }, 3000);
  }

}
