import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'app/configuracoes/services/item.service';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';
import { FornecedorService } from 'app/core/services/fornecedor.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {

  public isLoadSave: boolean = false;
  public modalRef?: BsModalRef;
  public form: FormGroup;
  public submitted = false;
  public titleModal = "Novo";


  public listdestinacao = [];
  public listutilizacao = [];

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private fornecedorService: FornecedorService,
    private baseEntityAuxService: BaseEntityAuxService,
    private service: ItemService,
    private readonly router: Router
  ) {

    this.form = this.formBuilder.group({
      partnumber: [{ value: null, disabled: false }, Validators.required],
      codigo_interno: [{ value: null, disabled: false }],
      unidade_organizacional: [{ value: null, disabled: false, }],
      numero_po: [{ value: null, disabled: false, }],
      decricao_detalhada: [{ value: null, disabled: false }, Validators.required],
     
      quantidade: [{ value: null, disabled: false }, Validators.required],
      unidade: [{ value: null, disabled: false }, Validators.required],
      valor_unitario: [{ value: null, disabled: false }, Validators.required],
      valor_total: [{ value: null, disabled: false }],
      peso_liquido: [{ value: null, disabled: false }, Validators.required],

      fornecedor: [{ value: null, disabled: false }, Validators.required],
      logradouro: [{ value: null, disabled: false }, Validators.required],
      numero: [{ value: null, disabled: false, }],
      complemento: [{ value: null, disabled: false }],
      bairro: [{ value: null, disabled: false }],
      cep: [{ value: null, disabled: false }],
      cidade: [{ value: null, disabled: false }, Validators.required],
      estado: [{ value: null, disabled: false }, Validators.required],
      pais: [{ value: null, disabled: false }, Validators.required],
      codigointerno: [{ value: null, disabled: false }],

      ncm: [{ value: null, disabled: false }, Validators.required],
      naladi: [{ value: null, disabled: false }],

      aliquota_ii: [{ value: 0, disabled: false }],
      aliquota_ipi: [{ value: 0, disabled: false }],
      aliquota_pis: [{ value: 0, disabled: false }],
      aliquota_cofins: [{ value: 0, disabled: false }],

      produto: [{ value: null, disabled: false }],
      tipo: [{ value: null, disabled: false }],
      detalhe: [{ value: null, disabled: false }],
      isTipoEModeloPli: [{ value: false, disabled: false }],

      destinacao: [{ value: null, disabled: false }, Validators.required],
      utilizacao: [{ value: null, disabled: false }, Validators.required],
      insc_estadual: [{ value: null, disabled: false }, Validators.required],
      tributacao: [{ value: null, disabled: false }, Validators.required],
      tributacao_fps: [{ value: null, disabled: false }],
      cra: [{ value: null, disabled: false }, Validators.required],
      decricao_item: [{ value: null, disabled: false }],
      cfop: [{ value: null, disabled: false }]
      

    });

  }

  ngOnInit(): void {
  }

  get formControl() {
    return this.form.controls;
  }


  openModal(template: TemplateRef<any>, type?: string, item?) {

    if (type == "update") {
      this.titleModal = "Atualizar";

    } else { this.titleModal = "Novo" }

    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);
  }

  onSubmit() {

  }

}
