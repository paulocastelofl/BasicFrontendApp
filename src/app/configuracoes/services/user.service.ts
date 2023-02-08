import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(): Observable<IUser[]>{
    return this.http.get<IUser[]>(`${environment.baseUrlBackend}/api/User`)
  }

  getAllByEmpresa(id): Observable<IUser[]>{
    return this.http.get<IUser[]>(`${environment.baseUrlBackend}/api/User/GetByEmpresa/${id}`)
  }

  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/User`,
      parms
    )
  }

  public delete(id): Observable<any> {
    return this.http.delete(`${environment.baseUrlBackend}/api/User/${id}`,)
  }

}
