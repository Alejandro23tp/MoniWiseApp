import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/servicios/general.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  listaUsuarios: any[] = [];

  id: number = 0;
  nombre: string = '';
  cedula: string = '';
  usuario: string = '';
  estado: number = 0;

  constructor(
    private srvUsuarios: UsuariosService,
    private srvG: GeneralService,
    private alertCtrl: AlertController,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.srvUsuarios.verUsuarios().subscribe((res: any) => {
      console.log(res.data);
      this.listaUsuarios = res.data;
    });
  }

  async cambiarEstado(usuario: any) {
    const data = {
      usuario_id: usuario.id,
      estado: usuario.estado ? 1 : 0,
    };

    const loading = await this.loading.create({
      message: 'Cambiando estado...',
      duration: 3000,
    });
    loading.present();
    this.srvUsuarios.cambiarEstadoUsuario(data).subscribe((res: any) => {
      if (res.retorno == 1) {
        this.srvG.fun_Mensaje(res.mensaje, 'success');
        3;
        loading.dismiss();
        this.cargarUsuarios();
      } else {
        this.srvG.fun_Mensaje(res.mensaje, 'danger');
        loading.dismiss();
      }
    });
  }

  async confirmarAntivarDesactivar(usuario: any) {
    const mensaje = usuario.estado 
      ? '¿Estás seguro de que deseas activar el usuario?'
      : '¿Estás seguro de que deseas desactivar el usuario?';

    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'tertiary',
          handler: () => {
            console.log('Cancelar');
            this.cargarUsuarios();
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            //Llama al método cambiarEstado
            this.cambiarEstado(usuario);
          },
        },
      ],
    });

    await alert.present();
  }
}
