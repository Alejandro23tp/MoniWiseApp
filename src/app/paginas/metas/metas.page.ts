import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/servicios/general.service';
import { MetasService } from 'src/app/servicios/metas.service';
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
})
export class MetasPage implements OnInit {
  listaFrecuencias: any[] = [];
  listaCategoriasPorId: any[] = [];

  usuario_id: number = 0;

  constructor(
    private srvMetas: MetasService,
    private srvGeneral: GeneralService,
    private srvRegistro: RegistrosService,
    private loading: LoadingController,
  ) { }

  ngOnInit() {
    this.cargarFrecuencias();
    this.cargarCategoriaPorId();
  }

  cargarFrecuencias() {
    this.srvRegistro.verFrecuencias().subscribe((res: any) => {
      this.listaFrecuencias = res.data;
      console.log('Sus Lista Frecuencias: ', this.listaFrecuencias);
      
    });
  }

  async cargarCategoriaPorId() {
    const loading = await this.loading.create({
      message: 'Cargando...',
    });
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      this.usuario_id = usuarioLogueadoObj;
    }

    this.srvRegistro
      .verCategoriaPorId(this.usuario_id)
      .subscribe((res: any) => {
        if (res.data.length > 0) {
          //recorrer res.data desde [0] hasta el ultimo con forEach

          if (this.listaCategoriasPorId.length == 0) {
            res.data.forEach((categoria: any) => {
              this.listaCategoriasPorId.push(categoria);
             
              
            });
          }

          console.log('Sus Lista Categorias: ', this.listaCategoriasPorId);
        }
      });
  }

}
