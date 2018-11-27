import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastererService {
  async presentToast(message) {
    const t = await this.toast.create({
      message,
      duration: 3000,
      position: 'top'
    });
    t.present();
  }
  constructor(private toast: ToastController) { }
}
