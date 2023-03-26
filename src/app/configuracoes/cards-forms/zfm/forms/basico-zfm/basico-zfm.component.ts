import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basico-zfm',
  templateUrl: './basico-zfm.component.html',
  styleUrls: ['./basico-zfm.component.css']
})
export class BasicoZfmComponent implements OnInit {
  @Input() empresa: Empresa;
  constructor() { }

  ngOnInit(): void {
  }

}
