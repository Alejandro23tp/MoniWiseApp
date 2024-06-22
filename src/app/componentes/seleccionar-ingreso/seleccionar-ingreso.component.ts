import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-ingreso',
  templateUrl: './seleccionar-ingreso.component.html',
  styleUrls: ['./seleccionar-ingreso.component.scss'],
})
export class SeleccionarIngresoComponent  implements OnInit {
  ingresos: any[] = [];

  constructor(private modalCtrl: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.ingresos = this.navParams.get('ingresos');
  }

  seleccionarIngreso(ingreso: any) {
    this.modalCtrl.dismiss(ingreso);
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
