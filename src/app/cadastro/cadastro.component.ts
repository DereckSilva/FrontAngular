import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { message } from '../login/tipos';
import { ChannelService } from '../channel/channel.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private channel: ChannelService,
    private http: HttpClient
  ){}

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
    this.channel.channel('teste').subscribe(
      (data) => console.log(data)
    )
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
