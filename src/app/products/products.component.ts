import { Component } from '@angular/core';
import { Product } from './interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {

  constructor (private http: HttpClient) {}

  products: Product = [
    {name: 'Celular', description: 'descrição top do celular', value: 550},
    {name: 'Iphone', description: 'descrição top do iphone', value: 750},
    {name: 'Acer', description: 'descrição top do acer', value: 600}
  ]
  
  share() {
    alert('ola')  
  }

  onNotify() {
    alert('salvessss')
  }

  get() {
    const headers = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
    this.http.get('http://localhost:80/api/users', headers).subscribe(
      (dados) => console.log(dados)
      )
  }
}
