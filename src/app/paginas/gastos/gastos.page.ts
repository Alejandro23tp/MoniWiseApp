import { Component, OnInit } from '@angular/core';
import { GastosService } from 'src/app/servicios/gastos.service';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
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

  mostrarFormulario: boolean = false; // Nueva propiedad

  constructor(
    private srvGastos: GastosService,
    private srvGeneral: GeneralService
  ) {}

  ngOnInit() {
    this.cargarUsuario();
    this.cargarFrecuencias();
    this.verificarSueldoFijo();
  }

  ionViewWillEnter() {
    this.cargarUsuario();
    this.cargarFrecuencias();
    this.verificarSueldoFijo();
  }

  cargarUsuario() {
    //Obtener el id deño usuario logueado en localStorage
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;

      this.sueldoFijo_usuario_id = usuarioLogueadoObj;
      console.log('usuario_id: ' + this.sueldoFijo_usuario_id);
    }
  }

  cargarFrecuencias() {
    this.srvGastos.verFrecuencias().subscribe((res: any) => {
      this.listaFrecuencias = res.data;
    });
  }

  verificarSueldoFijo() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      this.sueldoFijo_usuario_id = usuarioLogueadoObj;
      this.srvGastos.verSueldoFijoPorUsuario(this.sueldoFijo_usuario_id).subscribe((res: any) => {
        if (res.data.length > 0) {
          this.sueldoFijo = res.data[0].monto;
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
    this.srvGastos.registrarSueldoFijo(ObjetoSueldoFijo).subscribe((res: any) => {
      if (res.retorno == 1) {
        this.srvGeneral.fun_Mensaje(res.mensaje, 'success');
        this.verificarSueldoFijo();  // Verificar de nuevo si el sueldo fijo ya está registrado
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
}
