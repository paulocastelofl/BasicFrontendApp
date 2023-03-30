import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RelatoriosService } from '../services/relatorios.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  public isLoad = false;
  public processos = []

  constructor(
    private relatoriosService: RelatoriosService,
    private notifyService: NotifyService,
    private router:  Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRelatoriosProcessos();
  }

  getRelatoriosProcessos() {
    this.isLoad = true;

    this.relatoriosService.getRelatoriosProcessosBase(2).subscribe(
      {
        next: (v) => {
          // console.log(v)
          this.processos = v;

          console.log(v)

          // var obj = {
          //   'processos': this.processos
          // };

          // this.processos.forEach(function (value) {

          //   if (value['parceiro']['@ref']) {

          //     var newArray = obj.processos.filter(function (el) {
          //       return el.parceiro['@id'] == value['parceiro']['@ref']
          //     });

          //     value['parceiro'] = newArray[0].parceiro;

          //   }

          //   if (value['modal']) {
          //     if (value['modal']['@ref']) {

          //       var newArray = obj.processos.filter(function (el) {
          //         if(el.modal)  return el.modal['@id'] == value['modal']['@ref']
                  
          //       });

          //      if(newArray) value['modal'] = newArray[0].modal;

          //     }
          //   }

          // });

          this.isLoad = false;

        }, error: (e) => {
          this.isLoad = false;
          this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
        }
      }
    )
  }

  onNavigateProcesso(data){
    this.router.navigate(["importacao", data.id]);
  }

}
