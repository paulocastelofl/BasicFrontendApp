import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { InscricaoEstadualService } from 'app/configuracoes/services/inscricao-estadual.service'
import { DestinacaoService } from 'app/configuracoes/services/destinacao.service'
import { ProdutoSuframaNcmService } from 'app/configuracoes/services/produto-suframa-ncm.service'
import { TipoDocumentoTributacaoService } from 'app/configuracoes/services/tipo-documento-tributacao.service'
import { UtilizacaoService } from 'app/configuracoes/services/utilizacao.service'
import { MatrizTributacaoService } from 'app/configuracoes/services/matriz-tributacao.service'

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
    private notifyService: NotifyService,
    private InscricaoEstadualService: InscricaoEstadualService,
    private DestinacaoService: DestinacaoService,
    private ProdutoSuframaNcmService: ProdutoSuframaNcmService,
    private TipoDocumentoTributacaoService: TipoDocumentoTributacaoService,
    private UtilizacaoService: UtilizacaoService,
    private MatrizTributacaoService: MatrizTributacaoService
  ) {
    this.form = this.formBuilder.group({
      iestadual: [{ value: null, disabled: false }],
      prodSuframa: [{ value: null, disabled: false }],
      //ncm: [{ value: null, disabled: false }],
      destinacao: [{ value: null, disabled: false }],
      utilizacao: [{ value: null, disabled: false }],
      tributacao: [{ value: null, disabled: false }],
      cra: [{ value: null, disabled: false }],
      tipoDocumento: [{ value: null, disabled: false }],
      decreto: [{ value: null, disabled: false }],
      numeroDocumento: [{ value: null, disabled: false }],
      inicioVigencia: [{ value: null, disabled: false }],
      fimVigencia: [{ value: null, disabled: false }]
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
        "id": this.idUpdate,
        "IdInscricaoEstadual": this.form.controls.iestadual.value,
        "IdProdutoSuframaNcm": this.form.controls.prodSuframa.value,
        "IdDestinacao": this.form.controls.destinacao.value,
        "IdUtilizacao": this.form.controls.utilizacao.value,
        "IdTributacao": this.form.controls.tributacao.value,
        "Cra": this.form.controls.cra.value,
        "IdTipoDocumentoTributacao": this.form.controls.tipoDocumento.value,
        "Decreto": this.form.controls.decreto.value,
        "NumeroDocumento": this.form.controls.numeroDocumento.value,
        "InicioVigencia": this.form.controls.inicioVigencia.value,
        "FimVigencia": this.form.controls.fimVigencia.value
        // "IdNcm": this.form.controls.ncm.value
      }

      if (this.titleModal == "Atualizar") {



      } else {
        this.MatrizTributacaoService.create(parms).subscribe(
          {
            next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.modalRef.hide();
              this.notifyService.showNotification('top', 'right', "Matriz de tributação registrado c/ sucesso!", 'success');
              this.isLoadSave = false;
              this.form.reset();
            }
          }
        )
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
