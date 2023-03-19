import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(): Observable<IFornecedor[]>{
    return this.http.get<IFornecedor[]>(`${environment.baseUrlBackend}/api/Fornecedor`)
  }

  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/Fornecedor`,
      parms
    )
  }

  public update(parms: {}): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/Fornecedor`,
      parms
    )
  }

  public delete(id): Observable<any> {
    return this.http.delete(`${environment.baseUrlBackend}/api/Fornecedor/${id}`,)
  }
}
