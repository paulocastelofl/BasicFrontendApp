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

  isInputFrete = true;
  isInputSeguro = true;

  constructor(private formBuilder: FormBuilder,
    private baseEntityAuxService: BaseEntityAuxService
  ) {

  }

  ngOnInit(): void {
    this.getLookups();

  }

  get formControl() {
    return this.form_basico.controls;
  }

  getLookups() {

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

            if(this.form_basico.controls.incoterms.value) {

              let arr = this.listIncoterms.filter(x => x.id == this.form_basico.controls.incoterms.value)
              this.isCheckHiddenInputs(arr[0].codigo)

            }
        
        }
      }
    )
  }

  changeEvetIincoterms(evt) {
    this.isCheckHiddenInputs(evt.codigo)
  }

  isCheckHiddenInputs(codigo){
    
    let arr_only_frete = ['CFR', 'CPT', 'DDU']
    let arr_only_seguro = ['CIF', 'CIP', 'DDP']

    if (arr_only_frete.includes(codigo)) {
      this.isInputFrete = false
      this.isInputSeguro = true
    } else {
      if (arr_only_seguro.includes(codigo)) {
        this.isInputFrete = false
        this.isInputSeguro = false
      } else {
        this.isInputFrete = true
        this.isInputSeguro = true
      }
    }

  }
}
