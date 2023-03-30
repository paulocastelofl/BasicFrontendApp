import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelatoriosService } from '../services/relatorios.service';

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.css']
})
export class FaturaComponent implements OnInit {

  processo: any;

  constructor( 
     private route: ActivatedRoute,
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

  
  getProcesso(codigo){
    this.relatoriosService.getProcessoBase(codigo).subscribe({
      next: (obj) => {
        this.processo = obj;
      }
    })
  }

}
