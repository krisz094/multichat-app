import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth.service';
import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in',
      loggedInFunction: false
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'document',
      loggedInFunction: false
    },
    {
      title: 'Friend requests',
      url: '/friendrequests',
      icon: 'person-add',
      loggedInFunction: true
    },
    {
      title: 'Friends',
      url: '/friends',
      icon: 'contacts',
      loggedInFunction: true
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings',
      loggedInFunction: true
    },
    {
      title: 'News',
      url: '/news',
      icon: 'paper',
      loggedInFunction: true
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public messaging: MessagingService,
    public auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.auth.tryLocalLogin();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
