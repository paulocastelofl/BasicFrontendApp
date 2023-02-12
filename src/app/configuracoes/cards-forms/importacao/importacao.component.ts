import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-importacao',
  templateUrl: './importacao.component.html',
  styleUrls: ['./importacao.component.css']
})
export class ImportacaoComponent implements OnInit {

  @Input() empresa: Empresa;

  constructor() { }

  ngOnInit(): void {
  }

}
