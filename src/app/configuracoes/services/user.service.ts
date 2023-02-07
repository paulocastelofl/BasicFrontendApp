import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(): Observable<IUser[]>{
    return this.http.get<IUser[]>(`${environment.baseUrlBackend}/api/User`).pipe(
      // delay(2000)
    );
  }


}
