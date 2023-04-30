import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelatoriosService } from '../services/relatorios.service';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { ProcessoImportacaoService } from '../services/processo-importacao.service';

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.css']
})
export class FaturaComponent implements OnInit {

  idfatura: number;
  fatura: any;
  processo: any;
  public isLoading = false;
  public isLoadsave = false;

  public form_basico: FormGroup;
  public submitted_basico: boolean = false;
  public numberInputInvalidBasico = 5;

  public form_fornecedor: FormGroup;
  public submitted_fornecedor: boolean = false;
  public fornecedorOfFatura: any;
  public numberInputInvalidFornecedor = 1

  public form_pli: FormGroup;
  public submitted_pli: boolean = false;
  public numberInputInvalidPLI = 4

  constructor(
    private route: ActivatedRoute,
    private relatoriosService: RelatoriosService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private processoImportacaoService: ProcessoImportacaoService

  ) {

    this.form_basico = this.formBuilder.group({
      numeroFatura: [{ value: null, disabled: false }, Validators.required],
      moeda: [{ value: null, disabled: false }, Validators.required],
      incoterms: [{ value: null, disabled: false, }, Validators.required],
      localCondicao: [{ value: null, disabled: false, }, Validators.required],
      dataEmissao: [{ value: null, disabled: false, }, Validators.required],
    });

    this.form_fornecedor = this.formBuilder.group({
      idFornecedor: [{ value: null, disabled: false }, Validators.required],
      logradouro: [{ value: null, disabled: true }],
      numero: [{ value: null, disabled: true, },],
      complemento: [{ value: null, disabled: true, },],
      bairro: [{ value: null, disabled: true, },],
      cep: [{ value: null, disabled: true, },],
      cidade: [{ value: null, disabled: true, },],
      estado: [{ value: null, disabled: true, },],
      pais: [{ value: null, disabled: true, },],
      tipodevinculo: [{ value: null, disabled: true, }],
      codigointerno: [{ value: null, disabled: true, }]
    });

    this.form_pli = this.formBuilder.group({
      regimedeTributacao: [{ value: null, disabled: false }, Validators.required],
      fundamentoLegal: [{ value: null, disabled: false }, Validators.required],
      tipodeAcordoTarifario: [{ value: null, disabled: false, }, Validators.required],
      coberturacambial: [{ value: null, disabled: false, }, Validators.required],
      agenciaSECEX: [{ value: null, disabled: false, }],
      atoDrawback: [{ value: null, disabled: false, }]
    });

  }

  ngOnInit(): void {

    this.route.params.subscribe(
      {
        next: (params) => {

          if (params['idfatura']) {
            this.idfatura = params['idfatura']
            this.getFatura(this.idfatura)
          } else {
            this.getProcesso(params['id']);
          }
        }
      }
    );

    this.form_basico.valueChanges.subscribe(
      result => {

        let arr = [
          this.formControlBasico.numeroFatura.valid,
          this.formControlBasico.moeda.valid,
          this.formControlBasico.incoterms.valid,
          this.formControlBasico.localCondicao.valid,
          this.formControlBasico.dataEmissao.valid
        ]

        console.log(arr)

        let arrIsTrue = arr.filter(x => x == true);

        this.numberInputInvalidBasico = (arr.length - arrIsTrue.length)

      }
    );

    this.form_fornecedor.valueChanges.subscribe(
      result => {
        let arr = [
          this.formControlFornecedor.idFornecedor.valid,
        ]
        let arrIsTrue = arr.filter(x => x == true);
        this.numberInputInvalidFornecedor = (arr.length - arrIsTrue.length)
      }
    );

    this.form_pli.valueChanges.subscribe(
      result => {
        let arr = [
          this.formControlPli.regimedeTributacao.valid,
          this.formControlPli.fundamentoLegal.valid,
          this.formControlPli.tipodeAcordoTarifario.valid,
          this.formControlPli.coberturacambial.valid
        ]
        let arrIsTrue = arr.filter(x => x == true);
        this.numberInputInvalidPLI = (arr.length - arrIsTrue.length)
      }
    );
  }


  get formControlBasico() {
    return this.form_basico.controls;
  }

  get formControlFornecedor() {
    return this.form_fornecedor.controls;
  }

  get formControlPli() {
    return this.form_pli.controls;
  }

  getProcesso(codigo) {

    this.isLoading = true;
    this.relatoriosService.getProcessoBase(codigo).subscribe({
      next: (obj) => {
        this.processo = obj;
        this.isLoading = false;
      }
    })
  }

  getFatura(codigo) {

    this.isLoading = true;
    this.processoImportacaoService.getFatura(codigo).subscribe({
      next: (obj) => {
        this.fatura = obj;
        this.processo = this.fatura.processoImportacao;

        this.formControlBasico.numeroFatura.setValue(this.fatura.numeroFatura)
        this.formControlBasico.moeda.setValue(this.fatura.idMoeda)
        this.formControlBasico.incoterms.setValue(this.fatura.idIncoterms)
        this.formControlBasico.localCondicao.setValue(this.fatura.localCondicao)
        this.formControlBasico.dataEmissao.setValue(this.fatura.dtEmissao)


        this.fornecedorOfFatura = this.fatura.fornecedor;
        this.formControlFornecedor.idFornecedor.setValue(this.fatura.fornecedor.id);
        this.formControlFornecedor.logradouro.setValue(this.fatura.fornecedor.logradouro);
        this.formControlFornecedor.numero.setValue(this.fatura.fornecedor.numero);
        this.formControlFornecedor.complemento.setValue(this.fatura.fornecedor.complemento);
        this.formControlFornecedor.bairro.setValue(this.fatura.fornecedor.bairro);
        this.formControlFornecedor.cep.setValue(this.fatura.fornecedor.cep);
        this.formControlFornecedor.cidade.setValue(this.fatura.fornecedor.cidade);
        this.formControlFornecedor.estado.setValue(this.fatura.fornecedor.estado);
        this.formControlFornecedor.pais.setValue(this.fatura.fornecedor.pais.nome);
        this.formControlFornecedor.tipodevinculo.setValue(this.fatura.fornecedor.tipoDeVinculo)
        this.formControlFornecedor.codigointerno.setValue(this.fatura.fornecedor.codigoInterno);

        this.formControlPli.regimedeTributacao.setValue(this.fatura.idRegimeTributavel);
        this.formControlPli.fundamentoLegal.setValue(this.fatura.idFundamentoLegal);
        this.formControlPli.tipodeAcordoTarifario.setValue(this.fatura.idTipoAcordoTarifario);
        this.formControlPli.coberturacambial.setValue(this.fatura.idCoberturaCambial);
        this.formControlPli.agenciaSECEX.setValue(this.fatura.agenciaSECEX);
        this.formControlPli.atoDrawback.setValue(this.fatura.atoDrawback);

        this.isLoading = false;

      }
    })
  }

  onSubmit() {

    this.submitted_basico = true;
    this.submitted_fornecedor = true;
    this.submitted_pli = true;

    if (this.form_basico.valid
      && this.form_fornecedor.valid
      && this.form_pli.valid
    ) {

      this.isLoadsave = true;

      const params = {
        "dtModificacao": "2023-04-18T21:43:45.564Z",
        "dtEmissao": this.formControlBasico.dataEmissao.value,
        "numeroFatura": this.formControlBasico.numeroFatura.value,
        "localCondicao": this.formControlBasico.localCondicao.value,
        "idFornecedor": this.formControlFornecedor.idFornecedor.value,
        "idMoeda": this.formControlBasico.moeda.value,
        "idIncoterms": this.formControlBasico.incoterms.value,
        "idMoedaFrete": 0,
        "idMoedaSeguro": 0,
        "idItemFatura": 0,
        "itensFaturas": [],
        "idModalidadePagamento": 1,
        "idCoberturaCambial": this.formControlPli.coberturacambial.value,
        "idFundamentoLegal": this.formControlPli.fundamentoLegal.value,
        "idTipoAcordoTarifario": this.formControlPli.tipodeAcordoTarifario.value,
        "idRegimeTributavel": this.formControlPli.regimedeTributacao.value,
        "numDiasPagamento": 0,
        "valorTotal": 0,
        "pesoLiquido": 0,
        "tipoVinculoFornecedor": "string",
        "idProcessoImportacao": this.processo.id
      }

      if (this.idfatura) {
        let id = this.idfatura;
        this.processoImportacaoService.updateFatura({
          id,
          ...params
        }).subscribe({
          next: (obj) => { },
          error: (e) => {
            this.notifyService.showNotification('top', 'right', e.error.message, 'danger');

          },
          complete: () => {

            this.notifyService.showNotification('top', 'right', "Fatura atualizado c/ sucesso!", 'success');
            this.isLoadsave = false;
          }
        })

      } else {

        this.processoImportacaoService.createFatura(params).subscribe({
          next: (obj) => { },
          error: (e) => {
            this.notifyService.showNotification('top', 'right', e.error.message, 'danger');

          },
          complete: () => {

            this.notifyService.showNotification('top', 'right', "Fatura registrada c/ sucesso!", 'success');
            this.isLoadsave = false;
          }
        })

      }

    } else {
      this.notifyService.showNotification('top', 'right', "Campos obrigatório dos formulários pendente", 'danger');
    }
  }

}
