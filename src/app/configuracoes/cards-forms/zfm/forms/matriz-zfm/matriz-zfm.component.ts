import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { InscricaoEstadualService } from 'app/configuracoes/services/inscricao-estadual.service'
import { DestinacaoService } from 'app/configuracoes/services/destinacao.service'
import { ProdutoSuframaNcmService } from 'app/configuracoes/services/produto-suframa-ncm.service'
import { TipoDocumentoTributacaoService } from 'app/configuracoes/services/tipo-documento-tributacao.service'
import { TributacaoService } from 'app/configuracoes/services/tributacao.service'
import { UtilizacaoService } from 'app/configuracoes/services/utilizacao.service'
import { NcmService } from 'app/configuracoes/services/ncm.service'
import { MatrizTributacaoService } from 'app/configuracoes/services/matriz-tributacao.service'

import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';

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
  public tributacao: ITributacao[];
  public produtoSuframaNcm: IProdutoSuframaNcm[];
  public ncm: INcm[];
  public matrizList: IMatrizTributacao[] = [];
  public listMatrizListDynamic: IMatrizTributacao[] = [];
  @Input() empresa: Empresa;
  idUpdate: number = 0;

  prodSuframaNcm$: Observable<any>;
  prodSuframaNcmLoading = false;
  prodSuframaNcmInput$ = new Subject<string>();

  ncm$: Observable<any>;
  ncmLoading = false;
  ncmInput$ = new Subject<string>();

  minLengthTerm = 3;
  regexStr = "";

  public p = 1;
  q: string = ""
  public iniVig
  public fimVig

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private InscricaoEstadualService: InscricaoEstadualService,
    private DestinacaoService: DestinacaoService,
    private ProdutoSuframaNcmService: ProdutoSuframaNcmService,
    private NcmService: NcmService,
    private TipoDocumentoTributacaoService: TipoDocumentoTributacaoService,
    private TributacaoService: TributacaoService,
    private UtilizacaoService: UtilizacaoService,
    private MatrizTributacaoService: MatrizTributacaoService
  ) {
    this.form = this.formBuilder.group({
      iestadual: [{ value: null, disabled: false }, Validators.required],
      prodSuframa: [{ value: null, disabled: false }, Validators.required],
      ncm: [{ value: null, disabled: false }, Validators.required],
      destinacao: [{ value: null, disabled: false }, Validators.required],
      utilizacao: [{ value: null, disabled: false }, Validators.required],
      tributacao: [{ value: null, disabled: false }, Validators.required],
      Cra: [{ value: null, disabled: false }, Validators.required],
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
    this.getAllTributacao()
    this.getAllMatrizTributacao()
    this.loadProdutoSuframaNcm()
    this.loadNcm()
  }

  openModal(template: TemplateRef<any>, type?: string, row?) {

    this.form.reset();

    if (type == "update") {
      this.titleModal = "Atualizar";
      this.setValueModalUpdate(row);
      console.log(row);

    } else { this.titleModal = "Nova" }

    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);
  }

  onSubmit() {

    this.submitted = true;

    if (this.form.valid) {
      this.isLoadSave = true;
      var parms = {
        "id": this.idUpdate,
        "idInscricaoEstadual": this.form.controls.iestadual.value,
        "IdProdutoSuframaNcm": this.form.controls.prodSuframa.value,
        "IdDestinacao": this.form.controls.destinacao.value,
        "IdUtilizacao": this.form.controls.utilizacao.value,
        "IdTributacao": this.form.controls.tributacao.value,
        "Cra": this.form.controls.Cra.value,
        "IdTipoDocumentoTributacao": this.form.controls.tipoDocumento.value,
        "Decreto": this.form.controls.decreto.value,
        "NumeroDocumento": this.form.controls.numeroDocumento.value,
        "InicioVigencia": this.form.controls.inicioVigencia.value,
        "FimVigencia": this.form.controls.fimVigencia.value,
        "IdNcm": this.form.controls.ncm.value
      }

      if (this.titleModal == "Atualizar") {
        this.MatrizTributacaoService.update(parms).subscribe(
          {
            next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.getAllMatrizTributacao();
              this.modalRef.hide();
              this.idUpdate = 0;
              this.notifyService.showNotification('top', 'right', "Matriz de tributação atualizado c/ sucesso!", 'success');
              this.isLoadSave = false;
              this.form.reset();
            }
          }
        )
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
              this.form.updateValueAndValidity();
              this.getAllMatrizTributacao();
            }
          }
        )
      }
    }
  }

  onDelete(row) {
    Swal.fire({

      title: `Tem certeza?`,
      text: `Excluir essa matriz de tributação?`,
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Sim, Delete!',
      buttonsStyling: false

    }).then((result) => {

      if (result.value) {

        this.MatrizTributacaoService.delete(row.id).subscribe({
          next: (obj) => {

          },
          error: (e) => {
              Swal.fire(
                {
                  title: 'Não foi possível excluir!',
                  text: `ERRO: ${e}` ,
                  icon: 'warning',
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                  buttonsStyling: false
                }
              )
          },
          complete: () => {
            this.getAllMatrizTributacao();
            Swal.fire(
              {
                title: 'Deletado!',
                text: 'Matriz de tributação excluída com sucesso!',
                icon: 'success',
                customClass: {
                  confirmButton: "btn btn-success",
                },
                buttonsStyling: false
              }
            )
          }
        })

      }
    })

  }

  getAllMatrizTributacao() {

    this.isLoad = true;

    this.MatrizTributacaoService.getAll().subscribe({
      next: (value) => {
        this.matrizList = value;
        this.listMatrizListDynamic = this.matrizList
      }, error: (e) => {
        this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
        this.isLoad = false;
      },
      complete: () => {
        this.isLoad = false;
      }
    })
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

  loadProdutoSuframaNcm() {

    this.prodSuframaNcm$ = concat(
      of([]), // default items
      this.prodSuframaNcmInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.prodSuframaNcmLoading = true),
        switchMap(term => {
          return this.ProdutoSuframaNcmService.getByQ(term, "ProdutoSuframaNcm").pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.prodSuframaNcmLoading = false
            })
          )
        })
      )
    );
  }

  loadNcm() {

    this.ncm$ = concat(
      of([]), // default items
      this.ncmInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.ncmLoading = true),
        switchMap(term => {
          return this.NcmService.getByQ(term, "Ncm").pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.ncmLoading = false
            })
          )
        })
      )
    );
  }

  getAllTributacao( ) {
    this.TributacaoService.getAll().subscribe(
      {
        next: (v) => this.tributacao = v
      }
    )
  }

  setValueModalUpdate(row) {

    this.iniVig = row.inicioVigencia.split("T",2)
    this.fimVig = row.fimVigencia.split("T",2)
    this.idUpdate = row.id;
    this.form.controls.iestadual.setValue(row.idInscricaoEstadual);
    // this.form.controls.prodSuframa.setValue(row.idProdutoSuframaNcm);
    this.form.controls.destinacao.setValue(row.idDestinacao);
    this.form.controls.utilizacao.setValue(row.idUtilizacao);
    this.form.controls.tributacao.setValue(row.idTributacao);
    this.form.controls.Cra.setValue(row.cra);
    this.form.controls.tipoDocumento.setValue(row.idTipoDocumentoTributacao);
    this.form.controls.decreto.setValue(row.decreto);
    this.form.controls.numeroDocumento.setValue(row.numeroDocumento);
    this.form.controls.inicioVigencia.setValue(this.iniVig[0]);
    this.form.controls.fimVigencia.setValue(this.fimVig[0]);
    // this.form.controls.ncm.setValue(row.idNcm);
  }

  sendit(data) {
    // this.q = data;
    // this.p = 1;
    // this.getAllFornecedor();
  }
}
