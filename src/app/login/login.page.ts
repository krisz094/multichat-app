import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastererService } from '../toasterer.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  loginButtonClick() {
    this.auth.login(this.email, this.password)
      .then(resp => {
        this.toasterer.presentToast('Logged in');
        this.nav.navigateForward('/friends');
      })
      .catch(err => {
        this.toasterer.presentToast(err.error);
      });
  }

  constructor(private auth: AuthService, private toasterer: ToastererService, private nav: NavController) { }

  ngOnInit() {
  }

}
