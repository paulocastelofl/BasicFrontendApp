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

  processo: any;
  public isLoading = false;

  public form_basico: FormGroup;
  public submitted_basico: boolean = false;
  
  public form_fornecedor: FormGroup;
  public submitted_fornecedor: boolean = false;

  public form_pli: FormGroup;
  public submitted_pli: boolean = false;

  constructor( 
     private route: ActivatedRoute,
      private relatoriosService: RelatoriosService,
      private formBuilder: FormBuilder,
      private notifyService: NotifyService,
      private processoImportacaoService: ProcessoImportacaoService
    
      ) { 

        this.form_basico = this.formBuilder.group({
          numeroFatura: [{ value: null, disabled: false }, Validators.required],
          moeda: [{ value: null, disabled: false },  Validators.required],
          incoterms: [{ value: null, disabled: false, },  Validators.required],
          localCondicao: [{ value: null, disabled: false, },  Validators.required],
          dataEmissao: [{ value: null, disabled: false, },  Validators.required],
        });

        this.form_fornecedor = this.formBuilder.group({
          idFornecedor: [{ value: null, disabled: false }, Validators.required],
          logradouro: [{ value: null, disabled: true }],
          numero: [{ value: null, disabled: true, },  ],
          complemento: [{ value: null, disabled: true, },  ],
          bairro: [{ value: null, disabled: true, },  ],
          cep: [{ value: null, disabled: true, },  ],
          cidade: [{ value: null, disabled: true, },  ],
          estado: [{ value: null, disabled: true, },  ],
          pais: [{ value: null, disabled: true, },  ],
          tipodevinculo: [{ value: null, disabled: true, }],
          codigointerno: [{ value: null, disabled: true, }]
        });

        this.form_pli = this.formBuilder.group({
          regimedeTributacao: [{ value: null, disabled: false }, Validators.required],
          fundamentoLegal: [{ value: null, disabled: false },  Validators.required],
          tipodeAcordoTarifario: [{ value: null, disabled: false, },  Validators.required],
          coberturacambial: [{ value: null, disabled: false, },  Validators.required],
          agenciaSECEX: [{ value: null, disabled: false, }],
          atoDrawback: [{ value: null, disabled: false, }]
        });

      }

  ngOnInit(): void {

    this.route.params.subscribe(
      {
        next: (params) => {
          this.getProcesso(params['id']);
        }
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

  getProcesso(codigo){

    this.isLoading = true;
    this.relatoriosService.getProcessoBase(codigo).subscribe({
      next: (obj) => {
        this.processo = obj;
        this.isLoading = false;

      }
    })
  }

  onSubmit(){

    this.submitted_basico = true;
    this.submitted_fornecedor = true;
    this.submitted_pli = true;

    if (this.form_basico.valid
      && this.form_fornecedor.valid
      && this.form_pli.valid
      ) {

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

      this.processoImportacaoService.createFatura(params).subscribe({
        next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
         
            },
            complete: () => {
              
              this.notifyService.showNotification('top', 'right', "Fatura atualizado c/ sucesso!", 'success');
 
            }
      })

      console.log(params)

    }else{
      this.notifyService.showNotification('top', 'right', "Campos obrigatório dos formulários pendente", 'danger');
    }
  }




}
