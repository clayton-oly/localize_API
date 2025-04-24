import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CadastroEmpresaComponent } from './empresa/cadastro-empresa/cadastro-empresa.component';
import { ListaEmpresasComponent } from './empresa/lista-empresas/lista-empresas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'empresas', component: ListaEmpresasComponent },
  { path: 'empresas/nova', component: CadastroEmpresaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
