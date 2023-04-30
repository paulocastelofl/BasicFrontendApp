import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessoImportacaoService } from 'app/importacao/services/processo-importacao.service';

@Component({
  selector: 'app-relatorio-faturas',
  templateUrl: './relatorio-faturas.component.html',
  styleUrls: ['./relatorio-faturas.component.css']
})
export class RelatorioFaturasComponent implements OnInit {

  @Input() processo: any;
  public faturas= [];
  public isLoad: boolean = false;

  constructor(
    private _service: ProcessoImportacaoService,
    private router: Router) { }

  ngOnInit(): void {
    this.getFaturas();
  }

  getFaturas(){
    this.isLoad = true;

    this._service.getAllFaturas(this.processo.id).subscribe(
      {
        next: (obj) => {
          this.faturas = obj
          this.isLoad = false;
        }
      
      }
    )
  }

  goToNovoFatura() {
    this.router.navigate([`importacao/${this.processo.id}/fatura`]);
  }

  goToUpdateFatura(item){
    this.router.navigate([`importacao/${this.processo.id}/fatura/${item.id}`]);
  }

}
