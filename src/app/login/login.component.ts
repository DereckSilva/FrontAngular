import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register.component.css', './login.component.css']
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private serviceHttp: AuthService,
    ){}

  myForm: FormGroup
  valorMin = 8
  
  ngOnInit(): void {
    
    this.serviceHttp.rememberMe((localStorage.getItem('rememberMe')) ? { remember: localStorage.getItem('rememberMe') } : { remember: null } ).subscribe({
      next: (data: any) => {
        if  (data.data.length !== 0 && data.status === 200) {
          console.log('salveeeeeeee')
          return alert('logado')
        } else if (data.data.length === 0 && data.status === 400) {
          return this.router.navigate([''])
        }
      },
      error: (error) => {} 
    })

    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.valorMin)]],
      rememberToken: [ false ]
    })

  }
  
  get myFormControll() {
    return this.myForm;
  }

  navigate(data:string, remember: string) {
    const expires = new Date().getTime() + parseInt(environment.expiresToken) 
    localStorage.setItem('token', JSON.stringify({valor: data, expiresAt: expires}))
    localStorage.setItem('rememberMe', JSON.stringify({valor: remember}))
    this.router.navigate(['/produtos'])
  }

  onSubmit() {
    //if (this.myForm.valid) {

      this.serviceHttp.loginUser(this.myForm.value).subscribe(
        {
          next: (data:any) => {
            this.navigate(data.data.token.split('|')[1], data.data.remember)
          } ,
          error: (error) =>  console.error(error.error.message)  
        }
      )
    //}
  }

  navigateCad() {
    this.router.navigate(['/cadastro'])
  }
  navigateForget() {
    this.router.navigate(['/esqueceuSenha'])
  }
}
