import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinacaoService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IDestinacao[]>{
    return this.http.get<IDestinacao[]>(`${environment.baseUrlBackend}/api/Destinacao`)
  }
}
