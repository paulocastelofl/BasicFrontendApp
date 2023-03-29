import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  public form: FormGroup;

  constructor( private formBuilder: FormBuilder,) { 
    
    this.form = this.formBuilder.group({
      nome: [{ value: null, disabled: false }, Validators.required],
      Logradouro: [{ value: null, disabled: false },  Validators.required],
      numero: [{ value: null, disabled: false, },  Validators.required],
      complemento: [{ value: null, disabled: false, },  Validators.required],
      bairro: [{ value: null, disabled: false, },  Validators.required],
      cep: [{ value: null, disabled: false, },  Validators.required],
      cidade: [{ value: null, disabled: false, },  Validators.required],
      estado: [{ value: null, disabled: false, },  Validators.required],
      pais: [{ value: null, disabled: false, },  Validators.required],
      tipodevinculo: [{ value: null, disabled: false, },  Validators.required],
      codigointerno: [{ value: null, disabled: false, },  Validators.required]
    });

  }

  ngOnInit(): void {
  }

}
