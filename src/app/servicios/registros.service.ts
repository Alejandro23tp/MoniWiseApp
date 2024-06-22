import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(private http: HttpClient, private srvG: GeneralService) {}

  verFrecuencias() {
    let url = 'verFrecuencias';
    return this.http.get<any>(this.srvG.URLAPI + url);
  }

  verSueldoFijoPorUsuario(usuario_id: number) {
    let url = 'verSueldoFijoPorUsuario';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        usuario_id: usuario_id,
      })
    );
  }

  verIngresosUsuario(usuario_id: number) {
    let url = 'verIngresosUsuario';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        usuario_id: usuario_id,
      })
    );
  }

  registrarSueldoFijo(ObjetoSueldoFijo: any) {
    let url = 'registrarSueldoFijo';
    return this.http.post<any>(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        monto: ObjetoSueldoFijo.monto,
        frecuencia_id: ObjetoSueldoFijo.frecuencia_id,
        fecha_inicio: ObjetoSueldoFijo.fecha_inicio,
        fecha_final: ObjetoSueldoFijo.fecha_final,
        usuario_id: ObjetoSueldoFijo.usuario_id,
        estado: ObjetoSueldoFijo.estado,
      })
    );
  }


  verCategoriasPredefinidas() {
    let url = 'verCategoriasPredefinidas';
    return this.http.get<any>(this.srvG.URLAPI + url);
  }

  verCategoriaPorId(id: number) {
    let url = 'verCategoriaPorId';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        usuario_id: id,
      })
    );
  }

  registrarCategoria(ObjetoCategoria: any) {
   
    let url = 'registrarCategoria';
    return this.http.post<any>(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        nombre: ObjetoCategoria.nombre,
        descripcion: ObjetoCategoria.descripcion,
        usuario_id: ObjetoCategoria.usuario_id,
        estado: ObjetoCategoria.estado,
      })
    );
  }

  registrarIngresos(ObjetoIngreso: any) {
    let url = 'registrarIngresos';
    return this.http.post<any>(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        fecha: ObjetoIngreso.fecha,
        monto: ObjetoIngreso.monto,
        descripcion: ObjetoIngreso.descripcion,
        usuario_id: ObjetoIngreso.usuario_id,
        estado: ObjetoIngreso.estado,
      })
    );
  }


  cambiarMontoPorId(ObjetoPago: any) {
    let url = 'cambiarMontoPorId';
    return this.http.post<any>(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData(ObjetoPago)
    );
  }

}
