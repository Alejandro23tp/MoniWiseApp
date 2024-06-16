import { IngresoService } from './../../servicios/ingreso.service';
import { GeneralService } from './../../servicios/general.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario_nombre: string = '';
  usuario_cedula: string = '';
  usuario_telefono: string = '';
  usuario_correo: string = '';
  usuario_usuario: string = '';
  usuario_clave: string = '';
  usuario_estado: number = 1;

  id_tipo_usuario: number = 0;
  tipo_usuario: string = '';
  lista_tipo_usuario: any[] = [];
  constructor(
    public GeneralService: GeneralService,
    private IngresoService: IngresoService,
    private loadig: LoadingController
  ) {}

  

  ngOnInit() {
    this.IngresoService.verTiposUsuario().subscribe((res: any) => {
      this.lista_tipo_usuario = res.data;
      console.log(this.lista_tipo_usuario);
    });
  }

  async registrarUsuario() {
    console.log(this.id_tipo_usuario);

    if (this.id_tipo_usuario == 0) {
      this.GeneralService.fun_Mensaje(
        'Por favor seleccione un tipo de usuario',
        'danger'
      );
      return;
    }
    if (this.usuario_nombre == '') {
      this.GeneralService.fun_Mensaje('Por favor ingrese su nombre', 'danger');
      return;
    }
    if (this.usuario_usuario == '') {
      this.GeneralService.fun_Mensaje('Por favor ingrese su usuario', 'danger');
      return;
    }
    if (this.usuario_clave == '') {
      this.GeneralService.fun_Mensaje('Por favor ingrese su clave', 'danger');
      return;
    }
    const loading = await this.loadig.create({
      message: 'Registrando usuario...',
      duration: 3000,
    });
    loading.present();

    let ObjetoUsuario = {
      nombre: this.usuario_nombre,
      cedula: this.usuario_cedula,
      telefono: this.usuario_telefono,
      correo: this.usuario_correo,
      usuario: this.usuario_usuario,
      contraseña: this.usuario_clave,
      estado: this.usuario_estado,
      tipo_usuario_id: this.id_tipo_usuario,
    };
    this.IngresoService.registrarUsuario(ObjetoUsuario).subscribe(
      (res: any) => {
        if (res.retorno == 1) {
          this.GeneralService.fun_Mensaje(res.mensaje, 'success');
          loading.dismiss();
          this.GeneralService.irA('login');
        } else {
          this.GeneralService.fun_Mensaje(res.mensaje, 'danger');
          loading.dismiss();
        }
      }
    );
  }
}
