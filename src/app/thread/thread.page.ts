import { Component, ViewChild, OnInit } from "@angular/core";
import { Content } from "@ionic/angular";
import { Message } from "../entities/message";
import { MessagingService } from "../messaging.service";
import { ActivatedRoute } from "@angular/router";
import { ToastererService } from "../toasterer.service";


@Component({
  selector: 'app-thread',
  templateUrl: './thread.page.html',
  styleUrls: ['./thread.page.scss'],
})
export class ThreadPage implements OnInit {

  @ViewChild(Content) content: Content;

  message: string;
  messages: Message[];
  threadId: string;
  interval;

  constructor(
    private route: ActivatedRoute,
    private messaging: MessagingService,
    private toast: ToastererService
  ) { }

  onKeyUp(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.sendMessage();
    }
  }

  fetchMessages() {
    return new Promise((res, rej) => {

      this.messaging.refreshMessages(this.threadId)
        .then(messages => {
          this.messages = messages;
          return res();
        })
        .catch(err => {
          this.toast.presentToast(err);
          return rej();
        });
    });
  }

  sendMessage() {
    const msg = this.message.trim();
    if (msg.length === 0) {
      return;
    }
    this.messaging.sendMessage(this.threadId, msg)
      .then(() => {
        this.fetchMessages()
          .then(() => {
            this.scrollToBottom(200);
          });
      })
      .catch(err => {

      });

    this.message = '';

  }

  scrollToBottom(dur = 0) {
    setTimeout(() => {
      this.content.scrollToBottom(dur);
    }, 300);
  }

  ngOnInit() {
    this.threadId = this.route.snapshot.paramMap.get('threadId');
    this.fetchMessages()
      .then(() => {
        this.scrollToBottom();
      })
  }

  ionViewDidLeave() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  ionViewDidEnter() {
    this.interval = setInterval(() => {
      this.fetchMessages();
    }, 3000);
  }

}
