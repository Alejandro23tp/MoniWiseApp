import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GastosService } from 'src/app/servicios/gastos.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { RegistrosService } from 'src/app/servicios/registros.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
  usuario_id: number = 0;
  usuario_nombre: string = '';
  sueldoFijo: number = 0;
  listaSueldoFijos: any[] = [];

  gasto_monto: number = 0;
  gasto_fecha: string = '';
  gasto_descripcion: string = '';
  gasto_categoria_id: number = 0;
  gasto_estado_pago: number = 0;

  Categorias: any[] = [];
  listaGastos: any[] = [];
  segmento: string = 'desglosar';
  minDate: string = '';
  maxDate: string = '';

  montoactivo: number = 0;
  constructor(
    private srvGastos: GastosService,
    private srvGeneral: GeneralService,
    private modalController: ModalController,
    private srvRegistro: RegistrosService
  ) {}

  ngOnInit() {
    this.verificarSueldoFijo();
    this.cargarCategorias();
    this.cargarGastos();
    this.calcularSaldoDisponible();
    this.calcularGastosActivos();
  }

  ionViewWillEnter() {
    this.cargarCategorias();
    this.verificarSueldoFijo
  }

  verificarSueldoFijo() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado);
      this.usuario_id = usuarioLogueadoObj.id;
      this.usuario_nombre = usuarioLogueadoObj.nombre;

      this.srvRegistro
        .verSueldoFijoPorUsuario(this.usuario_id)
        .subscribe((res: any) => {
          if (res.data.length > 0) {
            this.sueldoFijo = res.data[0].monto;
            this.listaSueldoFijos = res.data;
            this.minDate = res.data[0].fecha_inicio;
            this.maxDate = res.data[0].fecha_final;
            console.log(this.listaSueldoFijos);
          }
        });
    }
  }

  registrarGasto() {
    if (
      !this.gasto_monto ||
      !this.gasto_fecha ||
      !this.gasto_descripcion ||
      !this.gasto_categoria_id ||
      this.gasto_estado_pago == null
    ) {
      this.srvGeneral.fun_Mensaje(
        'Por favor, complete todos los campos.',
        'danger'
      );
      return;
    }

    const gasto_fecha = new Date(this.gasto_fecha);
    const sueldoFijo = this.listaSueldoFijos[0];

    const fecha_inicio = new Date(sueldoFijo.fecha_inicio);
    const fecha_final = new Date(sueldoFijo.fecha_final);

    if (gasto_fecha < fecha_inicio || gasto_fecha > fecha_final) {
      this.srvGeneral.fun_Mensaje(
        'La fecha del gasto debe estar dentro del rango del sueldo fijo.',
        'danger'
      );
      return;
    }

    // Validar que el monto del gasto no sea mayor al saldo disponible
    const saldoDisponible = this.calcularSaldoDisponible();
    if (this.gasto_monto > saldoDisponible) {
      this.srvGeneral.fun_Mensaje(
        `El monto del gasto no puede ser mayor al saldo disponible de ${saldoDisponible.toFixed(
          2
        )}.`,
        'danger'
      );
      return;
    }

    const gastoObj = {
      monto: this.gasto_monto,
      fecha: this.gasto_fecha,
      descripcion: this.gasto_descripcion,
      categoria_id: this.gasto_categoria_id,
      usuario_id: this.usuario_id, // Usar el ID de usuario correcto
      estado_pago: '0',
    };

    this.srvGastos.registrarGastoS(gastoObj).subscribe((res: any) => {
      if (res.retorno == 1) {
        this.verificarSueldoFijo();
        this.srvGeneral.fun_Mensaje(res.mensaje, 'success');
        this.limpiarCampos();
        this.cargarGastos(); // Recargar la lista de gastos después de registrar un nuevo gasto
      } else {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
      }
    });
  }
  cargarCategorias() {
    this.srvRegistro
      .verCategoriaPorId(this.usuario_id)
      .subscribe((res: any) => {
        this.Categorias = res.data;
      });
  }

  limpiarCampos() {
    this.gasto_monto = 0;
    this.gasto_fecha = '';
    this.gasto_descripcion = '';
    this.gasto_categoria_id = 0;
    this.gasto_estado_pago = 0;
  }

  cargarGastos() {
    console.log('usuario_id: ', this.usuario_id);

    this.srvGastos
      .verGastosPorUsuario(this.usuario_id)
      .subscribe((res: any) => {
        this.listaGastos = res.data;
        console.log('listaGastos: ', this.listaGastos);
      });
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'listar') {
      this.cargarGastos();
    }
  }

  actualizarSueldoFijo() {
    if (this.usuario_id && this.gasto_monto) {
      this.srvRegistro
        .actualizarSueldoFijo(this.usuario_id, this.gasto_monto)
        .subscribe(
          (res: any) => {
            if (res.retorno === 1) {
              // Actualización exitosa, puedes manejar alguna lógica aquí si es necesario
              console.log('Sueldo fijo actualizado correctamente');
            } else {
              // Manejo de errores si la actualización falla
              console.error('Error al actualizar sueldo fijo:', res.mensaje);
            }
          },
          (error) => {
            // Manejo de errores HTTP u otros errores de la solicitud
            console.error('Error en la solicitud:', error);
          }
        );
    } else {
      console.error('Usuario ID o nuevo monto no válidos');
    }
  }

  // Actualiza el estado de pago del gasto y recalcula el saldo disponible
  actualizarEstadoPago(gasto: any) {
    const objPagos = {
      id: gasto.id,
      estado_pago: 1,
    };
    console.log('Objeto a cambiar estado: ', objPagos);

    this.srvGastos.cambiarEstadoGasto(objPagos).subscribe(
      (res: any) => {
        if (res.retorno == 1) {
          this.srvGeneral.fun_Mensaje(res.mensaje, 'primary');
          // Recalcula el saldo disponible
          this.calcularSaldoDisponible();
        } else {
          this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
        }
      },
      (error) => {
        console.error('Error al actualizar el estado del pago: ', error);
        this.srvGeneral.fun_Mensaje(
          'Error al actualizar el estado del pago',
          'danger'
        );
      }
    );
  }

  // Suma de los gastos con estado_pago activo
  calcularGastosActivos(): number {
    return this.listaGastos
      .filter((gasto) => gasto.estado_pago)
      .reduce((sum, gasto) => sum + parseFloat(gasto.monto), 0);
  }

  // Resta del sueldo fijo y la suma de gastos activos
  calcularSaldoDisponible(): number {
    const sumaGastosActivos = this.calcularGastosActivos();
    return this.sueldoFijo - sumaGastosActivos;
  }
}
