import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CelulasService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlBackend}/api/Celula`)
  }

  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/Celula`,
      parms
    )
  }

  update(parms: {}): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/Celula`,
      parms
    )
  }

  getById(id): Observable<any> {
    return this.http.get(`${environment.baseUrlBackend}/api/Celula/${id}`);
  }


}
