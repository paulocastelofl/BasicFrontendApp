import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basico-importacao',
  templateUrl: './basico-importacao.component.html',
  styleUrls: ['./basico-importacao.component.css']
})
export class BasicoImportacaoComponent implements OnInit {

  public form: FormGroup;
  public state: boolean = true;
  public labelWidth: number = 50;
  public size = 'mini';

  constructor( private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      cpfRepresentanteLegal: [{ value: null, disabled: false }, Validators.required],
      atividadeEconomica: [{ value: null, disabled: false }, Validators.required],
      CNAE: [{ value: null, disabled: false }, Validators.required],
      numeroCadastroMA: [{ value: null, disabled: false }, Validators.required],
      limiteValorFob: [{ value: null, disabled: false }, Validators.required],
      DespachantePadrão: [{ value: null, disabled: false }, Validators.required],
      PrazoDiasCeMercante: [{ value: null, disabled: false }, Validators.required],
      CentroCusto: [{ value: null, disabled: false }, Validators.required],
      isCadastrarItens: [{ value: true, disabled: false }, Validators.required],
      isAtualizarItens: [{ value: true, disabled: false }, Validators.required],
      isCadastrarFornecedores: [{ value: true, disabled: false }, Validators.required],
      isAtualizarFornecedores: [{ value: true, disabled: false }, Validators.required],

      isControlarDemurrage: [{ value: true, disabled: false }, Validators.required],
      isControlarCEMercante: [{ value: true, disabled: false }, Validators.required],
      isControlarCambio: [{ value: true, disabled: false }, Validators.required],

      isSeguradoPela: [{ value: true, disabled: false }, Validators.required]
      
  
    });
   }

  ngOnInit(): void {
  }

  onChange(event){

  }

}
