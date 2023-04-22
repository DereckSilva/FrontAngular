import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { io } from 'socket.io-client';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private socket = io('http://localhost:3000/teste')

  myForm: FormGroup
  client: string[] = []
  message: string
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ){
  }

  ngOnInit(){

    this.myForm = this.formBuilder.group({
      comment: ['']
    })

    this.socket.on('client', (message) => {
      this.client.push(message.data.user.id)
    })
  }

  @HostListener('document:keypress', ['$event'])
  ngOnSubmit(event: KeyboardEvent) {
    if (this.myForm.value.comment !== '' && event.key === 'Enter') {
      this.auth.comment(this.myForm.value).subscribe({
        next: (data: any) =>  console.log(data),
        error: (error: any) => console.log(error)
      })
    }
  }
}
