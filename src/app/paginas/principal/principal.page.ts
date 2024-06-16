import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { GeneralService } from 'src/app/servicios/general.service';
import { IngresoService } from 'src/app/servicios/ingreso.service';
import { MenuService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario_id: number = 0;
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

  ListaMenus: any = [];

  constructor(
    private alertCtrl: AlertController,
    private srvG: GeneralService,
    private srvI: IngresoService,
    private srvM: MenuService,
    private modalCtrl: ModalController,
    private loadig: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    //Obtener el id deño usuario logueado en localStorage
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      const usuarioLogueadoObj2 = JSON.parse(usuarioLogueado).tipo_usuario_id;
      this.usuario_id = usuarioLogueadoObj;
      console.log('usuario_id: ' + this.usuario_id);
      this.id_tipo_usuario = usuarioLogueadoObj2;
    }

    this.datos();
    this.obtenerMenusPorTipoUsuario();
  }

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

    this.router.navigate(['/login']);
  }

  async modificarPerfil() {
    const loadin = await this.loadig.create({
      message: 'Modificando perfil...',
      duration: 3000,
    });
    loadin.present();

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      this.usuario_id = usuarioLogueadoObj;
    }

    const ObjetoUsuario = {
      nombre: this.usuario_nombre,
      cedula: this.usuario_cedula,
      telefono: this.usuario_telefono,
      correo: this.usuario_correo,
      usuario: this.usuario_usuario,
      contraseña: this.usuario_clave,
      estado: this.usuario_estado,
    };

    this.srvM
      .editarUsuarioPorId(this.usuario_id, ObjetoUsuario)
      .subscribe((res: any) => {
        if (res.retorno == 1) {
          this.srvG.fun_Mensaje(res.mensaje, 'primary');
          loadin.dismiss();
          //Cerrar Modal
          this.modalCtrl.dismiss();
          this.srvG.irA('/principal');
        } else {
          this.srvG.fun_Mensaje(res.mensaje, 'danger');
          loadin.dismiss();
        }
      });
  }

  datos() {
    console.log('usuario recibido', this.usuario_id);

    this.srvM.listarUsuarioPorId(this.usuario_id).subscribe((res: any) => {
      console.log('usuarios recibido', res.usuario);

      this.usuario_nombre = res.usuario.nombre;
      this.usuario_cedula = res.usuario.cedula;
      this.usuario_telefono = res.usuario.telefono;
      this.usuario_correo = res.usuario.correo;
      this.usuario_usuario = res.usuario.usuario;
      this.usuario_clave = res.usuario.contraseña;
      this.usuario_estado = res.usuario.estado;
    });
  }

  async obtenerMenusPorTipoUsuario() {
    const loadin = await this.loadig.create({
      message: 'Obteniendo menus...',
      duration: 3000,
    });
    loadin.present();

    this.srvM
      .obtenerMenusPorTipoUsuario(this.id_tipo_usuario)
      .subscribe((res: any) => {
        this.ListaMenus = res.menus;
        console.log(this.ListaMenus);
        loadin.dismiss();
      });
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      //Obtener el id deño usuario logueado en localStorage
      const usuarioLogueado = localStorage.getItem('usuarioLogueado');
      if (usuarioLogueado != null) {
        const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
        const usuarioLogueadoObj2 = JSON.parse(usuarioLogueado).tipo_usuario_id;
        this.usuario_id = usuarioLogueadoObj;
        console.log('usuario_id: ' + this.usuario_id);
        this.id_tipo_usuario = usuarioLogueadoObj2;
      }

      this.datos();
      this.obtenerMenusPorTipoUsuario();
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    //Obtener el id deño usuario logueado en localStorage
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      const usuarioLogueadoObj2 = JSON.parse(usuarioLogueado).tipo_usuario_id;
      this.usuario_id = usuarioLogueadoObj;
      console.log('usuario_id: ' + this.usuario_id);
      this.id_tipo_usuario = usuarioLogueadoObj2;
    }

    this.datos();
    this.obtenerMenusPorTipoUsuario();
  }
}
