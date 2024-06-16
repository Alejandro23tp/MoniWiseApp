import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private srvG: GeneralService
  ) { }

  ngOnInit() {}


  async confirmarSalir() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'tertiary',
          handler: () => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Salir',
          handler: () => {
            this.signOut(); // Llama al método signOut si el usuario confirma salir
          },
        },
      ],
    });

    await alert.present();
  }

  signOut() {
    //Borrar Usuario logueado de localStorage
    localStorage.removeItem('usuarioLogueado');
    this.srvG.irA('login');
  }
   
}
