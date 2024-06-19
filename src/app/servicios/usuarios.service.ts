import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
    private srvG : GeneralService

  ) { }


  verUsuarios(){
    let url = 'verUsuarios';
    return this.http.get<any>(this.srvG.URLAPI + url);
  }

  cambiarEstadoUsuario(data: any) {
    return this.http.post(this.srvG.URLAPI + 'cambiarEstadoUsuario', this.srvG.objectToFormData(data));
  }
}
