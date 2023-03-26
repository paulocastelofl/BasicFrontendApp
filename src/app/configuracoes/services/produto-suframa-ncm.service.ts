import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoSuframaNcmService {

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
                element.codigo_nome = element.produtoSuframa.codigo + " - " + element.produtoSuframa.nome
              });

              return rsp
            }
          })
        );
    } else {
      return of([]);
    }
  }

  getAll(): Observable<IProdutoSuframaNcm[]>{
    return this.http.get<IProdutoSuframaNcm[]>(`${environment.baseUrlBackend}/api/ProdutoSuframaNcm`)
  }
}
