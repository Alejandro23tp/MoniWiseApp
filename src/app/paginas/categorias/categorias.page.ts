import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { GastosService } from 'src/app/servicios/gastos.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  listaCategorias: any[] = [];

  listaCategoriasPredefinidas: any[] = [];

  categoria_nombre: string = '';
  constructor(
    private categoriasService: CategoriasService,
    private srvRegistro: RegistrosService,
    private srvGeneral: GeneralService,
    private modal: ModalController,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.cargarCategoriasPredefinidas();
    this.cargarCategoria();
  }

  async cargarCategoriasPredefinidas() {
    const loading = await this.loading.create({
      message: 'Cargando Categorías...',
      duration: 2000,
    });
    loading.present();

    this.srvRegistro.verCategoriasPredefinidas().subscribe((res: any) => {
      this.listaCategoriasPredefinidas = res.data;
      console.log(this.listaCategoriasPredefinidas);
      loading.dismiss();
    });
  }

  async cargarCategoria() {
    const loading = await this.loading.create({
      message: 'Cargando Categorías...',
      duration: 2000,
    });
    loading.present();
    this.categoriasService
      .verTodasCategoriasConNombreUsuario()
      .subscribe((res: any) => {
        console.log(res.data);
        this.listaCategorias = res.data;
        console.log('Lista Categorias: ', this.listaCategorias);
        loading.dismiss();
      });
  }

  crearCategoriaPredefinida() {
    if (this.categoria_nombre == '') {
      this.srvGeneral.fun_Mensaje('Por favor, ingrese un nombre', 'danger');
      return;
    }
    this.categoriasService
      .crearCategoriaPredefinida(this.categoria_nombre)
      .subscribe((res: any) => {
        if (res) {
          this.srvGeneral.fun_Mensaje(res.mensaje, 'success');
          this.categoria_nombre = '';
          this.modal.dismiss();

          this.cargarCategoriasPredefinidas();
        }
      });
  }
}
