import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { message } from '../login/tipos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  apiUrl = environment.api
  userAuth: boolean = false
  
  loginUser(body: message): Observable<message[]> {
    
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }

    let result = this.http.post<message[]>(`${this.apiUrl}/login`, body, httpHeaders)

    if (result !== null) {

      this.userAuth = true
      return result

    } else {
      return throwError(new Error('Nenhum usuário encontrado'))
    }
  }

  cadUser(body: message): Observable<message> {
    
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }

    return this.http.post<message>(`${this.apiUrl}/cadUser`, body, httpHeaders)
  }

  comment(body: string): Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Autorization': 'Bearer ' + this.userAuthenticate(),
        'Content-type': 'application/json'
      })
    }

    return this.http.post(`${this.apiUrl}/comment`, body, httpHeaders)
  }

  userAuthenticate() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
    const expiresAt = token != null ? JSON.parse(token).expiresAt : null
    if (new Date().getTime() > expiresAt) {
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    } 

    const valueToken = token != null ? JSON.parse(token).valor : null

    return valueToken
  }
}
