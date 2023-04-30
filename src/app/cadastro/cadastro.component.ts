import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { message } from '../login/tipos';
import { io } from 'socket.io-client'


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ){}

  myForm: FormGroup;
  succes: message
  error: message
  apiUrl = environment.api;
  message: string[] = []

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z]{0,5}[0-9]{0,5}') ]],
      confirmPassword: ['', [Validators.required, Validators.pattern('[a-zA-Z]{0,5}[0-9]{0,5}')]]
    })  
    //const socket = io('http://localhost:3000')

    /*socket.on('client', (message) => {
      console.log(message)
      this.message.push(message.data.user.id)
    })*/
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
