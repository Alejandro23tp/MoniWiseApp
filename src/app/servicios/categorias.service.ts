import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(
    private http: HttpClient,
    private srvG : GeneralService
  ) { }


  verTodasCategoriasConNombreUsuario(){
    let url = 'verTodasCategoriasConNombreUsuario';
    return this.http.get<any>(this.srvG.URLAPI + url);

  }
 
  crearCategoriaPredefinida(nombre : string){
    let url = 'crearCategoriaPredefinida';
    return this.http.post<any>(this.srvG.URLAPI + url, this.srvG.objectToFormData({
      nombre : nombre
    }));
  }


}

