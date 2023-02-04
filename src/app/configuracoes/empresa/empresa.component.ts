import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  public isTabSelect: string;


  public listTabs = [
    "Básico",
    "Usuários",
    "Importação",
    "Exportação",
    "Agenciamento de Carga",
    "Documentos",
    "Credenciais",
    "Financeiro",
    "Relatórios"
  ]

  constructor() { }

  ngOnInit(): void {
    this.isTabSelect = this.listTabs[0]
  }


  reciverIsSelectTab(evt){
    this.isTabSelect = evt;
  }

}
