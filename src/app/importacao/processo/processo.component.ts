import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.css']
})
export class ProcessoComponent implements OnInit {

  public isTabSelect: string;

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

  constructor() { }

  ngOnInit(): void {
  }

  reciverIsSelectTab(evt) {
    this.isTabSelect = evt;
  }


}
