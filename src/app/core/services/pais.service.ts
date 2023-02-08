import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(): Observable<IPais[]>{
    return this.http.get<IPais[]>(`${environment.baseUrlBackend}/api/Pais`).pipe(
    );
  }

}
