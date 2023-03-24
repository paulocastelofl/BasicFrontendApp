import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatrizTributacaoService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IMatrizTributacao[]>{
    return this.http.get<IMatrizTributacao[]>(`${environment.baseUrlBackend}/api/MatrizTributacao`)
  }

  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/MatrizTributacao`,
      parms
    )
  }
}
