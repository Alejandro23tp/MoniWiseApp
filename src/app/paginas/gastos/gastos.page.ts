import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalcontentComponent } from 'src/app/componentes/modalcontent/modalcontent.component';
import { GastosService } from 'src/app/servicios/gastos.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
  usuario_id: number = 0;
  usuario_nombre: string = '';
  sueldoFijo: number = 0;

  listaSueldoFijos: any[] = [];
  
  gasto_monto: number = 0;
  gasto_fecha: string = '';
  gasto_descripcion: string = '';
  gasto_categoria_id: number = 0;
  gasto_usuario_id: number = 0;
  gasto_estado_pago: number = 0;

  segmento: string = 'desglosar';
  constructor(
    private srvGastos: GastosService,
    private srvGeneral: GeneralService,
    private modalController: ModalController,
    private modal: ModalController,
    private srvRegistro: RegistrosService,
    
  ) {}

  ngOnInit() {
    this.verificarSueldoFijo();
   
  }


  verificarSueldoFijo() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      this.usuario_id = usuarioLogueadoObj;
      const usuarioLogueadoObj2 = JSON.parse(usuarioLogueado).nombre;
      this.usuario_nombre = usuarioLogueadoObj2;
      this.srvRegistro
        .verSueldoFijoPorUsuario(this.usuario_id)
        .subscribe((res: any) => {
          if (res.data.length > 0) {
            this.sueldoFijo = res.data[0].monto;
            //recorrer res.data desde [0] hasta el ultimo con forEach
            res.data.forEach((sueldoFijo: any) => {
              this.listaSueldoFijos.push(sueldoFijo);
            });
            console.log('Sus Lista Sueldo Fijos: ' ,this.listaSueldoFijos);
          
          } 
        });
    }
  }

 
}
