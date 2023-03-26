import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-processo',
  templateUrl: './header-processo.component.html',
  styleUrls: ['./header-processo.component.css']
})
export class HeaderProcessoComponent implements OnInit {

  @Input() processo: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
