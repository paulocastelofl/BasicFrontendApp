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

  public delete(id): Observable<any> {
    return this.http.delete(`${environment.baseUrlBackend}/api/Fornecedor/${id}`,)
  }
}
