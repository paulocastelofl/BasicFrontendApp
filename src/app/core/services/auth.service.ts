import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenJwt: string = "";
  private currentUser?: IUser;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  get Token(): string {
    return this.tokenJwt;
  }

  get CurrentUser(): IUser {
    return this.currentUser;
  }

  public authenticUser(parms: {}): Observable<any> {

    return this.httpClient.post(`${environment.baseUrlBackend}/Auth/Login`,
      parms
    )
      .pipe(
        tap(r => {

          console.log(r)

          this.tokenJwt = r.token
          this.setLocalStorage(r);
          this.setUserCurrent(r);
        })
      );

  }

  setUserCurrent(parms){
    this.currentUser = {
      id: parms['id'],
      name: parms['name'],
      email: parms['email'],
      idEmpresa: parms['idEmpresa']
    }
  }

  setLocalStorage(parms) {
    const now = new Date();
    localStorage.setItem('credencials-ganedencomex', JSON.stringify({
      id: parms['id'],
      name: parms['name'],
      email: parms['email'],
      idEmpresa: parms['idEmpresa'],
      date: now,
      toke: parms['token']
    }));
  }

  logout() {
    localStorage.removeItem('credencials-ganedencomex');
    this.currentUser = {};
    this.router.navigate(['pages/login']);
  }

  getIsAuthentic(): boolean {
    let credencials = JSON.parse(localStorage.getItem('credencials-ganedencomex'));

    if (credencials == undefined) return false;

    var now = new Date();
    const dateUser = new Date(credencials['date']);
    dateUser.setHours(dateUser.getHours() + 1);

    if (now > dateUser) {
      this.logout();
      return false;
    } else {
      this.setUserCurrent(credencials);
      this.tokenJwt = credencials['token'];
      return true;
    }

  }
}
