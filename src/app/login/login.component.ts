import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.development';
import { IndexedDBService } from '../indexedDB/indexed-db.service';


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
    private indexed: IndexedDBService
    ){}

  myForm: FormGroup
  valorMin = 8
  
  ngOnInit(): void {
    
    this.serviceHttp.rememberMe((localStorage.getItem('rememberMe')) ? { remember: localStorage.getItem('rememberMe') } : { remember: null } ).subscribe({
      next: (data: any) => {
          return  (data.success) ?  
            this.indexed.deleteIndex('aMV6GKr9DoqskytcIwPaCJPyJ4gul1p7X439t5HAm6EmidGQly2ZtZ5GZkT5') : this.router.navigate([''])
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
    this.indexed.deleteIndex(remember)
    this.indexed.findIndex('login', {token: remember})
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
