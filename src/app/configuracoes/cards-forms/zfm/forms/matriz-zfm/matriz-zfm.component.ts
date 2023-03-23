import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InscricaoEstadualService } from 'app/configuracoes/services/inscricao-estadual.service'
import { DestinacaoService } from 'app/configuracoes/services/destinacao.service'
import { ProdutoSuframaNcmService } from 'app/configuracoes/services/produto-suframa-ncm.service'
import { TipoDocumentoTributacaoService } from 'app/configuracoes/services/tipo-documento-tributacao.service'
import { UtilizacaoService } from 'app/configuracoes/services/utilizacao.service'

@Component({
  selector: 'app-matriz-zfm',
  templateUrl: './matriz-zfm.component.html',
  styleUrls: ['./matriz-zfm.component.css']
})
export class MatrizZfmComponent implements OnInit {

  public modalRef?: BsModalRef;
  public isLoadSave = false;
  public submitted = false;
  isLoad: boolean = false;
  public form: FormGroup;
  public titleModal = "Novo";
  public inscricaoEstadual: InscricaoEstadual[];
  public destinacao: IDestinacao[];
  public utilizacao: IUtilizacao[];
  public tipoDocumentoTributacao: ITipoDocumentoTributacao[];
  @Input() empresa: Empresa;
  idUpdate: number = 0;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private InscricaoEstadualService: InscricaoEstadualService,
    private DestinacaoService: DestinacaoService,
    private ProdutoSuframaNcmService: ProdutoSuframaNcmService,
    private TipoDocumentoTributacaoService: TipoDocumentoTributacaoService,
    private UtilizacaoService: UtilizacaoService
  ) {
    this.form = this.formBuilder.group({
      iestadual: [{ value: null, disabled: false }, Validators.required],
      prodSuframa: [{ value: null, disabled: false }, Validators.required],
      ncm: [{ value: null, disabled: false }, Validators.required],
      destinacao: [{ value: null, disabled: false }, Validators.required],
      utilizacao: [{ value: null, disabled: false }, Validators.required],
      tributacao: [{ value: null, disabled: false }, Validators.required],
      cra: [{ value: null, disabled: false }, Validators.required],
      tipoDocumento: [{ value: null, disabled: false }, Validators.required],
      decreto: [{ value: null, disabled: false }, Validators.required],
      numeroDocumento: [{ value: null, disabled: false }, Validators.required],
      inicioVigencia: [{ value: null, disabled: false }, Validators.required],
      fimVigencia: [{ value: null, disabled: false }, Validators.required]
    });
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getAllInscricaoEstadual()
    this.getAllDestinacao()
    this.getAllUtilizacao()
    this.getAllTipoDocumentoTributacao()
  }

  openModal(template: TemplateRef<any>, type?: string, row?) {

    //this.form.reset();

    if (type == "update") {
      this.titleModal = "Atualizar";
      //this.setValueModalUpdate(row);

    } else { this.titleModal = "Nova" }

    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);
  }

  onSubmit() {

    this.submitted = true;

    if (this.form.valid) {
      this.isLoadSave = true;
      var parms = {
        // "id": this.idUpdate,
        // "cnpj": this.form.controls.cnpj.value,
        // "razaoSocial": this.form.controls.razao.value,
        // "nomeFantasia": this.form.controls.nome.value,
        // "logradouro": this.form.controls.logradouro.value,
        // "numero": this.form.controls.numero.value,
        // "complemento": this.form.controls.complemento.value,
        // "bairro": this.form.controls.bairro.value,
        // "cep": this.form.controls.cep.value,
        // "cidade": this.form.controls.cidade.value,
        // "estado": this.form.controls.estado.value,
        // "tipoDeVinculo": this.form.controls.tipoDeVinculo.value,
        // "codigointerno": this.form.controls.codigointerno.value,
        // "idPais": this.form.controls.pais.value
      }

      if (this.titleModal == "Atualizar") {



      } else {

      }
    }
  }

  getAllInscricaoEstadual( ){
    this.InscricaoEstadualService.getAll().subscribe(
      {
        next: (v) => this.inscricaoEstadual = v
      }
    )
  }

  getAllDestinacao( ) {
    this.DestinacaoService.getAll().subscribe(
      {
        next: (v) => this.destinacao = v
      }
    )
  }

  getAllUtilizacao( ) {
    this.UtilizacaoService.getAll().subscribe(
      {
        next: (v) => this.utilizacao = v
      }
    )
  }

  getAllTipoDocumentoTributacao( ) {
    this.TipoDocumentoTributacaoService.getAll().subscribe(
      {
        next: (v) => this.tipoDocumentoTributacao = v
      }
    )
  }
}
