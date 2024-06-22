import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class MetasService {
  constructor(private http: HttpClient, private srvG: GeneralService) {}

  verMetasAhorro() {
    let url = 'verMetasAhorro';
    return this.http.get<any>(this.srvG.URLAPI + url);
  }

  registrarMetasAhorro(objMetas: any) {
    let url = 'registrarMetasAhorro';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        nombre: objMetas.nombre,
        monto_objetivo: objMetas.monto_objetivo,
        frecuencia_id: objMetas.frecuencia_id,
        fecha_creacion: objMetas.fecha_creacion,
        fecha_inicio: objMetas.fecha_inicio,
        fecha_final: objMetas.fecha_final,
        usuario_id: objMetas.usuario_id,
        estado: objMetas.estado,
      })
    );
  }

  verPagosAhorro() {
    let url = 'verPagosAhorro';
    return this.http.get<any>(this.srvG.URLAPI + url);
  }

  registrarPagosAhorro(objPagos: any) {
    let url = 'registrarPagosAhorro';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        monto: objPagos.monto,
        fecha: objPagos.fecha,
        meta_id: objPagos.meta_id,
        usuario_id: objPagos.usuario_id,
        estado_pago: objPagos.estado_pago,
      })
    );
  }

  verPagosAhorroUsuario(usuario_id: number) {
    let url = 'verPagosAhorroUsuario';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        usuario_id: usuario_id,
      })
    );
  }

  cambiarEstadoPagosAhorro(objPagos: any) {
    let url = 'cambiarEstadoPagosAhorro';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData(objPagos)
    );
  }
}
