import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { SeleccionarIngresoComponent } from 'src/app/componentes/seleccionar-ingreso/seleccionar-ingreso.component';
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
  frecuencia_id: number = 0;
  nombre: string = '';
  monto_objetivo: number = 0;
  fecha_creacion: string = '';
  fecha_inicio: string = '';
  fecha_final: string = '';
  estado: number = 0;

  meta_id: number = 0;

  segment: string = 'registrar';

  listaPagosAhorro: any[] = [];
  listaIngresos: any[] = [];

  sumaIngresos: number = 0;

  id: number = 0;
  monto: number = 0;

  constructor(
    private srvMetas: MetasService,
    private srvGeneral: GeneralService,
    private srvRegistro: RegistrosService,
    private loading: LoadingController,
    private modalController: ModalController
  ) {}

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
    this.usuariologueado();

    this.srvRegistro
      .verCategoriaPorId(this.usuario_id)
      .subscribe((res: any) => {
        if (res.data.length > 0) {
          if (this.listaCategoriasPorId.length == 0) {
            res.data.forEach((categoria: any) => {
              this.listaCategoriasPorId.push(categoria);
            });
          }
          console.log('Sus Lista Categorias: ', this.listaCategoriasPorId);
        }
      });
  }

  usuariologueado() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      this.usuario_id = usuarioLogueadoObj;
    }
  }

  cargarPagosAhorroporUsuario() {
    this.usuariologueado();

    this.srvMetas
      .verPagosAhorroUsuario(this.usuario_id)
      .subscribe((res: any) => {
        this.listaPagosAhorro = res.data;
        console.log('Sus Lista Pagos Ahorro: ', this.listaPagosAhorro);
      });
  }

  actualizarFechaFinal() {
    if (this.fecha_inicio && this.frecuencia_id) {
      const fechaInicio = new Date(this.fecha_inicio);
      let fechaFinal = new Date(fechaInicio);

      switch (this.frecuencia_id) {
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

      this.fecha_final = fechaFinal.toISOString().split('T')[0];
    }
  }

  async registrarMetasAhorro() {
    const loading = await this.loading.create({
      message: 'Registrando...',
    });
    loading.present();
    const objMetas: any = {
      nombre: this.nombre,
      monto_objetivo: this.monto_objetivo,
      frecuencia_id: this.frecuencia_id,
      fecha_creacion: new Date().toISOString().split('T')[0],
      fecha_inicio: this.fecha_inicio,
      fecha_final: this.fecha_final,
      usuario_id: this.usuario_id,
      estado: this.estado,
    };

    console.log('Objeto a Registrar: ', objMetas);

    this.srvMetas.registrarMetasAhorro(objMetas).subscribe(async (res: any) => {
      if (res.retorno == 1) {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'primary');
        loading.dismiss();

        // Obtener el ID de la meta recién registrada
        this.meta_id = res.id;

        // Calcular y registrar los pagos
        await this.registrarPagosAhorro();
      } else {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
      }
    });
  }

  async registrarPagosAhorro() {
    const loading = await this.loading.create({
      message: 'Esto puede tomar un momento...',
    });
    loading.present();
    const fechaInicio = new Date(this.fecha_inicio);
    const fechaFinal = new Date(this.fecha_final);
    const diffTime = Math.abs(fechaFinal.getTime() - fechaInicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const montoPorDia = this.monto_objetivo / diffDays;

    for (let i = 0; i < diffDays; i++) {
      const fechaPago = new Date(fechaInicio);
      fechaPago.setDate(fechaPago.getDate() + i);

      const objPagos = {
        monto: montoPorDia,
        fecha: fechaPago.toISOString().split('T')[0],
        meta_id: this.meta_id,
        usuario_id: this.usuario_id,
        estado_pago: this.estado,
      };

      try {
        const res: any = await this.srvMetas
          .registrarPagosAhorro(objPagos)
          .toPromise();
        if (res.retorno == 1) {
          console.log('Pago registrado: ', res.data);
        } else {
          console.log('Error al registrar el pago: ', res.mensaje);
        }
      } catch (error) {
        console.error('Error al registrar el pago:', error);
      }
    }

    this.srvGeneral.fun_Mensaje(
      'Todos los pagos han sido registrados.',
      'primary'
    );
    loading.dismiss();
    this.cargarPagosAhorroporUsuario();
  }

  async actualizarEstadoPago(pago: any) {
    const modal = await this.modalController.create({
      component: SeleccionarIngresoComponent,
      componentProps: {
        ingresos: this.listaIngresos,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const ingresoSeleccionado = data.data;
        console.log('Ingreso seleccionado: ', ingresoSeleccionado);
        
        if (ingresoSeleccionado.monto >= pago.monto) {
          ingresoSeleccionado.monto -= pago.monto;
          const estado = 1
          const objPagos = {
            id: pago.id,
            estado_pago: estado,
          };
          console.log('Objeto de pago: ', objPagos);
          

          this.srvMetas.cambiarEstadoPagosAhorro(objPagos).subscribe(
            (res: any) => {
              if (res.retorno == 1) {
                this.srvGeneral.fun_Mensaje(res.mensaje, 'primary');
                const objMonto = {
                  id: ingresoSeleccionado.id,
                  monto: ingresoSeleccionado.monto,
                };
                console.log('Objeto de pago: ', objMonto);
                this.srvRegistro.cambiarMontoPorId(objMonto).subscribe(
                  (res: any) => {
                    if (res.retorno == 1) {
                      this.srvGeneral.fun_Mensaje(res.mensaje, 'primary');
                    } else {
                      this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
                    }
                  },
                );
              } else {
                this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
              }
            },
            (error) => {
              console.error('Error al actualizar el estado del pago: ', error);
              this.srvGeneral.fun_Mensaje('Error al actualizar el estado del pago', 'danger');
            }
          );
        } else {
          this.srvGeneral.fun_Mensaje('El monto del ingreso seleccionado es insuficiente.', 'danger');
        }
      }
    });

    await modal.present();
  }

  cargarIngresos() {
    this.usuariologueado();

    this.srvRegistro
      .verIngresosUsuario(this.usuario_id)
      .subscribe((res: any) => {
        this.listaIngresos = res.data;
        this.calcularSumaIngresos();
        console.log('Sus Lista Ingresos: ', this.listaIngresos);
      });
  }

  calcularSumaIngresos() {
    this.sumaIngresos = this.listaIngresos.reduce(
      (acc, ingreso) => acc + parseFloat(ingreso.monto),
      0
    );
  }

  cambiarMontoPorId() {
    const objPagos = {
      id: this.id,
      monto: this.monto,
    };

    this.srvRegistro.cambiarMontoPorId(objPagos).subscribe(async (res: any) => {
      if (res.retorno == 1) {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'primary');
      }
    });
  }
}
