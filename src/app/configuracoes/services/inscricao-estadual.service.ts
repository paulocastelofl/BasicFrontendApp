import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscricaoEstadualService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<InscricaoEstadual[]>{
    return this.http.get<InscricaoEstadual[]>(`${environment.baseUrlBackend}/api/InscricaoEstadual`)
  }
}
