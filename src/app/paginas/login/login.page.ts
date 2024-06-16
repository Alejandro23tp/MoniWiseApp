import { IngresoService } from 'src/app/servicios/ingreso.service';
import { GeneralService } from './../../servicios/general.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  clave: string = '';

  constructor(
    private srvG: GeneralService,
    private SrvI: IngresoService,
    private loading: LoadingController,
    private toast : ToastController
  ) {}

  ngOnInit() {}

  async onSubmit() {
    const loading = await this.loading.create({
      message: 'Iniciando sesión...',
      spinner: 'bubbles',
    });

    if (this.usuario.trim() == '') {
      return;
    }

    if (this.clave.trim() == '') {
      return;
    }
    loading.present();
    this.SrvI.login({
      usuario: this.usuario,
      contraseña: this.clave,
    }).subscribe((res: any) => {
      if (res.retorno == '1') {
        this.fun_Mensaje(res.mensaje, 'primary');
        //Tomar los datos del usuario logueado y guardarlos en localStorage
        const id = res.usuario_id;
        const nombreUsuario = res.usuario_nombre;
        const estado = res.usuario_activo;
        //mandar en json el usuario logueado
        const usuarioLogueado = {
          id: id,
          nombre: nombreUsuario,
          usuario: this.usuario,
          contraseña: this.clave,
          estado: estado,
          tipo_usuario_id: res.tipo_usuario_id,
        };
        localStorage.setItem(
          'usuarioLogueado',
          JSON.stringify(usuarioLogueado)
        );

        this.srvG.irA('/principal');
        loading.dismiss();
      } else {
        //  this.srvG.fun_Mensaje('Error al iniciar sesión');
        this.srvG.fun_Mensaje(res.mensaje, 'danger');
        loading.dismiss();
      }
    });
  }

  goToRegister() {
    this.srvG.irA('/register');
  }

  goToForgotPassword() {
    this.srvG.irA('/forgot');
  }

 //funcion emite mensaje
 async fun_Mensaje(texto: string, tipo: string = 'success') {
  let t = await this.toast.create({
    message: texto,
    color: tipo,
    duration: 1000,
    
  });
  t.present();
}

}
