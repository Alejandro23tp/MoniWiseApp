import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalcontentComponent } from 'src/app/componentes/modalcontent/modalcontent.component';
import { GeneralService } from 'src/app/servicios/general.service';
import { MenuService } from 'src/app/servicios/menu.service';
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {
  listaFrecuencias: any[] = [];
  sueldoFijo_usuario_id: number = 0;
  sueldoFijo: string = '';
  existeSueldoFijo: boolean = false;
  listaSueldoFijos: any[] = [];
  listaCategoriasPredefinidas: any[] = [];
  listaCategoriasPorId: any[] = [];
  listaIngresos: any[] = [];
  ListaMenus: any = [];
  nombreUsuario: string = '';
  mostrarFormulario: boolean = false;
  modalContent: string = '';
  id_tipo_usuario: number = 0;

  // Variables para los formularios
  frecuencia_nombre: string = '';
  sueldoFijo_monto: number = 0;
  sueldoFijo_frecuencia_id: number = 0;
  sueldoFijo_fecha_inicio: string = '';
  sueldoFijo_fecha_final: string = '';
  sueldoFijo_estado: number = 1;
  categoria_nombre: string = '';
  categoria_descripcion: string = '';
  categoria_estado: number = 1;
  categoria_id: number = 0;
  ingreso_fecha: string = '';
  ingreso_monto: number = 0;
  ingreso_descripcion: string = '';
  ingreso_estado: number = 1;

  constructor(
    private srvRegistro: RegistrosService,
    private srvGeneral: GeneralService,
    private modalController: ModalController,
    private loading: LoadingController,
    private srvM: MenuService,
    private router: Router
  ) {}

  async ngOnInit() {
    
    
    const loading = await this.loading.create({
      message: 'Cargando datos...',
    });
    await loading.present();

    // Cargar datos en paralelo
    await Promise.all([
      this.cargarFrecuencias(),
      this.cargarUsuario(),
      this.cargarCategoriasPredefinidas(),
      this.obtenerMenusPorTipoUsuario(),
      this.cargarCategoriaPorId(),
    ]);

    this.verificarSueldoFijo();
    loading.dismiss();
  }

  ionViewWillEnter(){
   
    this.verificarSueldoFijo();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.cargarFrecuencias(),
      this.cargarUsuario(),
      this.cargarCategoriasPredefinidas(),
      this.obtenerMenusPorTipoUsuario(),
      this.cargarCategoriaPorId();
      this.verificarSueldoFijo();
     


    }, 2000);
  }

  async cargarUsuario() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado);
      this.sueldoFijo_usuario_id = usuarioLogueadoObj.id;
      this.nombreUsuario = usuarioLogueadoObj.nombre;
      this.id_tipo_usuario = usuarioLogueadoObj.tipo_usuario_id;
      console.log('usuario_id: ' + this.sueldoFijo_usuario_id);
      console.log('usuario_nombre: ' + this.nombreUsuario);
    }
  }

  async cargarFrecuencias() {
    this.srvRegistro.verFrecuencias().subscribe((res: any) => {
      this.listaFrecuencias = res.data;
    });
  }

  verificarSueldoFijo() {
    if (this.sueldoFijo_usuario_id) {
      this.srvRegistro.verSueldoFijoPorUsuario(this.sueldoFijo_usuario_id).subscribe((res: any) => {
        if (res.data.length > 0) {
          this.sueldoFijo = res.data[0].monto;
          this.listaSueldoFijos = res.data;
          this.existeSueldoFijo = true;
        } else {
          this.existeSueldoFijo = false;
        }
      });
    }
  }

  registrarSueldoFijo() {
    const ObjetoSueldoFijo = {
      monto: this.sueldoFijo_monto,
      frecuencia_id: this.sueldoFijo_frecuencia_id,
      fecha_inicio: this.sueldoFijo_fecha_inicio,
      fecha_final: this.sueldoFijo_fecha_final,
      usuario_id: this.sueldoFijo_usuario_id,
      estado: this.sueldoFijo_estado,
    };
    this.srvRegistro.registrarSueldoFijo(ObjetoSueldoFijo).subscribe((res: any) => {
      if (res.retorno == 1) {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'success');
        this.verificarSueldoFijo();
      } else {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
      }
    });
  }

  registrarIngresos() {
    const ObjetoIngreso = {
      fecha: this.ingreso_fecha,
      monto: this.ingreso_monto,
      descripcion: this.ingreso_descripcion,
      usuario_id: this.sueldoFijo_usuario_id,
      estado: this.ingreso_estado,
    };
    this.srvRegistro.registrarIngresos(ObjetoIngreso).subscribe((res: any) => {
      if (res.retorno == 1) {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'success');
        this.ingreso_fecha = '';
        this.ingreso_monto = 0;
        this.ingreso_descripcion = '';
      } else {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
      }
    });
  }

  actualizarFechaFinal() {
    if (this.sueldoFijo_fecha_inicio && this.sueldoFijo_frecuencia_id) {
      const fechaInicio = new Date(this.sueldoFijo_fecha_inicio);
      let fechaFinal = new Date(fechaInicio);

      switch (this.sueldoFijo_frecuencia_id) {
        case 1: // Mensual
          fechaFinal.setMonth(fechaFinal.getMonth() + 1);
          break;
        case 2: // Quincenal
          fechaFinal.setDate(fechaFinal.getDate() + 15);
          break;
        case 3: // Semanal
          fechaFinal.setDate(fechaFinal.getDate() + 7);
          break;
        default:
          break;
      }

      this.sueldoFijo_fecha_final = fechaFinal.toISOString().split('T')[0];
    }
  }

  mostrarFormularioRegistro() {
    this.mostrarFormulario = true; // Mostrar formulario para registrar otro sueldo fijo
  }

  ocultarFormularioRegistro() {
    this.mostrarFormulario = false; // Ocultar formulario de registro
  }

  cargarCategoriasPredefinidas() {
    this.srvRegistro.verCategoriasPredefinidas().subscribe((res: any) => {
      this.listaCategoriasPredefinidas = res.data;
    });
  }

  registrarCategoria() {
    const ObjetoCategoria = {
      nombre: this.categoria_nombre,
      descripcion: this.categoria_descripcion,
      usuario_id: this.sueldoFijo_usuario_id,
      estado: this.categoria_estado,
    };
    this.srvRegistro.registrarCategoria(ObjetoCategoria).subscribe((res: any) => {
      if (res.retorno == 1) {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'success');
      } else {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
      }
    });
  }

  async cargarCategoriaPorId() {
    const loading = await this.loading.create({
      message: 'Cargando...',
    });
    if (this.sueldoFijo_usuario_id) {
      this.srvRegistro.verCategoriaPorId(this.sueldoFijo_usuario_id).subscribe((res: any) => {
        if (res.data.length > 0) {
          this.listaCategoriasPorId = res.data;
        }
        loading.dismiss();
      });
    }
  }

  onCategoriaChange(event: any) {
    const categoriaSeleccionada = this.listaCategoriasPredefinidas.find(c => c.id === event.detail.value);
    if (categoriaSeleccionada) {
      this.categoria_nombre = categoriaSeleccionada.nombre;
      this.categoria_descripcion = '';
    } else {
      this.categoria_nombre = '';
      this.categoria_descripcion = '';
    }
  }

  async cargarIngresos() {
    const loading = await this.loading.create({
      message: 'Cargando ingresos...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.srvRegistro.verIngresosUsuario(this.sueldoFijo_usuario_id).subscribe((res: any) => {
      this.listaIngresos = res.data;
      this.calcularSumaIngresos();
      loading.dismiss();
    });
  }

  async obtenerMenusPorTipoUsuario() {
    const loading = await this.loading.create({
      message: 'Obteniendo menús...',
      duration: 3000,
    });
    await loading.present();
    this.srvM.obtenerMenusPorTipoUsuario(this.id_tipo_usuario).subscribe((res: any) => {
      this.ListaMenus = res.menus;
      loading.dismiss();
    });
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  calcularSumaIngresos() {
    
  }

  async presentModal(contentType: string) {
    this.modalContent = contentType;
    const modal = await this.modalController.create({
      component: ModalcontentComponent,
      breakpoints: [0.30],
      initialBreakpoint: 0.30, // Asegúrate de definir ModalContentComponent
      //Los componentProps son los que se pasan a la vista del componente modal
      componentProps: {
        modalContent: this.modalContent,
        nombreUsuario: this.nombreUsuario,
        listaCategoriasPorId: this.listaCategoriasPorId,
        listaSueldoFijos: this.listaSueldoFijos,
      },
    });
    return await modal.present();
  }

  openCategoriaModal() {
    this.presentModal('categoria');
  }

  openSueldoFijoModal() {
    this.presentModal('sueldoFijo');
  }

  closeModal(modal: any) {
    modal.dismiss();
  }
}
