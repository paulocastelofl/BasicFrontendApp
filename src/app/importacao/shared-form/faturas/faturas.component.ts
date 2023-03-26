import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.css']
})
export class FaturasComponent implements OnInit {

  @Input() processo: any;

  constructor() { }

  ngOnInit(): void {
  }

}
