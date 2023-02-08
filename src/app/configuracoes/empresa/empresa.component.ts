import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  public isTabSelect: string;
  public nome_fantasia: string = "";
  public id: number;
  public empresa: Empresa;

  public listTabs = [
    "Básico",
    "Usuários",
    "Importação",
    "ZFM",
    "Exportação",
    "Agenciamento de Carga",
    "Documentos",
    "Credenciais",
    "Financeiro",
    "Relatórios"
  ]

  public listTabsAux = [];

  constructor(private service: EmpresaService, private route: ActivatedRoute, private notifyService: NotifyService,) { }

  ngOnInit(): void {
    this.listTabsAux = this.listTabs;
    this.isTabSelect = this.listTabsAux[0];
    let id = this.route.snapshot.paramMap.get('id');

    this.getEmpresa(id);
  }


  reciverIsSelectTab(evt) {
    this.isTabSelect = evt;
  }

  reciverIsCheckImportador(evt) {

    if (!evt['importador'] && (evt['despachante'] || evt['exportador'])) {
      this.listTabsAux = this.listTabs
      this.listTabsAux = this.listTabsAux.filter(x => x != 'ZFM')
    } else if (evt['importador'] && !evt['despachante'] && !evt['exportador']) {
      this.listTabsAux = this.listTabs
      this.listTabsAux = this.listTabsAux.filter(x => x != 'Exportação')
    }
    else this.listTabsAux = this.listTabs

  }

  getEmpresa(id) {
    this.service.getById(id).subscribe(
      {
        next: (v) => {
          this.empresa = v
          this.nome_fantasia = this.empresa['nomeFantasia']
          this.id = this.empresa['id']
        }, error: (e) => {
          this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
        }
      }
    )
  }

}
