import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient, private srvG: GeneralService
  ) { }


  obtenerMenusPorTipoUsuario(tipoUsuario: number) {
    let url = 'obtenerMenusPorTipoUsuario';
    return this.http.post(this.srvG.URLAPI + url,
      this.srvG.objectToFormData({ tipo_usuario_id: tipoUsuario })
    );
  }
}
