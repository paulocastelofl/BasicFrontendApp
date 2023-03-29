import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basico-fatura',
  templateUrl: './basico-fatura.component.html',
  styleUrls: ['./basico-fatura.component.css']
})
export class BasicoFaturaComponent implements OnInit {
  public form: FormGroup;

  constructor( private formBuilder: FormBuilder,) { 
    this.form = this.formBuilder.group({
      numeroFatura: [{ value: null, disabled: false }, Validators.required],
      moeda: [{ value: null, disabled: false },  Validators.required],
      incoterms: [{ value: null, disabled: false, },  Validators.required],
      localCondicao: [{ value: null, disabled: false, },  Validators.required],
      dataEmissao: [{ value: null, disabled: false, },  Validators.required],
    });

  }

  ngOnInit(): void {
  }

}
