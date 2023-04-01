import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  products = [
    {name: 'Celular', description: 'descrição top do celular'},
    {name: 'Iphone', description: 'descrição top do iphone'},
    {name: 'Acer', description: 'descrição top do acer'}
  ]
  
}
