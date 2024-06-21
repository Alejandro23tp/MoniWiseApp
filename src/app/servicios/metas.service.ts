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
}
