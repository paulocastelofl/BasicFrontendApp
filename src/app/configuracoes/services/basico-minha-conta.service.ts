import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BasicoMinhaContaService {

  constructor(
    private http: HttpClient
  ) { }

  public update(parms: {}): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/User`,
      parms
    )
  }
}
