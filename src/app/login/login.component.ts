import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.valorMin)]],
    })

  }
  
  get myFormControll() {
    return this.myForm;
  }

  navigate(data:string) {
    const expires = new Date().getTime() + parseInt(environment.expiresToken) 
    localStorage.setItem('token', JSON.stringify({valor: data, expiresAt: expires}))
    this.router.navigate(['/produtos'])
  }

  onSubmit() {
    if (this.myForm.valid) {

      this.serviceHttp.loginUser(this.myForm.value).subscribe(
        {
          next: (data:any) => {
            this.navigate(data.data.token.split('|')[1])
          } ,
          error: (error) =>  console.error(error.error.message)  
        }
      )
    }
  }

  navigateCad() {
    this.router.navigate(['/cadastro'])
  }
  navigateForget() {
    this.router.navigate(['/esqueceuSenha'])
  }
}
