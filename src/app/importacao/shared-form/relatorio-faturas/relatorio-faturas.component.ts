import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorio-faturas',
  templateUrl: './relatorio-faturas.component.html',
  styleUrls: ['./relatorio-faturas.component.css']
})
export class RelatorioFaturasComponent implements OnInit {

  @Input() processo: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToNovoFatura() {
    this.router.navigate([`importacao/${this.processo.id}/fatura`]);
  }

}
