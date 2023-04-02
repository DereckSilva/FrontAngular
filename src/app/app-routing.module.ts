import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'produtos', component: ProductsComponent, canActivate: [AuthGuardGuard]},
  {path: 'cadastro', component: CadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
