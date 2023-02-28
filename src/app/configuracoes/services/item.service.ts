import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) {

  }

  public create(parms: {}): Observable<any> {
    return this.http.post(`${environment.baseUrlBackend}/api/Item`,
      parms
    )
  }

  public update(parms: {}): Observable<any> {
    return this.http.put(`${environment.baseUrlBackend}/api/Item`,
      parms
    )
  }

  public uploadFileItens(file) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      `${environment.baseUrlBackend}/api/Item/SaveExcelFileItens?IdEmpresa=1`,
      formData
    );
  }

  getAll(page: number = 1, take: number = 10, q: string = ""): Observable<Item[]>{

    if(q != "") return this.http.get<Item[]>(`${environment.baseUrlBackend}/api/Item?page=${page}&take=${take}&q=${q}`)

    return this.http.get<Item[]>(`${environment.baseUrlBackend}/api/Item?page=${page}&take=${take}`)
    
  }

  public delete(id): Observable<any> {
    return this.http.delete(`${environment.baseUrlBackend}/api/Item/${id}`,)
  }


  

}
