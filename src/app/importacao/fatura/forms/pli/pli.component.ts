import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      regimedeTributacao: [{ value: null, disabled: false }, Validators.required],
      fundamentoLegal: [{ value: null, disabled: false },  Validators.required],
      tipodeAcordoTarifario: [{ value: null, disabled: false, },  Validators.required],
      coberturacambial: [{ value: null, disabled: false, },  Validators.required],
      agenciaSECEX: [{ value: null, disabled: false, },  Validators.required],
      atoDrawback: [{ value: null, disabled: false, },  Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
