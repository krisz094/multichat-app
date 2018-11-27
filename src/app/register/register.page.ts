import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ConstsService } from '../consts.service';
import { pathToFileURL } from 'url';
import { AuthService } from '../auth.service';
import { ToastController, NavController } from '@ionic/angular';
import { ToastererService } from '../toasterer.service';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  nick: string;
  password: string;

  constructor(
    private auth: AuthService,
    private toasterer: ToastererService,
    private nav: NavController,
    private messaging: MessagingService
  ) { }

  regButtonClick() {
    this.auth.register(this.email, this.nick, this.password)
      .then(resp => {
        this.toasterer.presentToast('Registered');
        this.nav.navigateForward('/friendrequests');
      })
      .catch(err => {
        console.log(err);
        this.toasterer.presentToast(err.error);
      });
  }

  ngOnInit() {
    if (this.messaging.loggedInUser) {
      this.nav.navigateRoot('/friends');
    }
  }

}
