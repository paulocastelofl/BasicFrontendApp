import { Component, OnInit } from '@angular/core';
import { CelulasService } from '../services/celulas.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public isLoad: boolean = false
  public celulas = []
  public celulasDynamic = []
  public p = 1;

  constructor(private _service: CelulasService) { }

  ngOnInit(): void {
    this.getCelula()
  }


  getCelula() {
    this.isLoad = true;

    this._service.getAll().subscribe(
      {
        next: (obj) => {

          this.celulas = []
          this.celulasDynamic = []

          obj.forEach(element => {

            element = {
              isSelect: false,
              ...element
            }

            this.celulas.push(element)

          });

          this.celulasDynamic = this.celulas;
          this.isLoad = false;
        }

      }
    )
  }



  selectRow(item) {
    item.isSelect = !item.isSelect
  }

  sendit(evt) {
    if (evt === "") {
      this.celulasDynamic = this.celulas
    } else {
      this.celulasDynamic = this.celulas.filter(x => x.nome.toString().toLowerCase().includes(evt.toString().toLowerCase()));
    }
  }

  onDelete() {

  }

}
