import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembrosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlBackend}/api/Membro`)
  }

  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/Membro`,
      parms
    )
  }

  update(parms: {}): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/Membro`,
      parms
    )
  }

  
  delete(ids): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: ids
    };

    return this.http.delete(`${environment.baseUrlBackend}/api/membro`,
    httpOptions
    )
  }

  getById(id): Observable<any> {
    return this.http.get(`${environment.baseUrlBackend}/api/Membro/${id}`);
  }

  GetByFilters(
    q: string
  ) {

    if (q) {
      return this.http.get<any>(`${environment.baseUrlBackend}/api/Membro/GetByFilters?q=${q}`)
        .pipe(
          map(rsp => {
            if (rsp.Error) {
              throwError(rsp.Error);
            } else {
              console.log(rsp)
              return rsp
            }
          })
        );
    } else {
      return of([]);
    }

  }
}
