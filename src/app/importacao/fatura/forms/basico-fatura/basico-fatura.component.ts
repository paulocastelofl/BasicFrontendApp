import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';

@Component({
  selector: 'app-basico-fatura',
  templateUrl: './basico-fatura.component.html',
  styleUrls: ['./basico-fatura.component.css']
})
export class BasicoFaturaComponent implements OnInit {
  @Input() form_basico: FormGroup;
  public listmoeda = []
  public listIncoterms = []
  @Input() submitted_basico: boolean;
  

  constructor( private formBuilder: FormBuilder,
    private baseEntityAuxService: BaseEntityAuxService
    ) { 


  }

  ngOnInit(): void {
    this.getLookups();
  }

  get formControl() {
    return this.form_basico.controls;
  }

  getLookups(){

    this.baseEntityAuxService.getByAllWithCode("Moeda").subscribe(
      {
        next: (obj) => {
          this.listmoeda = obj;
        }
      }
    )
    this.baseEntityAuxService.getByAllWithCode("Incoterms").subscribe(
      {
        next: (obj) => {
          this.listIncoterms = obj;
        }
      }
    )
    
  }


}
