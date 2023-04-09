import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private http: HttpClient
  ) { }

  channelEnv = environment.channel
  messages: any;

  channel(url: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // adicione o cabeçalho CORS
      }),
    };
    return this.http.get(`${this.channelEnv}/${url}`, httpOptions);
  }
  
}
