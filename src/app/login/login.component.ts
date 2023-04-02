import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private http: HttpClient, 
    private formBuilder: FormBuilder,
    private router: Router
    ){}

  myForm: FormGroup
  valorMin = 8
  apiUrl = environment.api
  
  ngOnInit(): void {
    
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.valorMin)]],
    })
  }
  
  get myFormControll() {
    return this.myForm;
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('opa')
      this.http.post(`${this.apiUrl}/api/login`, this.myForm.value).subscribe(
        (dados) =>  { 
          if (dados) {
            this.router.navigate(['/products'])
          }
        },
      (erro) => { 
        console.error(erro.error.message) 
      }
      )
    }
  }
}
