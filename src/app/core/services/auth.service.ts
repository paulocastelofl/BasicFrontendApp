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

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  get Token(): string {
    return this.tokenJwt;
  }

  public authenticUser(parms: {}): Observable<any> {

    return this.httpClient.post(`${environment.baseUrlBackend}/Auth/Login`,
      parms
    )
      .pipe(
        delay(2000),
        tap(r => {
          console.log(r)
          this.tokenJwt = r.token
          this.setLocalStorage(r);
        })
      );

  }

  setLocalStorage(parms) {
    const now = new Date();
    localStorage.setItem('credencials-ganedencomex', JSON.stringify({
      email: parms['email'],
      date: now,
      toke: parms['token']
    }));
  }

  logout() {
    localStorage.removeItem('credencials-ganedencomex');
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
      this.tokenJwt = credencials['token'];
      return true;
    }

  }
}
