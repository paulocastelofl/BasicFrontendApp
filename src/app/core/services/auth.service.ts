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
    ).pipe(
        tap(r => {
          this.tokenJwt = r.token
          this.setLocalStorage(r);
          this.setUserCurrent(r);
          console.log(r)
        })
      );

  }

  setUserCurrent(parms){

    let empresa: Empresa = parms['empresa']

    this.currentUser = {
      id: parms['id'],
      name: parms['name'],
      email: parms['email'],
      idEmpresa: parms['idEmpresa'],
      empresa: empresa
    }

  }

  setLocalStorage(parms) {
    const now = new Date();
    localStorage.setItem('credencials-ganedencomex', JSON.stringify({
      id: parms['id'],
      name: parms['name'],
      email: parms['email'],
      idEmpresa: parms['idEmpresa'],
      telefone: parms['telefone'],
      cpf: parms['cpf'],
      date: now,
      token: parms['token'],
      empresa: parms['empresa']
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
