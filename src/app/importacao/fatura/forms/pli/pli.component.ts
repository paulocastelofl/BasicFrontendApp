import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';

@Component({
  selector: 'app-pli',
  templateUrl: './pli.component.html',
  styleUrls: ['./pli.component.css']
})
export class PliComponent implements OnInit {

  public listregimedeTributacao = []
  public listfundamentoLegal = []
  public listtipodeAcordoTarifario = []
  public listcoberturacambial = []

  @Input() form_pli: FormGroup;
  @Input() submitted_pli: boolean = false;

  constructor(
    private baseEntityAuxService: BaseEntityAuxService
    ) { 

  }

  ngOnInit(): void {
    this.getLookups();
  }

  
  get formControl() {
    return this.form_pli.controls;
  }


  getLookups(){

    this.baseEntityAuxService.getByAllWithCode("RegimeTributavel").subscribe(
      {
        next: (obj) => {
          this.listregimedeTributacao = obj;
        }
      }
    )
    this.baseEntityAuxService.getByAllWithCode("FundamentoLegal").subscribe(
      {
        next: (obj) => {
          this.listfundamentoLegal = obj;
        }
      }
    )
    this.baseEntityAuxService.getByAllWithCode("TipoAcordoTarifario").subscribe(
      {
        next: (obj) => {
          this.listtipodeAcordoTarifario = obj;
        }
      }
    )
    this.baseEntityAuxService.getByAllWithCode("CoberturaCambial").subscribe(
      {
        next: (obj) => {
          this.listcoberturacambial = obj;
        }
      }
    )

  }

}
