import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(
    private http: HttpClient
  ) {

  }

 
  getFornecedorByQ(term: string = null) {

    if (term) {
      return this.http.get<any>(`${environment.baseUrlBackend}/api/Fornecedor/GetByQ?q=${term}`)
        .pipe(
          map(rsp => {
            if (rsp.Error) {
              throwError(rsp.Error);
            } else {
              return rsp
            }
          })
        );
    } else {
      return of([]);
    }
  }

}
