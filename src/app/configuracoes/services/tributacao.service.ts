import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TributacaoService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ITributacao[]>{
    return this.http.get<ITributacao[]>(`${environment.baseUrlBackend}/api/Tributacao`)
  }
}
