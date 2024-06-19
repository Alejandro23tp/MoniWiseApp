import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./paginas/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./paginas/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./paginas/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./paginas/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./paginas/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./paginas/gastos/gastos.module').then( m => m.GastosPageModule)
  },
  {
    path: 'registros',
    loadChildren: () => import('./paginas/registros/registros.module').then( m => m.RegistrosPageModule)
  },
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
