import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { RelatoriosService } from '../services/relatorios.service';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.css']
})
export class ProcessoComponent implements OnInit {

  public isTabSelect: string;
  public processo;

  public listTabs = [
    "Feed",
    "Básico",
    "POs",
    "Faturas",
    "Adições",
    "Carga",
    "Transporte",
    "Docs Instrução",
    "Valores",
    "Complementares",
    "Registro",
    "Follow-up",
    "Dossiês",
    "Financeiro",
    "Auditoria",
  ]

  constructor(
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private relatoriosService: RelatoriosService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      {
        next: (params) => {
          this.getProcesso(params['id']);
        }
      }
    );

  }

  reciverIsSelectTab(evt) {
    this.isTabSelect = evt;
  }

  getProcesso(codigo){
    this.relatoriosService.getProcesso(codigo).subscribe({
      next: (obj) => {
        this.processo = obj;
      }
    })
  }


}
