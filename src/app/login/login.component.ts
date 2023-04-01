import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient, private formBuilder: FormBuilder){}

  myForm: FormGroup
  valorMin = 8
  
  ngOnInit(): void {
    
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.valorMin)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(this.valorMin)]],
    })

    console.log(this.myForm)
  }
  
  get myFormControll() {
    return this.myForm;
  }

  onSubmit() {
    console.log(this.myForm)
    console.log(this.myForm.get('password')?.errors === null)
    console.log(this.myForm.valid)
    if (this.myForm.valid) {

      this.http.post('http://localhost:80/api/create', this.myForm.value).subscribe(
        (dados) => console.log(dados)
      )
    }
  }
}
