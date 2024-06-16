import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient, private srvG: GeneralService) {}

  obtenerMenusPorTipoUsuario(tipoUsuario: number) {
    let url = 'obtenerMenusPorTipoUsuario';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({ tipo_usuario_id: tipoUsuario })
    );
  }

  listarUsuarioPorId(id: number) {
    let url = 'listarUsuarioPorId';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({ usuario_id: id })
    );
  }

  editarUsuarioPorId(id: number, ObjetoUsuario: any) {
    let url = 'editarUsuarioPorId';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        usuario_id: id,
        usuario_nombre: ObjetoUsuario.nombre,
        usuario_cedula: ObjetoUsuario.cedula,
        usuario_telefono: ObjetoUsuario.telefono,
        usuario_correo: ObjetoUsuario.correo,
        usuario_usuario: ObjetoUsuario.usuario,
        usuario_clave: ObjetoUsuario.contraseña,
      
      })
    );
  }
}
