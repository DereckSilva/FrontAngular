import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { message } from '../login/tipos';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService
  )
  {}

  
  myForm: FormGroup;
  succes: message
  error: message
  apiUrl = environment.api;

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    })
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.authService.cadUser(this.myForm.value).subscribe({
        next: (dados) => this.succes = dados,
        error: (error) => this.error = error
    })
    }
  }

}
