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



  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/MatrizTributacao`,
      parms
    )
  }
}
