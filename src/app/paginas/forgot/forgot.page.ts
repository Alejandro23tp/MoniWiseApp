import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/servicios/general.service';
import { IngresoService } from 'src/app/servicios/ingreso.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  usuario: string = '';
  clave: string = '';

  constructor(
    private SrvG : GeneralService,
    private SrvI : IngresoService,
    private loading : LoadingController,
  ) { }
  handleRefresh(event: any) {
    setTimeout(() => {
     
      
      event.target.complete();
      //recargar pagina

      
      
    }, 2000);
  }

  ngOnInit() {
  }


  async recuperarClave(){
    const loading = await this.loading.create({
      message: 'Recuperando clave...',
    });
    loading.present();

    if (this.clave.trim() == '') {
      this.SrvG.fun_Mensaje('Clave es requerida', 'danger');
      loading.dismiss();
      return;
      
    }

    this.SrvI.recuperarClave(this.usuario, this.clave).subscribe(
      (res : any) => {
       if(res.retorno == 1){
        this.SrvG.fun_Mensaje(res.mensaje, 'primary');
        this.SrvG.irA('login');
       }else{
        this.SrvG.fun_Mensaje(res.mensaje, 'danger');
       }
       loading.dismiss();
      },
    )
  }

}
