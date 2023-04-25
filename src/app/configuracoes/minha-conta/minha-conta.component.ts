import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})
export class MinhaContaComponent implements OnInit {

  public isTabSelect: string;
  public nome_fantasia: string = "";
  public id: number;
  public empresa: Empresa;

  public listTabs = [
    "Básico",
    "Credenciais"
  ]

  public listTabsAux = [];

  constructor(
    private service: EmpresaService,
    private route: ActivatedRoute,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.nome_fantasia = null
    this.listTabsAux = this.listTabs;
    this.isTabSelect = this.listTabsAux[0];
  }

  reciverIsSelectTab(evt) {
    this.isTabSelect = evt;
  }

  reciverIsCheckImportador(evt) {

   this.listTabsAux = this.listTabs

  }

}
