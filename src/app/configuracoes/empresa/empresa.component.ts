import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  public isTabSelect: string = "Basico";

  public listTabs = [
    "Basico",
    "Usuários",
    "Importação",
    "Agenciamento de Carga",
    "Documentos",
    "Credenciais",
    "Financeiro",
    "Relatórios"
  ]

  constructor() { }

  ngOnInit(): void {
  }

  isSelectTab(tab){
    this.isTabSelect = tab;
  }

}
