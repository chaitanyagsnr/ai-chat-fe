import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlamaApiService {

  private apiUrl: String = "http://localhost:8080/chat";

  constructor(private http: HttpClient) { }

  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}`, data, {headers});
  }
}
