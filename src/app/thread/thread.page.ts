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

  fetchLast10Messages() {
    return new Promise((res, rej) => {
      this.messaging.refreshMessages(this.threadId, null, null)
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

  fetchMessagesAfterLast() {
    return new Promise((res, rej) => {
      let lastMsgId;
      if (this.messages.length > 0) {
        lastMsgId = this.messages[this.messages.length - 1].id;
      } else {
        lastMsgId = null;
      }
      this.messaging.refreshMessages(this.threadId, lastMsgId, null)
        .then(messages => {
          this.messages = this.messages.concat(messages);
          return res();
        })
        .catch(err => {
          this.toast.presentToast(err);
          return rej();
        });
    });
  }

  fetch10MessagesBeforeFirst() {
    return new Promise((res, rej) => {
      let firstMsgId;
      if (this.messages.length > 0) {
        firstMsgId = this.messages[0].id;
      } else {
        firstMsgId = null;
      }
      this.messaging.refreshMessages(this.threadId, null, firstMsgId)
        .then(messages => {
          this.messages = messages.concat(this.messages);
          return res();
        })
        .catch(err => {
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
        this.fetchMessagesAfterLast()
          .then(() => {
            this.scrollToBottom(200);
          });
      })
      .catch(err => {
        this.toast.presentToast(err);
      });

    this.message = '';

  }

  scrollToBottom(dur = 0) {
    setTimeout(() => {
      this.content.scrollToBottom(dur);
    }, 300);
  }

  ngOnInit() {
    this.messages = [];
    this.threadId = this.route.snapshot.paramMap.get('threadId');
    this.fetchLast10Messages()
      .then(() => {
        this.scrollToBottom();
      });
  }

  ionViewDidLeave() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  ionViewDidEnter() {
    this.interval = setInterval(() => {
      this.fetchMessagesAfterLast();
    }, 3000);
  }

}
