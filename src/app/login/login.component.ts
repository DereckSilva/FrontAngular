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
    
    let request = this.indexed.createStore('myDatabasess', 'login', 4, 'token', 'tokenIndex');

    // realiza o login caso o token remember esteja setado dentro da store
    this.serviceHttp.rememberMe((localStorage.getItem('rememberMe')) ? { remember: localStorage.getItem('rememberMe') } : { remember: null } ).subscribe({
      next: (data: any) => {
        let request = this.indexed.createStore('myDatabasess', 'login', 4, 'token', 'tokenIndex');
        return (data.success) ? this.indexed.findIndex('login', { token: data.data.user.remember_token }, request) : this.router.navigate(['']); 
      },
      error: (error: any) => {return console.log(error)} 
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
    let request = this.indexed.createStore('myDatabasess', 'user', 4, 'tokenUser', 'tokenUserIndex');
    this.indexed.createIndex('user', { tokenUser: data }, request) 

    request = this.indexed.createStore('myDatabasess', 'login', 4, 'token', 'tokenIndex');
    // cria a store para armazenar o token do usuário
    this.indexed.createIndex('login', { token: remember }, request) 

    // cria a store para armazenar o token para lembrar do usuário
    this.router.navigate(['/produtos'])
  }

  onSubmit() {
    if (this.myForm.valid) {

      this.serviceHttp.loginUser(this.myForm.value).subscribe({
        next: (data:any) => {
          this.navigate(data.data.token.split('|')[1], data.data.remember)
        },
        error: (error) =>  console.error(error.error.message)  
      })
    }
  }

  navigateCad() {
    this.router.navigate(['/cadastro'])
  }
  navigateForget() {
    this.router.navigate(['/esqueceuSenha'])
  }

  createStoreToken (token: string) {
    let request = this.indexed.createStore('myDatabasesss', 'user', 1, 'token', 'tokenIndex')
    this.indexed.createIndex('myDatabasesss', { token: token }, request)
  }

  createStoreRememeberMe() {

  }
}
