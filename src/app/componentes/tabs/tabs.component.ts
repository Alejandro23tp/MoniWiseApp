import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MenuService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  tipo_usuario_id: number = 0;
  ListaMenus: any = [];

  constructor(
    private srvM: MenuService,
    private router: Router,
    private loadig: LoadingController
  ) {}

  ngOnInit() {
    //Obtener el tipo de usuario logueado en localStorage
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).tipo_usuario_id;
      this.tipo_usuario_id = usuarioLogueadoObj;
      console.log(this.tipo_usuario_id);
    }

    this.obtenerMenusPorTipoUsuario();
  }

  async obtenerMenusPorTipoUsuario() {
    const loadin = await this.loadig.create({
      message: 'Obteniendo menus...',
      duration: 3000,
    });
    loadin.present();

    this.srvM
      .obtenerMenusPorTipoUsuario(this.tipo_usuario_id)
      .subscribe((res: any) => {
        this.ListaMenus = res.menus;
        console.log(this.ListaMenus);
        loadin.dismiss();
      });
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
    this.obtenerMenusPorTipoUsuario();
  }
}
