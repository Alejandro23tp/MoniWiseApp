import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  constructor(private http: HttpClient, private srvG: GeneralService) {}


  verGastos(){
    let url = 'verGastos'
    return this.http.get<any>(this.srvG.URLAPI + url);
  }


  registrarGastoS(ObjetoGasto: any){
    let url = 'registrarGastos'
    return this.http.post(this.srvG.URLAPI + url, this.srvG.objectToFormData({
      monto : ObjetoGasto.monto,
      fecha : ObjetoGasto.fecha,
      descripcion : ObjetoGasto.descripcion,
      categoria_id : ObjetoGasto.categoria_id,
      usuario_id : ObjetoGasto.usuario_id,
      estado_pago : ObjetoGasto.estado_pago,
    }));
  }

  cambiarEstadoGasto(ObjetoGasto: any){
    let url = 'cambiarEstadoGasto'
    return this.http.post(this.srvG.URLAPI + url, this.srvG.objectToFormData({
      id : ObjetoGasto.id,
      estado_pago : ObjetoGasto.estado_pago,
    }));
  }
}
