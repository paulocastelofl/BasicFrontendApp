import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basico',
  templateUrl: './basico.component.html',
  styleUrls: ['./basico.component.css']
})
export class BasicoComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public isLoad: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [{ value: null, disabled: false }, Validators.required],
      razao_social: [{ value: null, disabled: false }, Validators.required],
      dominio: [{ value: null, disabled: false }],
      logradouro: [{ value: null, disabled: false }, Validators.required],
      numero: [{ value: null, disabled: false }, Validators.required],
      complemento: [{ value: null, disabled: false }],
      bairro: [{ value: null, disabled: false }, Validators.required],
      cep: [{ value: null, disabled: false }, Validators.required],
      cidade: [{ value: null, disabled: false }, Validators.required],
      estado: [{ value: null, disabled: false }, Validators.required],
      pais: [{ value: null, disabled: false }, Validators.required],
      cnpj: [{ value: null, disabled: false }, Validators.required],
      inscricao_municipal: [{ value: null, disabled: false }],
      inscricao_suframa: [{ value: null, disabled: false }]
    });
  }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.table(this.form.value);
    }
  }

}
