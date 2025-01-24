import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';   
import { CrearAvisoComponent } from './crear-aviso/crear-aviso.component';
import { AvisosComponent } from './avisos/avisos.component';

export const routes: Routes = [
  { path: 'home', component: HomePage }, 
  { path: 'avisos', component: AvisosComponent }, 
  { path: 'crear', component: CrearAvisoComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}