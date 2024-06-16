import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngresoService {
  constructor(private http: HttpClient, private srvG: GeneralService) {}

  registrarUsuario(ObjetoUsuario: any) {
    let url = 'registrarUsuario';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        usuario_nombre: ObjetoUsuario.nombtre,
        usuario_cedula: ObjetoUsuario.cedula,
        usuario_telefono: ObjetoUsuario.telefono,
        usuario_correo: ObjetoUsuario.correo,
        usuario_usuario: ObjetoUsuario.usuario,
        usuario_clave: ObjetoUsuario.contraseña,
        tipo_usuario_id: ObjetoUsuario.tipo_usuario_id,
        usuario_estado: ObjetoUsuario.estado,
        //fecha_creacion: ObjetoUsuario.fecha_creacion,
      })
    );
  }

  verTiposUsuario() {
    let url = 'verTiposUsuario';
    return this.http.get<any>(this.srvG.URLAPI + url);
  }

  login(objsUsuario: any) {
    let url = 'login';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({
        usuario_usuario: objsUsuario.usuario,
        usuario_clave: objsUsuario.contraseña,
      })
    );
  }

  recuperarClave(usuario: string, nuevaContrasena: string) {
    let url = 'recuperarClave';
    return this.http.post(
      this.srvG.URLAPI + url,
      this.srvG.objectToFormData({ usuario_usuario: usuario, nueva_contrasena: nuevaContrasena })
    );
  }
}
