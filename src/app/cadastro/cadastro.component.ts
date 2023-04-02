import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  )
  {}

  

  myForm: FormGroup;
  succes: any
  error: any
  apiUrl = environment.api;

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: [],
      email: [],
      password: [],
      confirmPassword: []
    })
  }

  onSubmit(){
    if (this.myForm.valid) {
      this.http.post(`${this.apiUrl}/cadUser`, this.myForm.value).subscribe(
        (dados) => {
          this.error = null
          this.succes = dados
        },
        (error) => {
          this.succes = null
          this.error = error.error
        }
      )
    }
  }

}
