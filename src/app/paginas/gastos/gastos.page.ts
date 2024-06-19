import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalcontentComponent } from 'src/app/componentes/modalcontent/modalcontent.component';
import { GastosService } from 'src/app/servicios/gastos.service';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
  
  constructor(
    
  ) {}

  ngOnInit() {
   
  }

 
}
