import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportadorService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(): Observable<ITransportador[]>{
    return this.http.get<ITransportador[]>(`${environment.baseUrlBackend}/api/Transportador`)
  }

  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/Transportador`,
      parms
    )
  }

  public update(parms: {}): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/Transportador`,
      parms
    )
  }

  public delete(id): Observable<any> {
    return this.http.delete(`${environment.baseUrlBackend}/api/Transportador/${id}`,)
  }
}
