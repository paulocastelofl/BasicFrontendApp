import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-itens-zfm',
  templateUrl: './itens-zfm.component.html',
  styleUrls: ['./itens-zfm.component.css']
})
export class ItensZfmComponent implements OnInit {

  @Input() empresa: Empresa;

  constructor() { }

  ngOnInit(): void {
  }

}
