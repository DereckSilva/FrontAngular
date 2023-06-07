import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { ChatComponent } from './chat/chat.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'esqueceuSenha', component: ForgetPasswordComponent},
  {path: 'chat', component: ChatComponent, canActivate: [ AuthGuardGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
