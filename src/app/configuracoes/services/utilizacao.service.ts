import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilizacaoService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IUtilizacao[]>{
    return this.http.get<IUtilizacao[]>(`${environment.baseUrlBackend}/api/Utilizacao`)
  }
}
