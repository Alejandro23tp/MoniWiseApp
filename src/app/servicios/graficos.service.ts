import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {
  constructor(private srvG: GeneralService, private http: HttpClient) {}

  verPagosAhorroUsuarioDatos(usuario_id: number) {
    let url = 'verPagosAhorroUsuarioDatos';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        usuario_id: usuario_id,
      })
    );
  }

  verGastosPorCategoriaDatos(usuario_id: number) {
    let url = 'gastosPorCategoriaUsuario';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        usuario_id: usuario_id,
      })
    );
  }
}
