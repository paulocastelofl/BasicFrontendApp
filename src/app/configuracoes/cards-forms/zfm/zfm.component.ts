import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-zfm',
  templateUrl: './zfm.component.html',
  styleUrls: ['./zfm.component.css']
})
export class ZfmComponent implements OnInit {

  @Input() empresa: Empresa;

  constructor() { }

  ngOnInit(): void {
  }

}
