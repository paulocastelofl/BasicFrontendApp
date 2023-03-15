import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      'X-AuthToken': "NGNmNWQyNDktN2Y0My00YTI1LWIyMDAtMTFkOTMyNjM3YTJiOjoxNjc5NTI4OTI4Nzkz"
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
}
