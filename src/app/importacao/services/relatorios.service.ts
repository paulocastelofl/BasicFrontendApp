import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(
    private http: HttpClient
  ) { }

  public getRelatoriosProcessos(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-AuthToken': "MzAxOThiMTgtZWI1Mi00ODMzLWFkMzItZTY1ZTk5OGZmYzgxOjoxNjgwNDY5MTkyMDA4"
    });
    let options = { headers: headers };

    return this.http.post(`https://lb-api.brazilsouth.cloudapp.azure.com/empresa/102007/importacao/relatorios/preview`,
      [
        {
          "campo": "dtCriacao",
          "operacao": "ordem",
          "valores": [
            "decrescente"
          ]
        },
        {
          "campo": "",
          "operacao": "",
          "valores": [
            "IROS"
          ]
        }
      ],
      options
    )
  }

  public getProcesso(codigo): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-AuthToken': "MzAxOThiMTgtZWI1Mi00ODMzLWFkMzItZTY1ZTk5OGZmYzgxOjoxNjgwNDY5MTkyMDA4"
    });
    let options = { headers: headers };

    return this.http.get(`https://lb-api.brazilsouth.cloudapp.azure.com/empresa/102007/importacao/${codigo}`, options)
  }

  public getRelatoriosProcessosBase(codigo): Observable<any> {
  
    return this.http.get(`${environment.baseUrlBackend}/api/ProcessoImportacao/GetByEmpresa/${codigo}`)
  }

  public getProcessoBase(codigo): Observable<any> {
  
    return this.http.get(`${environment.baseUrlBackend}/api/ProcessoImportacao/${codigo}`)
  }
}
