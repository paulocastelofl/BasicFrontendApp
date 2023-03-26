import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoTributacaoService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ITipoDocumentoTributacao[]>{
    return this.http.get<ITipoDocumentoTributacao[]>(`${environment.baseUrlBackend}/api/TipoDocumentoTributacao`)
  }
}
