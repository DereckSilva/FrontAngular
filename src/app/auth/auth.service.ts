import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { message } from '../login/tipos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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
        'Content-type': 'application/json'
      })
    }

    return this.http.post(`${this.apiUrl}/comment`, body, httpHeaders)
  }

  userAuthenticate() {
    return this.userAuth
  }
}
