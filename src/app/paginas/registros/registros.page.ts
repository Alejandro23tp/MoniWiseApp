import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalcontentComponent } from 'src/app/componentes/modalcontent/modalcontent.component';
import { GeneralService } from 'src/app/servicios/general.service';
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {
  listaFrecuencias: any[] = [];

  frecuencia_nombre: string = '';
  sueldoFijo_monto: number = 0;
  sueldoFijo_frecuencia_id: number = 0;
  sueldoFijo_fecha_inicio: string = '';
  sueldoFijo_fecha_final: string = '';
  sueldoFijo_usuario_id: number = 0;
  sueldoFijo_estado: number = 1;
  sueldoFijo: string = '';
  existeSueldoFijo: boolean = false;

  listaSueldoFijos: any[] = [];

  mostrarFormulario: boolean = false; // Nueva propiedad
  modalContent: string = '';

  listaCategoriasPredefinidas: any[] = [];
  listaCategoriasPorId: any[] = [];

  categoria_nombre: string = '';
  categoria_descripcion: string = '';

  categoria_estado: number = 1;
  categoria_id: number = 0;

  nombreUsuario: string = '';

  ingreso_fecha: string = '';
  ingreso_monto: number = 0;
  ingreso_descripcion: string = '';
  ingreso_usuario_id: number = 0;
  ingreso_estado: number = 1;

  listaIngresos: any[] = [];

  async presentModal(contentType: string) {
    this.modalContent = contentType;
    const modal = await this.modalController.create({
      component: ModalcontentComponent,
      breakpoints: [0.25],
      initialBreakpoint: 0.25, // Asegúrate de definir ModalContentComponent
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
  constructor(
    private srvRegistro: RegistrosService,
    private srvGeneral: GeneralService,
    private modalController: ModalController,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.cargarUsuario();
    this.cargarFrecuencias();
    this.verificarSueldoFijo();
    this.cargarCategoriasPredefinidas();
    // this.cargarCategoriaPorId();
  }

  ionViewWillEnter() {
    this.cargarUsuario();
    this.cargarFrecuencias();
    //this.cargarCategoriaPorId();
    //this.cargarCategoriasPredefinidas();
  }

  cargarUsuario() {
    //Obtener el id deño usuario logueado en localStorage
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      const usuarioLogueadoObj2 = JSON.parse(usuarioLogueado).nombre;
      this.sueldoFijo_usuario_id = usuarioLogueadoObj;
      this.nombreUsuario = usuarioLogueadoObj2;
      console.log('usuario_id: ' + this.sueldoFijo_usuario_id);
      console.log('usuario_nombre: ' + this.nombreUsuario);
    }
  }

  cargarFrecuencias() {
    this.srvRegistro.verFrecuencias().subscribe((res: any) => {
      this.listaFrecuencias = res.data;
    });
  }

  verificarSueldoFijo() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      this.sueldoFijo_usuario_id = usuarioLogueadoObj;
      this.srvRegistro
        .verSueldoFijoPorUsuario(this.sueldoFijo_usuario_id)
        .subscribe((res: any) => {
          if (res.data.length > 0) {
            this.sueldoFijo = res.data[0].monto;
            //recorrer res.data desde [0] hasta el ultimo con for of
            for (let i = 0; i < res.data.length; i++) {
              //si lista de sueldo fijos no tiene datos, ejecuta el push caso contrario
              if (this.listaSueldoFijos.length == 0) {
                this.listaSueldoFijos.push(res.data[i]);
              } else {
                //this.listaSueldoFijos.push(res.data[i]);
              }
            }

            console.log('Sus Lista Sueldo Fijos: ', this.listaSueldoFijos);
            this.existeSueldoFijo = true;
          } else {
            this.existeSueldoFijo = false;
          }
        });
    }
  }

  registrarSueldoFijo() {
    let ObjetoSueldoFijo = {
      monto: this.sueldoFijo_monto,
      frecuencia_id: this.sueldoFijo_frecuencia_id,
      fecha_inicio: this.sueldoFijo_fecha_inicio,
      fecha_final: this.sueldoFijo_fecha_final,
      usuario_id: this.sueldoFijo_usuario_id,
      estado: this.sueldoFijo_estado,
    };
    this.srvRegistro
      .registrarSueldoFijo(ObjetoSueldoFijo)
      .subscribe((res: any) => {
        if (res.retorno == 1) {
          this.srvGeneral.fun_Mensaje(res.mensaje, 'success');
          //this.verificarSueldoFijo(); // Verificar de nuevo si el sueldo fijo ya está registrado
        } else {
          this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
        }
      });
  }

  registrarIngresos() {
    let ObjetoIngreso = {
      fecha: this.ingreso_fecha,
      monto: this.ingreso_monto,
      descripcion: this.ingreso_descripcion,
      usuario_id: this.sueldoFijo_usuario_id,
      estado: this.ingreso_estado,
    };
    console.log(ObjetoIngreso);
    this.srvRegistro.registrarIngresos(ObjetoIngreso).subscribe((res: any) => {
      if (res.retorno == 1) {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'success');
        //Limpiar campos de formulario
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
      console.log(this.listaCategoriasPredefinidas);
    });
  }

  registrarCategoria() {
    let ObjetoCategoria = {
      nombre: this.categoria_nombre,
      descripcion: this.categoria_descripcion,
      usuario_id: this.sueldoFijo_usuario_id,
      estado: this.categoria_estado,
    };
    console.log(ObjetoCategoria);
    this.srvRegistro
      .registrarCategoria(ObjetoCategoria)
      .subscribe((res: any) => {
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
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      this.sueldoFijo_usuario_id = usuarioLogueadoObj;
    }

    this.srvRegistro
      .verCategoriaPorId(this.sueldoFijo_usuario_id)
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

  onCategoriaChange(event: any) {
    const categoriaSeleccionada = this.listaCategoriasPredefinidas.find(
      (c) => c.id === event.detail.value
    );
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
    loading.present();
    this.srvRegistro
      .verIngresosUsuario(this.sueldoFijo_usuario_id)
      .subscribe((res: any) => {
        if (res.data.length > 0) {
          //recorrer res.data desde [0] hasta el ultimo con forEach
          if (this.listaIngresos.length == 0) {
            res.data.forEach((ingreso: any) => {
              this.listaIngresos.push(ingreso);
              
            });
           
          }
          loading.dismiss();
          console.log('Sus Lista Ingresos: ', this.listaIngresos);
        }
      });
  }
}
