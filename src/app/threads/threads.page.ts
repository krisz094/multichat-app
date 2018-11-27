import { Component, OnInit } from '@angular/core';
import { Thread } from '../entities/thread';
import { Message } from '../entities/message';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { MessagingService } from '../messaging.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-threads',
  templateUrl: './threads.page.html',
  styleUrls: ['./threads.page.scss'],
})
export class ThreadsPage implements OnInit {

  threads: Thread[];
  friendshipId: string;
  interval;

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private messaging: MessagingService) { }

  goToThread(threadId) {
    this.navCtrl.navigateForward(`/thread/${threadId}`);
  }

  createThread() {
    this.messaging.createThread(this.friendshipId).then(() => {
      this.refreshThreads();
    });
  }

  refreshThreads() {
    this.messaging.refreshThreads(this.friendshipId)
      .then(threads => {
        if (!_.isEqual(threads, this.threads)) {
          this.threads = threads;
        }
        console.log(threads);
      })
      .catch(err => {
        console.log(err);
      });
  }


  ngOnInit() {
    this.friendshipId = this.route.snapshot.paramMap.get('friendshipId');
    this.refreshThreads();

    console.log(this.friendshipId);

  }

  ionViewDidLeave() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  ionViewDidEnter() {
    this.interval = setInterval(() => {
      this.refreshThreads();
    }, 3000);
  }
}
