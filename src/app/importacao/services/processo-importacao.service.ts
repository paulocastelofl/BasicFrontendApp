import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessoImportacaoService {

  constructor(private http: HttpClient) { }

  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/ProcessoImportacao`,
      parms
    )
  }

  public update(parms: {}): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/ProcessoImportacao`,
      parms
    )
  }

  public createdoc(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/ProcessoImportacao/CreateDoc`,
      parms
    )
  }

  public getDocProcesso(codigo): Observable<any> {
  
    return this.http.get(`${environment.baseUrlBackend}/api/ProcessoImportacao/GetDocByProcessoImportacao/${codigo}`)
  }

  public createFatura(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/Fatura`,
      parms
    )
  }

  
  public deleteDoc(id): Observable<any> {
    return this.http.delete(`${environment.baseUrlBackend}/api/ProcessoImportacao/DeleteDoc/${id}`,)
  }



}
