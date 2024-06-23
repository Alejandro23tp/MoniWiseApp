import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalcontent',
  templateUrl: './modalcontent.component.html',
  styleUrls: ['./modalcontent.component.scss'],
})
export class ModalcontentComponent  implements OnInit {
  @Input() modalContent: string = '';
  @Input() nombreUsuario: string = '';
  @Input() listaCategoriasPorId: any[] = [];
  @Input() listaSueldoFijos: any[] = [];

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    console.log('modal');
    
  }

}
