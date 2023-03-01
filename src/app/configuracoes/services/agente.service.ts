import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  constructor( private http: HttpClient) { }

  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/Agente`,
      parms
    )
  }

  public update(parms: {}): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/Agente`,
      parms
    )
  }


  getAll(idEmpresa: number): Observable<IAgente[]>{
    return this.http.get<IAgente[]>(`${environment.baseUrlBackend}/api/Agente/GetByEmpresa/${idEmpresa}`)
  }

  public delete(id): Observable<any> {
    return this.http.delete(`${environment.baseUrlBackend}/api/Agente/${id}`,)
  }

}
