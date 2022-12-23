import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
// import {map} from 'rxjs/operators';
// import { user } from '@angular/fire/auth';
// import { isAdmin } from '@firebase/util';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectUnauthorizedToHome = () => redirectLoggedInTo(['inicio']);

//guardian de rutas
//const isAdmin = (next:any) => map( (user: any)=> !!user && ' ===' user.uid)


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectUnauthorizedToHome)
    },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'complejos',
    loadChildren: () => import('./pages/complejos/complejos.module').then( m => m.ComplejosPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'seguro',
    loadChildren: () => import('./pages/seguro/seguro.module').then( m => m.SeguroPageModule)
  },
  // {
  //   path: 'mensajes',
  //   loadChildren: () => import('./pages/mensajes/mensajes.module').then( m => m.MensajesPageModule)
  // },

  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'micomplejo',
    loadChildren: () => import('./pages/micomplejo/micomplejo.module').then( m => m.MicomplejoPageModule, )
    //loadChildren: () => import('./pages/micomplejo/micomplejo.module'), ...canActivate(isAdmin)

  },
  {
    path: 'gestion',
    loadChildren: () => import('./pages/gestion/gestion.module').then( m => m.GestionPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
