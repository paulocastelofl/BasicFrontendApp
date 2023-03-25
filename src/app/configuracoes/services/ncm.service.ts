import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NcmService {

  constructor(
    private http: HttpClient
  ) { }

  getByQ(term: string = null, url) {

    if (term) {
      return this.http.get<any>(`${environment.baseUrlBackend}/api/BaseTablesAux/${url}?q=${term}`)
        .pipe(
          map(rsp => {
            if (rsp.Error) {
              throwError(rsp.Error);
            } else {

              rsp.forEach((element) => {
                element.codigo_nome = element.codigo + " - " + element.nome
              });

              return rsp
            }
          })
        );
    } else {
      return of([]);
    }
  }

  getAll(): Observable<INcm[]>{
    return this.http.get<INcm[]>(`${environment.baseUrlBackend}/api/Ncm`)
  }
}
