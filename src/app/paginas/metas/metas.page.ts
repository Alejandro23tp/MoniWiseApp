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

  frecuencia_id: number = 0;

  nombre: string = '';
  monto_objetivo: number = 0;
  

  fecha_creacion: string = '';
  fecha_inicio: string = '';
  fecha_final: string = '';

 

  estado: number = 1;

  sueldoFijo_fecha_inicio: string = '';
  sueldoFijo_fecha_final: string = '';

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

  actualizarFechaFinal() {
    if (this.sueldoFijo_fecha_inicio && this.frecuencia_id) {
      const fechaInicio = new Date(this.sueldoFijo_fecha_inicio);
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

      this.sueldoFijo_fecha_final = fechaFinal.toISOString().split('T')[0];
    }
  }

  registrarMetasAhorro() {
    const objMetas: any = {
      nombre: this.nombre,
      monto_objetivo: this.monto_objetivo,
      frecuencia_id: this.frecuencia_id,
      fecha_creacion: this.fecha_creacion,
      fecha_inicio: this.fecha_inicio,
      fecha_final: this.fecha_final,
      usuario_id: this.usuario_id,
      estado: this.estado,
    };

    this.srvMetas.registrarMetasAhorro(objMetas).subscribe((res: any) => {
      if (res.retorno == 1){
        this.srvGeneral.fun_Mensaje(res.mensaje, 'primary');
      }else{
        this.srvGeneral.fun_Mensaje(res.mensaje, 'danger');
      }

    });
  }
}
