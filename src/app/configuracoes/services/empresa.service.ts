import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/Empresa`,
      parms
    )
  }

  update(parms: {}): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/Empresa`,
      parms
    )
  }

  updateStatus(id, status): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/Empresa/UpdateStatus/${id}/${status}`, {})
  }

  getAll(): Observable<any>{
    return this.http.get(`${environment.baseUrlBackend}/api/Empresa`);
  }

  getById(id): Observable<any>{
    return this.http.get(`${environment.baseUrlBackend}/api/Empresa/${id}`);
  }

  getAllByEmpresa(id): Observable<any>{
    return this.http.get(`${environment.baseUrlBackend}/api/Empresa/GetByEmpresa/${id}`);
  }

}
