import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private auth: AuthService, private nav: NavController) { }

  logOut() {
    this.auth.logout();
    this.nav.navigateRoot('/login');
  }

  ngOnInit() {
  }

}
