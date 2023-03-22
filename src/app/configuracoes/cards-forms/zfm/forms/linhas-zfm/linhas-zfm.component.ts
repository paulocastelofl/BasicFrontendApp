import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-linhas-zfm',
  templateUrl: './linhas-zfm.component.html',
  styleUrls: ['./linhas-zfm.component.css']
})
export class LinhasZfmComponent implements OnInit {

  @Input() empresa: Empresa;

  constructor() { }

  ngOnInit(): void {
  }

}
